#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Simple markdown parser for resume data
class ResumeMarkdownParser {
  constructor(content) {
    this.content = content;
    this.sections = new Map();
    this.parseSections();
  }

  parseSections() {
    const lines = this.content.split('\n');
    let currentSection = '';
    let currentContent = [];

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

  parseTable(content) {
    const lines = content.split('\n').filter(line => line.trim() && !line.includes('---'));
    if (lines.length < 2) return [];

    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(1);

    return rows.map(row => {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      const rowData = {};
      headers.forEach((header, index) => {
        if (cells[index]) {
          rowData[header] = cells[index];
        }
      });
      return rowData;
    });
  }

  parseLastUpdated() {
    const firstLine = this.content.split('\n')[0];
    const match = firstLine.match(/最終更新日:\s*(.+)/);
    if (match) {
      // Convert YYYY/MM/DD to YYYY-MM-DD format
      const dateStr = match[1].trim();
      if (dateStr.includes('/')) {
        return dateStr.replace(/\//g, '-');
      }
      return dateStr;
    }
    return new Date().toISOString().split('T')[0];
  }

  parseBasicInfo() {
    const content = this.sections.get('基本情報') || '';
    const table = this.parseTable(content);
    
    const nameRow = table.find(row => row.Key === '名前');
    const roleRow = table.find(row => row.Key === '職種');
    
    const nameValue = nameRow?.Value || '';
    const nameMatch = nameValue.match(/(.+?)（(.+?)）/);
    
    return {
      name: {
        ja: nameMatch ? nameMatch[1].trim() : nameValue,
        en: nameMatch ? nameMatch[2].trim() : ''
      },
      role: {
        ja: roleRow?.Value || '',
        en: roleRow?.Value === 'ソリューションアーキテクト' ? 'Solution Architect' : roleRow?.Value || ''
      }
    };
  }

  parseSocialLinks() {
    const content = this.sections.get('アカウント') || '';
    const links = this.extractLinksFromMarkdown(content);
    
    return links.map(link => ({
      name: link.name,
      url: link.url,
      type: this.categorizeLink(link.name)
    }));
  }

  extractLinksFromMarkdown(text) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      links.push({
        name: match[1],
        url: match[2]
      });
    }
    return links;
  }

  categorizeLink(name) {
    if (name.includes('DevelopersIO') || name.includes('Qiita')) return 'blog';
    if (name.includes('LinkedIn')) return 'professional';
    if (name.includes('Twitter') || name.includes('X(')) return 'social';
    if (name.includes('GitHub')) return 'code';
    if (name.includes('SpeakerDeck')) return 'presentation';
    if (name.includes('Credly')) return 'certification';
    return 'social';
  }

  parseCareerSummary() {
    const content = this.sections.get('職務経歴概略') || '';
    const table = this.parseTable(content);
    
    return table.map(row => ({
      period: row['期間'] || '',
      company: row['説明'] || '',
      status: this.determineStatus(row['期間'] || '')
    }));
  }

  determineStatus(period) {
    if (period.includes('現在')) return 'current';
    if (period.includes('退学')) return 'education';
    return 'past';
  }

  parseWorkExperience() {
    const content = this.sections.get('業務経験概略') || '';
    const lines = content.split('\n');
    
    const keyExperiences = [];
    let startCollecting = false;

    for (const line of lines) {
      if (line.includes('主な業務経験としては以下です')) {
        startCollecting = true;
        continue;
      }
      if (startCollecting && line.trim().startsWith('- ')) {
        keyExperiences.push(line.replace(/^- /, '').trim());
      }
    }

    // Parse companies from 職務経歴詳細
    const companies = this.parseCompanies();

    return {
      overview: {
        ja: "現在は、AIやクラウドをはじめとしたサイバーセキュリティ領域のコンサルティングを行っております。AWSソリューションアーキテクトとして培った設計構築・コンサルティングの経験を基盤に、セキュリティとガバナンスの支援を提供しています。",
        keyExperiences
      },
      companies
    };
  }

