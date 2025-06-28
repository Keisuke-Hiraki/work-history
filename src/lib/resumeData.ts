import fs from 'fs';
import path from 'path';

interface JSONResumeData {
  lastUpdated: string;
  basicInfo: {
    name: {
      ja: string;
      en: string;
    };
    role: {
      ja: string;
      en: string;
    };
  };
  socialLinks: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  careerSummary: Array<{
    period: string;
    company: string;
    status: string;
  }>;
  workExperience: {
    overview: {
      ja: string;
      keyExperiences: string[];
    };
    companies: Array<{
      name: string;
      businessDescription: string;
      employees: string;
      period: {
        start: string;
        end: string;
      };
      employmentType: string;
      projects: Array<{
        title: string;
        overview: string;
        period: {
          start: string;
          end: string;
        };
        role: string;
        responsibilities: string[];
        technologies: {
          infrastructure?: string[];
          serverSide?: string[];
        };
        tasks: string[];
      }>;
      additionalActivities?: string[];
    }>;
  };
  skills: {
    aws: {
      [category: string]: string[];
    };
    iac: string[];
    os: string[];
    saas: {
      [vendor: string]: string[];
    };
  };
  certifications: Array<{
    name: string;
    date: string;
    category: string;
    level: string;
    provider?: string;
  }>;
  awards: Array<{
    name: string;
    year: string;
    url: string;
    category: string;
  }>;
  personalActivities: {
    speaking: Array<{
      event: string;
      eventUrl: string;
      title: string;
      slideUrl: string;
    }>;
    eventOrganizing: Array<{
      event: string;
      eventUrl: string;
      reportUrl?: string;
      reportTitle?: string;
    }>;
  };
}

export interface ResumeData {
  personalInfo: {
    name: {
      japanese: string;
      english: string;
    };
    role: string;
  };
  socialLinks: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  careerSummary: Array<{
    period: string;
    description: string;
    status: string;
  }>;
  workExperience: {
    overview: string[];
  };
  companies: Array<{
    name: string;
    description: string;
    employees: string;
    period: string;
    employment: string;
    projects: Array<{
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
    }>;
    otherActivities?: string[];
  }>;
  skills: {
    aws: {
      [category: string]: string[];
    };
    iac: string[];
    os: string[];
    saas: {
      [vendor: string]: string[];
    };
  };
  certifications: Array<{
    name: string;
    date: string;
    category: string;
    level: string;
    provider?: string;
  }>;
  awards: Array<{
    name: string;
    year: string;
    url: string;
    category: string;
  }>;
  personalActivities: {
    speaking: Array<{
      event: string;
      eventUrl: string;
      title: string;
      slideUrl: string;
    }>;
    eventOrganizing: Array<{
      event: string;
      eventUrl: string;
      reportUrl?: string;
      reportTitle?: string;
    }>;
  };
  lastUpdated: string;
}

// Cache the parsed data to avoid re-parsing on every request
let cachedResumeData: ResumeData | null = null;

function transformJSONData(jsonData: JSONResumeData): ResumeData {
  return {
    personalInfo: {
      name: {
        japanese: jsonData.basicInfo.name.ja,
        english: jsonData.basicInfo.name.en,
      },
      role: jsonData.basicInfo.role.ja,
    },
    socialLinks: jsonData.socialLinks,
    careerSummary: jsonData.careerSummary.map(item => ({
      period: item.period,
      description: item.company,
      status: item.status,
    })),
    workExperience: {
      overview: jsonData.workExperience.overview.keyExperiences,
    },
    companies: jsonData.workExperience.companies.map(company => ({
      name: company.name,
      description: company.businessDescription,
      employees: company.employees,
      period: `${company.period.start}～${company.period.end}`,
      employment: company.employmentType,
      projects: company.projects.map(project => ({
        title: project.title,
        overview: project.overview,
        period: `${project.period.start}～${project.period.end}`,
        role: project.role,
        processes: project.responsibilities,
        technologies: project.technologies,
        tasks: project.tasks,
      })),
      otherActivities: company.additionalActivities,
    })),
    skills: jsonData.skills,
    certifications: jsonData.certifications,
    awards: jsonData.awards,
    personalActivities: jsonData.personalActivities,
    lastUpdated: jsonData.lastUpdated,
  };
}

export function getResumeData(): ResumeData {
  if (!cachedResumeData) {
    const fullPath = path.join(process.cwd(), 'data/resume.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const jsonData: JSONResumeData = JSON.parse(fileContents);
    cachedResumeData = transformJSONData(jsonData);
  }
  return cachedResumeData;
}

// Force refresh the cache (useful for development)
export function refreshResumeData(): ResumeData {
  const fullPath = path.join(process.cwd(), 'data/resume.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const jsonData: JSONResumeData = JSON.parse(fileContents);
  cachedResumeData = transformJSONData(jsonData);
  return cachedResumeData;
}