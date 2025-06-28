import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PersonalInfo {
  name: {
    japanese: string;
    english: string;
  };
  role: string;
}

export interface SocialLink {
  name: string;
  url: string;
  type: 'blog' | 'professional' | 'social' | 'code' | 'presentation' | 'certification';
}

export interface CareerSummaryItem {
  period: string;
  description: string;
  status: 'current' | 'graduated' | 'resigned';
}

export interface Project {
  title: string;
  overview: string;
  period: string;
  role: string;
  processes: string[];
  technologies: {
    infrastructure?: string[];
    serverSide?: string[];
  };
  tasks: string[];
}

export interface Company {
  name: string;
  description: string;
  employees: string;
  period: string;
  employment: string;
  projects: Project[];
  otherActivities?: string[];
}

export interface Skills {
  aws: {
    [category: string]: string[];
  };
  iac: string[];
  os: string[];
  saas: {
    [vendor: string]: string[];
  };
}

export interface Certification {
  name: string;
  date: string;
  provider: 'aws' | 'azure' | 'programming';
  level: 'foundational' | 'associate' | 'professional' | 'specialty' | 'basic';
}

export interface Award {
  name: string;
  year: string;
  url?: string;
  category: 'community' | 'certification';
}

export interface SpeakingEngagement {
  event: string;
  title: string;
  url: string;
}

export interface EventOrganizing {
  event: string;
  reportUrl?: string;
}

export interface PersonalActivities {
  blog: SocialLink[];
  speaking: SpeakingEngagement[];
  eventOrganizing: EventOrganizing[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  careerSummary: CareerSummaryItem[];
  workExperience: {
    overview: string[];
  };
  companies: Company[];
  skills: Skills;
  certifications: Certification[];
  awards: Award[];
  personalActivities: PersonalActivities;
  lastUpdated: string;
}

export class MarkdownParser {
  private content: string;
  private sections: Map<string, string> = new Map();

  constructor(markdownContent: string) {
    this.content = markdownContent;
    this.parseSections();
  }

  private parseSections(): void {
    const lines = this.content.split('\n');
    let currentSection = '';
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentSection && currentContent.length > 0) {
          this.sections.set(currentSection, currentContent.join('\n').trim());
        }
        currentSection = line.replace('# ', '').trim();
        currentContent = [];
      } else if (line.startsWith('## ')) {
        if (currentSection && currentContent.length > 0) {
          this.sections.set(currentSection, currentContent.join('\n').trim());
        }
        currentSection = line.replace('## ', '').trim();
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }

