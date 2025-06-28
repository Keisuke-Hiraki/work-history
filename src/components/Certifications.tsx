import { getResumeData } from '@/lib/resumeData';
import CertificationsClient from './CertificationsClient';

export default function Certifications() {
  const resumeData = getResumeData();
  const { certifications } = resumeData;

  return <CertificationsClient certifications={certifications} />;
}