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
  status?: 'current' | 'graduated' | 'resigned';
}

export interface WorkExperience {
  overview: string[];
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
  workExperience: WorkExperience;
  companies: Company[];
  skills: Skills;
  certifications: Certification[];
  awards: Award[];
  personalActivities: PersonalActivities;
  lastUpdated: string;
}