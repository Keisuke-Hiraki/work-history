import Header from '@/components/Header';
import PersonalInfo from '@/components/PersonalInfo';
import CareerSummary from '@/components/CareerSummary';
import WorkExperience from '@/components/WorkExperience';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Awards from '@/components/Awards';
import PersonalActivities from '@/components/PersonalActivities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <Header />

      <main className="mx-auto max-w-4xl px-6">
        <PersonalInfo />
        <CareerSummary />
        <WorkExperience />
        <Skills />
        <Certifications />
        <Awards />
        <PersonalActivities />
      </main>

      <Footer />
    </div>
  );
}
