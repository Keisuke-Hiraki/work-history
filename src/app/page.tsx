import { getResumeData } from '@/lib/resumeData';
import LanguageProvider from '@/components/LanguageProvider';
import Header from '@/components/Header';
import PersonalInfo from '@/components/PersonalInfo';
import WorkExperience from '@/components/WorkExperience';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import PersonalActivities from '@/components/PersonalActivities';
import Footer from '@/components/Footer';

export default function Home() {
  // Fetch both locales at build time; LanguageProvider picks which one renders client-side.
  const dataJa = getResumeData('ja');
  const dataEn = getResumeData('en');

  return (
    <LanguageProvider dataJa={dataJa} dataEn={dataEn}>
      <div className="min-h-screen">
        <Header />

        <main className="mx-auto max-w-4xl px-6">
          <PersonalInfo />
          <WorkExperience />
          <Skills />
          <Certifications />
          <PersonalActivities />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
