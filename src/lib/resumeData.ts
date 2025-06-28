import { parseResumeFromFile, ResumeData } from './markdownParser';

// Cache the parsed data to avoid re-parsing on every request
let cachedResumeData: ResumeData | null = null;

export function getResumeData(): ResumeData {
  if (!cachedResumeData) {
    cachedResumeData = parseResumeFromFile('data/resume.md');
  }
  return cachedResumeData;
}

// Force refresh the cache (useful for development)
export function refreshResumeData(): ResumeData {
  cachedResumeData = parseResumeFromFile('data/resume.md');
  return cachedResumeData;
}