  parseCompanies() {
    const content = this.sections.get('職務経歴詳細') || '';
    const companies = [];
    
    // Split by company (## headers) and filter empty blocks
    const companyBlocks = content.split(/(?=^## )/m).filter(block => block.trim());
    
    for (const block of companyBlocks) {
      if (!block.trim()) continue;
      
      const lines = block.split('\n');
      const companyName = lines[0]?.replace('## ', '').trim();
      
      if (!companyName) continue;
      
      const basicInfo = this.parseCompanyBasicInfo(block);
      const projects = this.parseProjects(block);
      
      companies.push({
        name: companyName,
        businessDescription: basicInfo.businessDescription,
        employees: basicInfo.employees,
        period: {
          start: basicInfo.period.start,
          end: basicInfo.period.end
        },
        employmentType: basicInfo.employmentType,
        projects,
        additionalActivities: basicInfo.additionalActivities
      });
    }
    
    return companies;
  }

  parseCompanyBasicInfo(block) {
    const lines = block.split('\n');
    let businessDescription = '';
    let employees = '';
    let periodStart = '';
    let periodEnd = '';
    let employmentType = '';
    const additionalActivities = [];

    for (const line of lines) {
      if (line.includes('事業内容：')) {
        businessDescription = line.split('事業内容：')[1]?.trim() || '';
      }
      if (line.includes('従業員：')) {
        employees = line.split('従業員：')[1]?.trim() || '';
      }
      if (line.includes('在籍期間：')) {
        const periodStr = line.split('在籍期間：')[1]?.trim() || '';
        const periodMatch = periodStr.match(/(.+?)\s*～\s*(.+)/);
        if (periodMatch) {
          periodStart = periodMatch[1].trim();
          periodEnd = periodMatch[2].trim();
        }
      }
      if (line.includes('雇用形態：')) {
        employmentType = line.split('雇用形態：')[1]?.trim() || '';
      }
    }

    // Parse additional activities from 案件外業務/単発業務
    if (block.includes('案件外業務/単発業務')) {
      const activityLines = block.split('案件外業務/単発業務')[1]?.split('\n') || [];
      for (const line of activityLines) {
        if (line.trim().startsWith('- ')) {
          additionalActivities.push(line.replace(/^- /, '').trim());
        } else if (line.trim().startsWith('  - ')) {
          additionalActivities.push(line.replace(/^  - /, '').trim());
        }
      }
    }

    return {
      businessDescription,
      employees,
      period: { start: periodStart, end: periodEnd },
      employmentType,
      additionalActivities
    };
  }

  parseProjects(block) {
    const projects = [];
    const projectBlocks = block.split(/(?=^### )/m).filter(block => block.trim());
    
    for (const projectBlock of projectBlocks) {
      if (!projectBlock.includes('###') || projectBlock.includes('案件外業務')) continue;
      
      const lines = projectBlock.split('\n');
      const title = lines[0]?.replace('### ', '').trim();
      
      if (!title) continue;
      
      const project = this.parseProjectDetails(projectBlock, title);
      projects.push(project);
    }
    
    return projects;
  }

  parseProjectDetails(block, title) {
    const lines = block.split('\n');
    let overview = '';
    let periodStart = '';
    let periodEnd = '';
    let role = '';
    const responsibilities = [];
    const technologies = {};
    const tasks = [];

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
        currentSection = 'responsibilities';
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

      if (trimmedLine.startsWith('  - ') && currentSection) {
        const content = trimmedLine.replace(/^  - /, '').trim();
        
        switch (currentSection) {
          case 'overview':
            if (overview) overview += ' ';
            overview += content;
            break;
          case 'period':
            const periodMatch = content.match(/(.+?)\s*～\s*(.+)/);
            if (periodMatch) {
              periodStart = periodMatch[1].trim();
              periodEnd = periodMatch[2].trim();
            } else if (content.includes('～')) {
              const parts = content.split('～');
              periodStart = parts[0]?.trim() || '';
              periodEnd = parts[1]?.trim() || '';
            }
            break;
          case 'role':
            if (role) role += ' ';
            role += content;
            break;
          case 'responsibilities':
            responsibilities.push(content);
            break;
          case 'tasks':
            tasks.push(content);
            break;
        }
      }

      if (trimmedLine.startsWith('  - インフラ：')) {
        technologies.infrastructure = trimmedLine.split('：')[1]?.split(/[,、]/).map(t => t.trim()) || [];
      }
      if (trimmedLine.startsWith('  - サーバーサイド：')) {
        technologies.serverSide = trimmedLine.split('：')[1]?.split(/[,、]/).map(t => t.trim()) || [];
      }
    }

    return {
      title,
      overview,
      period: {
        start: periodStart,
        end: periodEnd
      },
      role,
      responsibilities,
      technologies,
      tasks
    };
  }

  parseSkills() {
    const content = this.sections.get('スキル・経験') || '';
    const aws = {};
    let iac = [];
    let os = [];
    const saas = {};

    const lines = content.split('\n');
    let currentCategory = '';
    let currentSection = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('### AWS')) {
        currentSection = 'aws';
        continue;
      }
      
      if (line.startsWith('#### ') && currentSection === 'aws') {
        currentCategory = this.mapCategoryToKey(line.replace('#### ', ''));
        continue;
      }
      
      if (line.startsWith('### IaC')) {
        currentSection = 'iac';
        const nextLine = lines[i + 2]?.trim();
        if (nextLine) {
          iac = nextLine.split('/').map(skill => skill.trim());
        }
        continue;
      }
      
      if (line.startsWith('### OS')) {
        currentSection = 'os';
        const nextLine = lines[i + 2]?.trim();
        if (nextLine) {
          os = nextLine.split('/').map(skill => skill.trim());
        }
        continue;
      }
      
      if (line.startsWith('### SaaS')) {
        currentSection = 'saas';
        continue;
      }

      if (currentSection === 'aws' && currentCategory && line && !line.startsWith('#') && !line.startsWith('-')) {
        const skills = line.split('/').map(skill => skill.trim()).filter(skill => skill);
        if (skills.length > 0) {
          aws[currentCategory] = skills;
        }
      }

      if (currentSection === 'saas' && line.startsWith('- ')) {
        const content = line.replace(/^- /, '').trim();
        if (content.includes('(') && content.includes(')')) {
          const match = content.match(/^([^(]+)\s*\(([^)]+)\)/);
          if (match) {
            const vendor = match[1].trim().toLowerCase();
            const tools = match[2].split('/').map(tool => tool.trim());
            saas[vendor] = tools;
          }
        }
      }
    }

    return { aws, iac, os, saas };
  }

  mapCategoryToKey(categoryName) {
    const mapping = {
      'コンピューティング': 'computing',
      'ストレージ': 'storage',
      'データベース': 'database',
      'ネットワーキングとコンテンツ配信': 'networkingAndContentDelivery',
      'セキュリティ、アイデンティティ、コンプライアンス': 'securityIdentityCompliance',
      '管理とガバナンス': 'managementGovernance',
      '分析': 'analytics',
      'アプリケーション統合': 'applicationIntegration',
      '開発者ツール': 'developerTools',
      'マルチアカウント管理': 'multiAccountManagement',
      'ビジネスアプリケーション': 'businessApplications',
      'クラウド財務管理': 'cloudFinancialManagement',
      'モバイルとウェブアプリ開発': 'mobileWebAppDevelopment',
      '移行と転送': 'migrationTransfer'
    };
    return mapping[categoryName] || categoryName;
  }

  parseCertifications() {
    const content = this.sections.get('保有資格') || '';
    const table = this.parseTable(content);

    return table.filter(row => {
      const name = row['資格名'] || '';
      // Exclude non-certification entries
      return name && !name.includes('最新は、') && !name.includes('Credly');
    }).map(row => {
      const name = row['資格名'] || '';
      const date = row['取得日'] || '';
      
      return {
        name,
        date: date.replace(/\//g, '-'), // Convert to YYYY-MM-DD format
        category: this.determineCertificationCategory(name),
        level: this.determineCertificationLevel(name)
      };
    });
  }

  determineCertificationCategory(name) {
    if (name.includes('AWS')) return 'aws';
    if (name.includes('Azure') || name.includes('Microsoft')) return 'azure';
    if (name.includes('Google Cloud') || name.includes('GCP')) return 'gcp';
    return 'programming';
  }

  determineCertificationLevel(name) {
    if (name.includes('Practitioner') || name.includes('Fundamentals')) return 'foundational';
    if (name.includes('Associate')) return 'associate';
    if (name.includes('Professional')) return 'professional';
    if (name.includes('Specialty')) return 'specialty';
    return 'basic';
  }

  parseAwards() {
    const content = this.sections.get('表彰') || '';
    const table = this.parseTable(content);

    return table.map(row => {
      const nameWithLink = row['名前'] || '';
      const year = row['年'] || '';
      
      const links = this.extractLinksFromMarkdown(nameWithLink);
      const link = links[0];
      
      return {
        name: link ? link.name : nameWithLink,
        year,
        url: link?.url || '',
        category: 'community'
      };
    });
  }

  parsePersonalActivities() {
    const content = this.sections.get('個人活動') || '';
    
    const speaking = this.parseSpeakingEngagements(content);
    const eventOrganizing = this.parseEventOrganizing(content);

    return { speaking, eventOrganizing };
  }

  parseSpeakingEngagements(content) {
    const speakingSection = content.split('### 登壇')[1]?.split('### ')[0] || '';
    const lines = speakingSection.split('\n');
    const engagements = [];

    let currentEvent = '';
    let currentEventUrl = '';
    let currentTitle = '';
    let currentSlideUrl = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('- [') && trimmedLine.includes('](')) {
        if (currentEvent && currentTitle && currentSlideUrl) {
          engagements.push({
            event: currentEvent,
            eventUrl: currentEventUrl,
            title: currentTitle,
            slideUrl: currentSlideUrl
          });
        }
        
        const match = trimmedLine.match(/- \[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentEvent = match[1];
          currentEventUrl = match[2];
          currentTitle = '';
          currentSlideUrl = '';
        }
      }
      
      if (trimmedLine.includes('  - 資料：')) {
        const match = trimmedLine.match(/資料：\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentTitle = match[1];
          currentSlideUrl = match[2];
        }
      }
    }

    if (currentEvent && currentTitle && currentSlideUrl) {
      engagements.push({
        event: currentEvent,
        eventUrl: currentEventUrl,
        title: currentTitle,
        slideUrl: currentSlideUrl
      });
    }

    return engagements;
  }

  parseEventOrganizing(content) {
    const eventSection = content.split('### イベント開催')[1] || '';
    const lines = eventSection.split('\n');
    const events = [];

    let currentEvent = '';
    let currentEventUrl = '';
    let currentReportUrl = '';
    let currentReportTitle = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('- [') && trimmedLine.includes('](')) {
        if (currentEvent) {
          events.push({
            event: currentEvent,
            eventUrl: currentEventUrl,
            reportUrl: currentReportUrl || undefined,
            reportTitle: currentReportTitle || undefined
          });
        }
        
        const match = trimmedLine.match(/- \[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentEvent = match[1];
          currentEventUrl = match[2];
          currentReportUrl = '';
          currentReportTitle = '';
        }
      }
      
      if (trimmedLine.includes('  - 開催報告：')) {
        const match = trimmedLine.match(/開催報告：\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentReportTitle = match[1];
          currentReportUrl = match[2];
        }
      }
    }

    if (currentEvent) {
      events.push({
        event: currentEvent,
        eventUrl: currentEventUrl,
        reportUrl: currentReportUrl || undefined,
        reportTitle: currentReportTitle || undefined
      });
    }

    return events;
  }

