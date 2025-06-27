// Modern Resume - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
  initializeNavigation();
  initializeProgressBars();
  initializeDownloadFunctions();
  initializeSmoothScrolling();
});

// Initialize scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all cards and timeline items
  document.querySelectorAll('.card, .timeline-item, .cert-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize navigation highlighting
function initializeNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
}

// Initialize progress bar animations
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('data-width') || '90%';
        
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
  });
}

// Download Functions
function initializeDownloadFunctions() {
  // These functions will be called by the download buttons
  window.downloadPDF = function() {
    // Method 1: Use existing md-to-pdf if available
    if (typeof window.generatePDF === 'function') {
      window.generatePDF();
      return;
    }
    
    // Method 2: Browser print to PDF
    const originalTitle = document.title;
    document.title = `職務経歴書_${new Date().toISOString().slice(0, 10)}_平木佳介`;
    
    // Hide elements not needed in PDF
    const elementsToHide = document.querySelectorAll('.download-section, .social-links, .sticky-nav, footer');
    elementsToHide.forEach(el => el.style.display = 'none');
    
    window.print();
    
    // Restore elements
    elementsToHide.forEach(el => el.style.display = '');
    document.title = originalTitle;
  };

  window.downloadMarkdown = function() {
    // Create markdown content from the resume data
    const markdownContent = generateMarkdownContent();
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `職務経歴書_${new Date().toISOString().slice(0, 10)}_平木佳介.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  window.printPage = function() {
    window.print();
  };
}

// Generate Markdown content
function generateMarkdownContent() {
  const today = new Date().toLocaleDateString('ja-JP');
  
  return `# 職務経歴書

**最終更新日**: ${today}

## 基本情報

| Key | Value |
| --- | --- |
| 名前 | 平木 佳介（Hiraki Keisuke） |
| 職種 | ソリューションアーキテクト |

## アカウント

- [GitHub](https://github.com/Keisuke-Hiraki)
- [LinkedIn](https://www.linkedin.com/in/k-hiraki/)
- [DevelopersIO](https://dev.classmethod.jp/author/hiraki-keisuke/)
- [X(旧Twitter)](https://x.com/k_hirasan)
- [SpeakerDeck](https://speakerdeck.com/khiraki)

## 職務経歴概略

| 期間 | 説明 |
| --- | --- |
| 2023年4月〜現在 | クラスメソッド株式会社 |
| 2021年1月～2023年3月 | 株式会社夢テクノロジー（現 株式会社オープンアップITエンジニア） |
| 2020年12月 | 静岡大学 工学部 機械工学科（中途退学） |

---

*この職務経歴書は [https://keisuke-hiraki.github.io/work-history/](https://keisuke-hiraki.github.io/work-history/) から生成されました。*
`;
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 100; // Account for sticky nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .nav-link.active {
    background: var(--primary-blue) !important;
    color: white !important;
  }
  
  /* Improved print styles */
  @media print {
    .hero-section {
      background: white !important;
      color: black !important;
      padding: 2rem 0 !important;
    }
    
    .profile-avatar {
      border: 2px solid #ccc !important;
    }
    
    .card {
      break-inside: avoid;
      margin-bottom: 1rem !important;
    }
    
    .timeline-item {
      break-inside: avoid;
      margin-bottom: 1rem !important;
    }
    
    h1, h2, h3 {
      color: black !important;
    }
    
    .social-link {
      color: black !important;
    }
  }
  
  /* Loading animation for progress bars */
  .progress-fill {
    position: relative;
    overflow: hidden;
  }
  
  .progress-fill::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;
document.head.appendChild(style);