    if (currentSection && currentContent.length > 0) {
      this.sections.set(currentSection, currentContent.join('\n').trim());
    }
  }

  private parseTable(content: string): Array<{ [key: string]: string }> {
    const lines = content.split('\n').filter(line => line.trim() && !line.includes('---'));
    if (lines.length < 2) return [];

    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(1);

    return rows.map(row => {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      const rowData: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        if (cells[index]) {
          rowData[header] = cells[index];
        }
      });
      return rowData;
    });
  }

  private parseList(content: string): string[] {
    return content
      .split('\n')
      .filter(line => line.trim().startsWith('- '))
      .map(line => line.replace(/^- /, '').trim());
  }

  private extractLinksFromMarkdown(text: string): Array<{ name: string; url: string }> {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links: Array<{ name: string; url: string }> = [];
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      links.push({
        name: match[1],
        url: match[2]
      });
    }

    return links;
  }

  public parsePersonalInfo(): PersonalInfo {
    const basicInfoContent = this.sections.get('基本情報') || '';
    const table = this.parseTable(basicInfoContent);

    const nameRow = table.find(row => row.Key === '名前' || row['Key'] === '名前');
    const roleRow = table.find(row => row.Key === '職種' || row['Key'] === '職種');

    const nameValue = nameRow?.Value || '';
    const nameMatch = nameValue.match(/(.+?)（(.+?)）/);

    return {
      name: {
        japanese: nameMatch ? nameMatch[1].trim() : nameValue,
        english: nameMatch ? nameMatch[2].trim() : ''
      },
      role: roleRow?.Value || ''
    };
  }

  public parseSocialLinks(): SocialLink[] {
    const accountContent = this.sections.get('アカウント') || '';
    const links = this.extractLinksFromMarkdown(accountContent);

    return links.map(link => ({
      name: link.name,
      url: link.url,
      type: this.categorizeLink(link.name) as SocialLink['type']
    }));
  }

  private categorizeLink(name: string): string {
    if (name.includes('DevelopersIO') || name.includes('Qiita')) return 'blog';
    if (name.includes('LinkedIn')) return 'professional';
    if (name.includes('Twitter') || name.includes('X(')) return 'social';
    if (name.includes('GitHub')) return 'code';
    if (name.includes('SpeakerDeck')) return 'presentation';
    if (name.includes('Credly')) return 'certification';
    return 'social';
  }

  public parseCareerSummary(): CareerSummaryItem[] {
    const careerContent = this.sections.get('職務経歴概略') || '';
    const table = this.parseTable(careerContent);

    return table.map(row => ({
      period: row['期間'] || '',
      description: row['説明'] || '',
      status: this.determineStatus(row['期間'] || '') as CareerSummaryItem['status']
    }));
  }

  private determineStatus(period: string): string {
    if (period.includes('現在')) return 'current';
    if (period.includes('退学')) return 'graduated';
    return 'resigned';
  }

  public parseWorkExperience(): { overview: string[] } {
    const experienceContent = this.sections.get('業務経験概略') || '';
    const lines = experienceContent.split('\n');
    
    const overview: string[] = [];
    let startCollecting = false;

    for (const line of lines) {
      if (line.includes('主な業務経験としては以下です')) {
        startCollecting = true;
        continue;
      }
      if (startCollecting && line.trim().startsWith('- ')) {
        overview.push(line.replace(/^- /, '').trim());
      }
    }

    return { overview };
  }

  public parseCompanies(): Company[] {
    const companies: Company[] = [];
    const detailContent = this.sections.get('職務経歴詳細') || '';
    
    // Company sections are separated by ## headers
    const companyBlocks = detailContent.split(/(?=## )/);
    
    for (const block of companyBlocks) {
      if (!block.trim()) continue;
      
      const lines = block.split('\n');
      const companyName = lines[0]?.replace('## ', '').trim();
      
      if (!companyName) continue;
      
      // Parse company basic info
      const basicInfo = this.parseCompanyBasicInfo(block);
      const projects = this.parseProjects(block);
      
      companies.push({
        name: companyName,
        description: basicInfo.description,
        employees: basicInfo.employees,
        period: basicInfo.period,
        employment: basicInfo.employment,
        projects,
        otherActivities: basicInfo.otherActivities
      });
    }
    
    return companies;
  }

  private parseCompanyBasicInfo(block: string): {
    description: string;
    employees: string;
    period: string;
    employment: string;
    otherActivities?: string[];
  } {
    const lines = block.split('\n');
    let description = '';
    let employees = '';
    let period = '';
    let employment = '';
    const otherActivities: string[] = [];

    for (const line of lines) {
      if (line.includes('事業内容：')) {
        description = line.split('事業内容：')[1]?.trim() || '';
      }
      if (line.includes('従業員：')) {
        employees = line.split('従業員：')[1]?.trim() || '';
      }
      if (line.includes('在籍期間：')) {
        period = line.split('在籍期間：')[1]?.trim() || '';
      }
      if (line.includes('雇用形態：')) {
        employment = line.split('雇用形態：')[1]?.trim() || '';
      }
    }

    return { description, employees, period, employment, otherActivities };
  }

  private parseProjects(block: string): Project[] {
    const projects: Project[] = [];
    const projectBlocks = block.split(/(?=### )/);
    
    for (const projectBlock of projectBlocks) {
      if (!projectBlock.includes('###')) continue;
      
      const lines = projectBlock.split('\n');
      const title = lines[0]?.replace('### ', '').trim();
      
      if (!title) continue;
      
      const project = this.parseProjectDetails(projectBlock, title);
      projects.push(project);
    }
    
    return projects;
  }

  private parseProjectDetails(block: string, title: string): Project {
    const lines = block.split('\n');
    let overview = '';
    let period = '';
    let role = '';
    const processes: string[] = [];
    const technologies: { infrastructure?: string[]; serverSide?: string[] } = {};
    const tasks: string[] = [];

    let currentSection = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '- 概要') {
        currentSection = 'overview';
        continue;
      }
      if (trimmedLine === '- 期間') {
        currentSection = 'period';
        continue;
      }
      if (trimmedLine === '- 経験した職種・役割') {
        currentSection = 'role';
        continue;
      }
      if (trimmedLine === '- 担当工程') {
        currentSection = 'processes';
        continue;
      }
      if (trimmedLine === '- 使用技術') {
        currentSection = 'technologies';
        continue;
      }
      if (trimmedLine === '- 業務内容') {
        currentSection = 'tasks';
        continue;
      }

      if (trimmedLine.startsWith('- ') && currentSection) {
        const content = trimmedLine.replace(/^- /, '').trim();
        
        switch (currentSection) {
          case 'overview':
            if (overview) overview += ' ';
            overview += content;
            break;
          case 'period':
            if (period) period += ' ';
            period += content;
            break;
          case 'role':
            if (role) role += ' ';
            role += content;
            break;
          case 'processes':
            processes.push(content);
            break;
          case 'tasks':
            tasks.push(content);
            break;
        }
      }

      if (trimmedLine.startsWith('- インフラ：')) {
        technologies.infrastructure = trimmedLine.split('：')[1]?.split(/[,、]/).map(t => t.trim()) || [];
      }
      if (trimmedLine.startsWith('- サーバーサイド：')) {
        technologies.serverSide = trimmedLine.split('：')[1]?.split(/[,、]/).map(t => t.trim()) || [];
      }
    }

    return {
      title,
      overview,
      period,
      role,
      processes,
      technologies,
      tasks
    };
  }

  public parseSkills(): Skills {
    const skillsContent = this.sections.get('スキル') || '';
    const aws: { [category: string]: string[] } = {};
    let iac: string[] = [];
    let os: string[] = [];
    const saas: { [vendor: string]: string[] } = {};

    const lines = skillsContent.split('\n');
    let currentCategory = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('#### ')) {
        currentCategory = trimmedLine.replace('#### ', '');
        continue;
      }
      
      if (trimmedLine.startsWith('### AWS')) {
        continue;
      }
      
      if (trimmedLine.startsWith('### IaC')) {
        const nextLineIndex = lines.indexOf(line) + 1;
        if (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex + 1]?.trim();
          if (nextLine) {
            iac = nextLine.split('/').map(skill => skill.trim());
          }
        }
        continue;
      }
      
      if (trimmedLine.startsWith('### OS')) {
        const nextLineIndex = lines.indexOf(line) + 1;
        if (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex + 1]?.trim();
          if (nextLine) {
            os = nextLine.split('/').map(skill => skill.trim());
          }
        }
        continue;
      }
      
      if (trimmedLine.startsWith('### SaaS')) {
        const saasLines = lines.slice(lines.indexOf(line) + 1);
        for (const saasLine of saasLines) {
          if (saasLine.trim().startsWith('- ')) {
            const content = saasLine.replace(/^- /, '').trim();
            if (content.includes('(') && content.includes(')')) {
              const match = content.match(/^([^(]+)\s*\(([^)]+)\)/);
              if (match) {
                const vendor = match[1].trim();
                const tools = match[2].split('/').map(tool => tool.trim());
                saas[vendor] = tools;
              }
            } else {
              const tools = content.split('/').map(tool => tool.trim());
              saas['その他'] = (saas['その他'] || []).concat(tools);
            }
          }
          if (saasLine.trim().startsWith('#')) break;
        }
        continue;
      }

      if (currentCategory && trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('-')) {
        const skills = trimmedLine.split('/').map(skill => skill.trim());
        aws[currentCategory] = skills;
      }
    }

    return { aws, iac, os, saas };
  }

  public parseCertifications(): Certification[] {
    const certsContent = this.sections.get('保有資格') || '';
    const table = this.parseTable(certsContent);

    return table.map(row => {
      const name = row['資格名'] || '';
      const date = row['取得日'] || '';
      
      return {
        name,
        date,
        provider: this.determineProvider(name) as Certification['provider'],
        level: this.determineLevel(name) as Certification['level']
      };
    });
  }

  private determineProvider(name: string): string {
    if (name.includes('AWS')) return 'aws';
    if (name.includes('Azure') || name.includes('Microsoft')) return 'azure';
    return 'programming';
  }

  private determineLevel(name: string): string {
    if (name.includes('Practitioner') || name.includes('Fundamentals')) return 'foundational';
    if (name.includes('Associate')) return 'associate';
    if (name.includes('Professional')) return 'professional';
    if (name.includes('Specialty')) return 'specialty';
    return 'basic';
  }

  public parseAwards(): Award[] {
    const awardsContent = this.sections.get('表彰') || '';
    const table = this.parseTable(awardsContent);

    return table.map(row => {
      const nameWithLink = row['名前'] || '';
      const year = row['年'] || '';
      
      const links = this.extractLinksFromMarkdown(nameWithLink);
      const link = links[0];
      
      return {
        name: link ? link.name : nameWithLink,
        year,
        url: link?.url,
        category: 'community' as Award['category']
      };
    });
  }

  public parsePersonalActivities(): PersonalActivities {
    const personalContent = this.sections.get('個人活動') || '';
    
    const blog = this.parseBlogLinks(personalContent);
    const speaking = this.parseSpeakingEngagements(personalContent);
    const eventOrganizing = this.parseEventOrganizing(personalContent);

    return { blog, speaking, eventOrganizing };
  }

  private parseBlogLinks(content: string): SocialLink[] {
    const blogSection = content.split('### ブログ')[1]?.split('### ')[0] || '';
    const links = this.extractLinksFromMarkdown(blogSection);
    
    return links.map(link => ({
      name: link.name,
      url: link.url,
      type: 'blog' as SocialLink['type']
    }));
  }

  private parseSpeakingEngagements(content: string): SpeakingEngagement[] {
    const speakingSection = content.split('### 登壇')[1]?.split('### ')[0] || '';
    const lines = speakingSection.split('\n');
    const engagements: SpeakingEngagement[] = [];

    let currentEvent = '';
    let currentTitle = '';
    let currentUrl = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('- [') && trimmedLine.includes('](')) {
        const match = trimmedLine.match(/- \[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          if (currentEvent && currentTitle && currentUrl) {
            engagements.push({
              event: currentEvent,
              title: currentTitle,
              url: currentUrl
            });
          }
          currentEvent = match[1];
          currentTitle = '';
          currentUrl = '';
        }
      }
      
      if (trimmedLine.includes('- 資料：')) {
        const match = trimmedLine.match(/資料：\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentTitle = match[1];
          currentUrl = match[2];
        }
      }
    }

    if (currentEvent && currentTitle && currentUrl) {
      engagements.push({
        event: currentEvent,
        title: currentTitle,
        url: currentUrl
      });
    }

    return engagements;
  }

  private parseEventOrganizing(content: string): EventOrganizing[] {
    const eventSection = content.split('### イベント開催')[1] || '';
    const lines = eventSection.split('\n');
    const events: EventOrganizing[] = [];

    let currentEvent = '';
    let currentReportUrl = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('- [') && trimmedLine.includes('](')) {
        const match = trimmedLine.match(/- \[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          if (currentEvent) {
            events.push({
              event: currentEvent,
              reportUrl: currentReportUrl || undefined
            });
          }
          currentEvent = match[1];
          currentReportUrl = '';
        }
      }
      
      if (trimmedLine.includes('- 開催報告：')) {
        const match = trimmedLine.match(/開催報告：\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentReportUrl = match[2];
        }
      }
    }

    if (currentEvent) {
      events.push({
        event: currentEvent,
        reportUrl: currentReportUrl || undefined
      });
    }

    return events;
  }

  public parseLastUpdated(): string {
    const firstLine = this.content.split('\n')[0];
    const match = firstLine.match(/最終更新日:\s*(.+)/);
    return match ? match[1].trim() : '';
  }

  public parseAll(): ResumeData {
    return {
      personalInfo: this.parsePersonalInfo(),
      socialLinks: this.parseSocialLinks(),
      careerSummary: this.parseCareerSummary(),
      workExperience: this.parseWorkExperience(),
      companies: this.parseCompanies(),
      skills: this.parseSkills(),
      certifications: this.parseCertifications(),
      awards: this.parseAwards(),
      personalActivities: this.parsePersonalActivities(),
      lastUpdated: this.parseLastUpdated()
    };
  }
}

export function parseResumeFromFile(filePath: string): ResumeData {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  
  const parser = new MarkdownParser(content);
  return parser.parseAll();
}