  parse() {
    return {
      lastUpdated: this.parseLastUpdated(),
      basicInfo: this.parseBasicInfo(),
      socialLinks: this.parseSocialLinks(),
      careerSummary: this.parseCareerSummary(),
      workExperience: this.parseWorkExperience(),
      skills: this.parseSkills(),
      certifications: this.parseCertifications(),
      awards: this.parseAwards(),
      personalActivities: this.parsePersonalActivities()
    };
  }
}

// Main execution
function syncResumeData() {
  try {
    const projectRoot = path.join(__dirname, '..');
    const mdPath = path.join(projectRoot, 'data', 'resume.md');
    const jsonPath = path.join(projectRoot, 'data', 'resume.json');
    const publicMdPath = path.join(projectRoot, 'public', 'resume.md');

    // Read markdown file
    if (!fs.existsSync(mdPath)) {
      console.error('❌ resume.md not found at:', mdPath);
      process.exit(1);
    }

    const mdContent = fs.readFileSync(mdPath, 'utf8');

    // Parse markdown
    const parser = new ResumeMarkdownParser(mdContent);
    const resumeData = parser.parse();

    // Write JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(resumeData, null, 2) + '\n');

    // Copy markdown source to public/ so the site can link to it directly for download
    fs.copyFileSync(mdPath, publicMdPath);

    console.log('✅ Resume data synchronized successfully!');
    console.log(`📄 Source: ${mdPath}`);
    console.log(`📄 Target: ${jsonPath}`);
    console.log(`📄 Public copy: ${publicMdPath}`);
    console.log(`📅 Last updated: ${resumeData.lastUpdated}`);
    
  } catch (error) {
    console.error('❌ Error syncing resume data:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncResumeData();
}

module.exports = { syncResumeData, ResumeMarkdownParser };