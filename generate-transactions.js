// Generate individual transaction detail pages from scraped data
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'transaction-data.json'), 'utf-8'));
const outDir = path.join(__dirname, 'transaction');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function flagImg(code) {
  return `<img class="sidebar-flag" src="https://fpcassets.nyc3.digitaloceanspaces.com/static/icons/flags/${code}.svg" alt="${code}">`;
}

function txFlagImg(code) {
  return `<img class="tx-flag" src="https://fpcassets.nyc3.digitaloceanspaces.com/static/icons/flags/${code}.svg" alt="${code}">`;
}

function logoHtml(url, alt) {
  if (url) return `<img class="detail-logo" src="${url}" alt="${alt || ''}">`;
  return '';
}

function relatedLogoHtml(url, alt) {
  if (url) return `<img class="tx-logo" src="${url}" alt="${alt || ''}">`;
  return `<div class="tx-logo-text">${alt || ''}</div>`;
}

function getRelated(current, allData) {
  // Same sector first, then recent, never self
  const sameSector = allData.filter(t => t.slug !== current.slug && t.sector === current.sector);
  const others = allData.filter(t => t.slug !== current.slug && t.sector !== current.sector);
  const pool = [...sameSector, ...others];
  return pool.slice(0, 3);
}

function shortName(title) {
  if (!title) return 'Transaction';
  const match = title.match(/(?:acquisition of|investment in|merger with)\s+(.+?)$/i);
  if (match) return match[1].replace(/\s+/g, ' ').trim();
  return title.length > 50 ? title.substring(0, 50) + '...' : title;
}

