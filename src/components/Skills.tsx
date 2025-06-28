import { getResumeData } from '@/lib/resumeData';
import SkillsClient from './SkillsClient';

export default function Skills() {
  const resumeData = getResumeData();
  const { skills } = resumeData;

  return <SkillsClient skills={skills} />;
}