export default function DarkModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const savedMode = localStorage.getItem('darkMode');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedMode === 'true' || (savedMode === null && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
    />
  );
}