function generatePage(tx) {
  const related = getRelated(tx, data);
  const teamHtml = (tx.team || []).map(name => `            <div class="sidebar-team-member">${name}</div>`).join('\n');
  const flagsHtml = (tx.flags || []).map(f => flagImg(f)).join('\n              ');

  let logosSection = '';
  if (tx.buyerLogo || tx.targetLogo) {
    const parts = [];
    if (tx.buyerLogo) parts.push(logoHtml(tx.buyerLogo, 'Buyer'));
    if (tx.buyerLogo && tx.targetLogo) parts.push('<div class="detail-logo-divider"></div>');
    if (tx.targetLogo) parts.push(logoHtml(tx.targetLogo, 'Target'));
    logosSection = `
        <div class="detail-logos">
          ${parts.join('\n          ')}
        </div>`;
  }

  let articleSection = '';
  if (tx.articleTitle && tx.articleUrl) {
    articleSection = `
        <a href="${tx.articleUrl}" class="article-link" target="_blank" rel="noopener">
          <div>
            <div class="article-label">Article</div>
            <div class="article-title">${tx.articleTitle}</div>
            <div class="article-view">
              View
              <svg fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.5"><path d="M2 6h7M6.5 3L9.5 6 6.5 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </a>`;
  }

  const relatedCards = related.map(r => {
    const rFlags = (r.flags || []).map(f => txFlagImg(f)).join('\n              ');
    let rLogos = '';
    if (r.buyerLogo) {
      rLogos += relatedLogoHtml(r.buyerLogo, 'Buyer');
      if (r.targetLogo) rLogos += '\n            <div class="tx-logo-divider"></div>\n            ' + relatedLogoHtml(r.targetLogo, 'Target');
    }
    return `
      <a href="/transaction/${r.slug}.html" class="tx-card">
        <div class="tx-date">${r.date}</div>
        <div class="tx-title-card">${r.title}</div>
        <div class="tx-logos">
          ${rLogos}
        </div>
        <div class="tx-footer">
          <div class="tx-meta">
            <div class="tx-sector">Sector<span>${r.sector}</span></div>
            <div class="tx-flags">
              ${rFlags}
            </div>
          </div>
        </div>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tx.title} — Spearhead</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../transaction-detail.css">
</head>
<body>

  <!-- NAVIGATION -->
  <nav class="navbar">
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-left">
      <a href="../what-we-do.html" class="nav-link">WHAT WE DO</a>
      <a href="../about.html" class="nav-link">ABOUT US</a>
      <a href="../pe-firms.html" class="nav-link">FOR PE FIRMS</a>
    </div>
    <div class="nav-logo">
      <a href="../index.html">
        <img src="https://fpcassets.nyc3.digitaloceanspaces.com/static/logos/Spearhead-Logo-White.png" alt="Spearhead Logo">
      </a>
    </div>
    <div class="nav-right">
      <a href="../contact.html" class="nav-link-cta">CONTACT US <span class="arrow">&rarr;</span></a>
    </div>
    <div class="nav-mobile-menu">
      <a href="../what-we-do.html">What We Do</a>
      <a href="../about.html">About Us</a>
      <a href="../pe-firms.html">For PE Firms</a>
      <a href="../contact.html">Contact Us</a>
    </div>
  </nav>

  <!-- BREADCRUMB -->
  <section class="breadcrumb">
    <div class="container">
      <div class="breadcrumb-inner">
        <a href="../index.html">Home</a>
        <span class="breadcrumb-sep">&rsaquo;</span>
        <a href="../transactions.html">Transactions</a>
        <span class="breadcrumb-sep">&rsaquo;</span>
        <span>${shortName(tx.title)}</span>
      </div>
    </div>
  </section>

  <!-- DETAIL HEADER -->
  <section class="detail-header">
    <div class="container">
      <div class="detail-label">Transaction</div>
      <h1 class="detail-title">${tx.title}</h1>
    </div>
  </section>

  <!-- DETAIL BODY -->
  <section class="detail-body">
    <div class="container">
      <div class="detail-grid">
        <aside class="detail-sidebar">
          <div class="sidebar-block">
            <div class="sidebar-label">Sector</div>
            <div class="sidebar-sector-tag">${tx.sector}</div>
          </div>
          <div class="sidebar-block">
            <div class="sidebar-label">Date</div>
            <div class="sidebar-value">${tx.date}</div>
          </div>
          <div class="sidebar-block">
            <div class="sidebar-label">Region</div>
            <div class="sidebar-flags">
              ${flagsHtml}
            </div>
          </div>
          <div class="sidebar-block">
            <div class="sidebar-label">Our Team</div>
            <div class="sidebar-team-list">
${teamHtml}
            </div>
          </div>
        </aside>

        <div class="detail-main">
          <p class="detail-description">${tx.description}</p>
${logosSection}
${articleSection}
        </div>
      </div>
    </div>
  </section>

  <!-- BACK LINK -->
  <section class="back-link-bar">
    <div class="container">
      <a href="../transactions.html" class="back-link">
        <svg fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.5"><path d="M8 2L4 6l4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Back to all transactions
      </a>
    </div>
  </section>

  <!-- RELATED TRANSACTIONS -->
  <section class="related-section">
    <div class="container">
      <h2 class="related-heading">Related <em>transactions</em></h2>
      <div class="related-grid">
${relatedCards}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-band">
    <div class="container">
      <h2>Every successful relationship starts with a <em>conversation</em></h2>
      <p></p>
      <a href="../contact.html" class="btn-fill">LET'S TALK <span class="arrow">&rarr;</span></a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-grid">
        <div class="footer-col">
          <p class="footer-label">QUICK LINKS</p>
          <a href="../index.html">Home</a>
          <a href="../what-we-do.html">What We Do</a>
          <a href="../about.html">About Us</a>
          <a href="../pe-firms.html">For PE Firms</a>
          <a href="../contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <p class="footer-label">CONTACT</p>
          <a href="mailto:info@spearheadcorpdev.com">info@spearheadcorpdev.com</a>
          <a href="tel:+14378000219">(437) 800-0219</a>
        </div>
        <div class="footer-col footer-brand">
          <img src="https://fpcassets.nyc3.digitaloceanspaces.com/static/logos/Spearhead-Logo-White.png" alt="Spearhead Logo" class="footer-logo">
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Spearhead Holdings. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="../mobile-nav.js"></script>
</body>
</html>`;
}

// Generate all pages (skip entries with missing title)
let count = 0;
data.filter(tx => tx.title).forEach(tx => {
  const html = generatePage(tx);
  const filePath = path.join(outDir, tx.slug + '.html');
  fs.writeFileSync(filePath, html, 'utf-8');
  count++;
});

console.log(`Generated ${count} transaction detail pages in ${outDir}`);
