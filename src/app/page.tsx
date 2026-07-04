import Header from '@/components/Header';
import PersonalInfo from '@/components/PersonalInfo';
import WorkExperience from '@/components/WorkExperience';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import PersonalActivities from '@/components/PersonalActivities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
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
  );
}
