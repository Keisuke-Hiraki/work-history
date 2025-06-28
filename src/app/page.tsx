import { Suspense } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <Suspense fallback={<div>Loading...</div>}>
          <PersonalInfo />
          <CareerSummary />
          <WorkExperience />
          <Skills />
          <Certifications />
          <Awards />
          <PersonalActivities />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
