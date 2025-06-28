import { getResumeData } from '@/lib/resumeData';
import WorkExperienceClient from './WorkExperienceClient';

export default function WorkExperience() {
  const resumeData = getResumeData();
  const { workExperience, companies } = resumeData;

  return (
    <WorkExperienceClient 
      workExperience={workExperience} 
      companies={companies} 
    />
  );
}