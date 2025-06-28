import { getResumeData } from '@/lib/resumeData';

export default function Footer() {
  const resumeData = getResumeData();
  const { lastUpdated, socialLinks } = resumeData;

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-300">
              最終更新日: {lastUpdated}
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.slice(0, 4).map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            このサイトは <a href="https://keisuke-hiraki.github.io/work-history/" className="text-blue-400 hover:text-blue-300 underline">GitHub Pages</a> で公開されています。Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}