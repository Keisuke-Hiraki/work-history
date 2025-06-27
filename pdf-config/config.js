module.exports = {
    stylesheet: "./pdf-config/style.css",
    body_class: "resume-pdf",
    marked_options: {
      headerIds: false,
      smartypants: true,
    },
    pdf_options: {
      "format": "A4",
      "margin": "20mm 15mm 25mm 15mm",
      "printBackground": true,
      "displayHeaderFooter": true,
      "headerTemplate": `
        <style>
          .header {
            font-size: 8px;
            color: #666;
            width: 100%;
            padding: 5px 15mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
          }
          .header-left { font-weight: 600; }
          .header-right { font-style: italic; }
        </style>
        <div class="header">
          <div class="header-left">職務経歴書 - 平木 佳介</div>
          <div class="header-right">AWS Solution Architect</div>
        </div>
      `,
      "footerTemplate": `
        <style>
          .footer {
            font-size: 8px;
            color: #666;
            width: 100%;
            padding: 5px 15mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer-left { font-style: italic; }
          .footer-right { font-weight: 600; }
        </style>
        <div class="footer">
          <div class="footer-left">最終更新: ${new Date().toLocaleDateString('ja-JP')}</div>
          <div class="footer-right">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        </div>
      `,
      "preferCSSPageSize": true,
      "landscape": false
    },
    stylesheet_encoding: "utf-8",
    launch_options: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    }
  };