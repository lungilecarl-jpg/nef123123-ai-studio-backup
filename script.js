const regeneratedImg =
  document.getElementById('heroSlideMovementImgRef')?.getAttribute('href') ||
  './src/assets/images/regenerated_image_1794523988514.jpg';

const coalitionImg =
  document.querySelector('#openCoalitionImage img')?.getAttribute('src') ||
  './src/assets/images/assets/aistudio/image_e921a8c9.png';

const today = new Date();
const todayEl = document.getElementById('today');
if (todayEl) {
  todayEl.textContent = today
    .toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
}
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = today.getFullYear();
}

const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
toggle?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    nav.querySelectorAll('a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  })
);

document.getElementById('joinForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('formMessage');
  if (!message) return;
  message.textContent =
    'Thank you for your interest. The subscription service must be connected by the site administrator before sign-ups can be stored.';
  message.classList.add('form-success');
});

// MSN-style Hero Carousel Switcher across existing NEF perspectives
const heroSlides = [
  {
    href: 'https://link.amazon/B0iCzskXw',
    external: true,
    img: document.getElementById('heroSlideImg')?.getAttribute('src') || '/assets/aistudio/image_a0935a15.png',
    alt: 'Amazon affiliate storefront sign',
    label: 'AMAZON AFFILIATE',
    category: 'FEATURED SELECTION',
    title: 'Shop curated picks & deals on Amazon',
    desc: 'Explore verified affiliate recommendations and everyday essentials selected for the NEF123123 community.',
    cta: 'Shop on Amazon',
    ariaLabel: 'Shop featured Amazon affiliate selection on Amazon',
  },
  {
    href: '#economy',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1100&q=85',
    alt: 'Industrial production facility',
    label: 'BEYOND EXTRACTION',
    category: 'WEALTH SOVEREIGNTY',
    title: 'Wealth must create value here.',
    desc: 'African resources should support African industrial capacity, skills, innovation and prosperity.',
    cta: 'Explore economic sovereignty',
  },
  {
    href: '#movement',
    img: regeneratedImg,
    alt: 'Economic freedom movement leadership and supporters waving',
    label: 'OUR MOVEMENT',
    category: 'NAVIGANT ECONOMIC FREEDOM',
    title: 'News, empowerment, and curated partner offers',
    desc: 'Stay informed on economic justice dispatches while supporting NEF123123 through vetted Amazon and partner storefronts.',
    cta: 'Explore the movement',
  },
];

let currentSlide = 0;
const heroLink = document.getElementById('heroSlideLink');
const heroImg = document.getElementById('heroSlideImg');
const heroLabel = document.getElementById('heroSlideLabel');
const heroCategory = document.getElementById('heroSlideCategory');
const heroTitle = document.getElementById('heroSlideTitle');
const heroDesc = document.getElementById('heroSlideDesc');
const heroCta = document.getElementById('heroSlideCta');
const heroDots = document.querySelectorAll('.hero-dot');

function renderSlide(index) {
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentSlide];
  heroLink.setAttribute('href', slide.href);
  if (slide.external) {
    heroLink.setAttribute('target', '_blank');
    heroLink.setAttribute('rel', 'noopener noreferrer sponsored');
  } else {
    heroLink.removeAttribute('target');
    heroLink.removeAttribute('rel');
  }
  heroLink.setAttribute('aria-label', slide.ariaLabel || slide.title);
  heroImg.setAttribute('src', slide.img);
  heroImg.setAttribute('alt', slide.alt);
  heroLabel.textContent = slide.label;
  heroCategory.textContent = slide.category;
  heroTitle.textContent = slide.title;
  heroDesc.textContent = slide.desc;
  heroCta.innerHTML = `${slide.cta} <b>→</b>`;
  heroDots.forEach((dot, idx) => {
    const isActive = idx === currentSlide;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

document.getElementById('heroPrev')?.addEventListener('click', () => renderSlide(currentSlide - 1));
document.getElementById('heroNext')?.addEventListener('click', () => renderSlide(currentSlide + 1));
heroDots.forEach((dot) =>
  dot.addEventListener('click', () => renderSlide(Number(dot.dataset.slide || 0)))
);

// MSN-style Top Search Filtering across cards & pillars
const searchForm = document.getElementById('portalSearchForm');
const searchInput = document.getElementById('portalSearchInput');
const searchClear = document.getElementById('portalSearchClear');
const searchStatus = document.getElementById('searchStatus');
const searchableItems = Array.from(document.querySelectorAll('[data-searchable]'));

function applyPortalSearch(scrollToMatch) {
  const query = searchInput.value.trim().toLowerCase();
  searchClear.hidden = query.length === 0;

  if (!query) {
    searchableItems.forEach((el) => {
      el.classList.remove('search-hidden', 'search-match');
    });
    searchStatus.hidden = true;
    searchStatus.textContent = '';
    return;
  }

  let firstMatch = null;
  let matchCount = 0;

  searchableItems.forEach((el) => {
    const text = el.textContent.toLowerCase();
    const matches = text.includes(query);
    el.classList.toggle('search-hidden', !matches);
    el.classList.toggle('search-match', matches);
    if (matches) {
      matchCount += 1;
      if (!firstMatch) firstMatch = el;
    }
  });

  searchStatus.hidden = false;
  searchStatus.textContent = '';
  const summarySpan = document.createElement('span');
  const queryText = searchInput.value.trim();
  summarySpan.textContent =
    matchCount > 0
      ? `Showing ${matchCount} matching item${matchCount === 1 ? '' : 's'} for "${queryText}".`
      : `No items matched "${queryText}".`;
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'portal-search-submit';
  resetBtn.id = 'resetFilterBtn';
  resetBtn.textContent = 'Show all';
  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    applyPortalSearch(false);
    searchInput.focus();
  });
  searchStatus.append(summarySpan, resetBtn);

  if (scrollToMatch && firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

searchInput?.addEventListener('input', () => applyPortalSearch(false));
searchClear?.addEventListener('click', () => {
  searchInput.value = '';
  applyPortalSearch(false);
  searchInput.focus();
});
searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  applyPortalSearch(true);
});

// In-page article reader modal for Latest News story bodies
const articleCatalog = {
  coalition: {
    dot: 'N',
    category: 'SOUTH AFRICA · POLITICS',
    title: 'DA Makes U-Turn, Invites EFF and MK Party to Municipal Coalition Talks',
    img: coalitionImg,
    alt: 'EFF leader Julius Malema waving in an EFF cap surrounded by supporters',
    imgPosition: 'center 14%',
    source: 'Sources cited: TimesLIVE & SABC',
    paragraphs: [
      'In a surprising political shift, the Democratic Alliance (DA) has formally initiated coalition discussions with both the Economic Freedom Fighters (EFF) and the uMkhonto weSizwe (MK) Party as political parties scramble to form municipal coalition governments.',
      'According to confirmation from the EFF to TimesLIVE, the party received an official letter from the DA expressing interest in working together at the municipal level. EFF leadership has reportedly already held an initial meeting with the DA regarding the proposal, though the party stated it has not yet issued a formal response.',
      'Simultaneously, the DA is preparing to sit down with the MK Party within the next 48 hours. Speaking to the SABC, the MK Party’s national negotiator, Advocate Dali Mpofu, confirmed that the party has officially accepted the DA\'s invitation to begin coalition talks.',
      'The move has sparked wide debate across the political landscape, given the DA\'s long-standing public stance against partnering with either party. The DA previously entered the Government of National Unity (GNU) explicitly to keep the EFF and MK Party out of national governance, frequently warning voters against what it termed a "doomsday coalition" involving the ANC, EFF, and MK Party. With meetings now underway and scheduled, all eyes are on how these unexpected negotiations will reshape local governance.',
    ],
  },
  agriculture: {
    dot: 'N',
    category: 'FOOD & LAND SOVEREIGNTY',
    title: 'Agricultural Cooperatives Expand Sovereign Grain and Seed Reserves',
    img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80',
    alt: 'African farmers tending thriving agricultural land',
    imgPosition: 'center',
    source: 'NEF123123 Dispatch · Food & Land Sovereignty',
    paragraphs: [
      'Community-governed farming syndicates across the continent are expanding shared grain silos and local seed banks to protect household food security and reduce reliance on imported staples.',
      'Through cooperative pooling of storage infrastructure, organic fertiliser production, and regional distribution routes, smallholder producers are able to hold harvests beyond peak season rather than selling grain at depressed farm-gate prices.',
      'Agronomists working with regional cooperatives note that preserving drought-tolerant indigenous seed varieties strengthens long-term resilience against erratic rainfall and volatile international commodity markets.',
      'Supporters of people-centred rural development emphasise that direct investment in land access, irrigation, and community-owned processing mills keeps agricultural value circulating within local economies.',
    ],
  },
  africaDignity: {
    dot: 'N',
    category: 'AFRICA',
    title: 'Building an African future rooted in dignity and self-determination',
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80',
    alt: 'African landscape',
    imgPosition: 'center',
    source: 'NEF123123 Perspective · Africa in Focus',
    paragraphs: [
      'Across the continent, a renewed conversation is taking shape around what true self-determination requires in the twenty-first century: institutions built to serve citizens, regional trade corridors controlled by African producers, and civic education rooted in shared accountability.',
      'Economists and community organisers point out that political independence reaches its full promise only when accompanied by economic agency—where households, workers, and local enterprises participate directly in value creation.',
      'Strengthening cross-border partnerships between African universities, cooperatives, and municipal planners is creating practical pathways to share technical skills, lower barriers to intra-African commerce, and build resilient public institutions.',
      'At the heart of this vision is human dignity: ensuring that policy decisions prioritise safe neighbourhoods, quality education, reliable infrastructure, and opportunities that allow young people to build lasting prosperity at home.',
    ],
  },
  africaDevelopment: {
    dot: 'N',
    category: 'DEVELOPMENT',
    title: 'Who owns the future of African development?',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern city buildings',
    imgPosition: 'center',
    source: 'NEF123123 Perspective · Development & Infrastructure',
    paragraphs: [
      'From ports and power grids to digital backbone networks and urban transit, infrastructure investment is reshaping African cities at unprecedented speed. Yet a critical question remains at the centre of every project: who captures the long-term economic value?',
      'When public-interest safeguards, domestic procurement rules, and local engineering participation are embedded from the outset, major capital projects build lasting domestic industrial capacity rather than leaving behind debt and imported dependency.',
      'Regional development specialists advocate transparent financing terms, municipal technical capacity building, and stronger participation by local pension funds and development banks so communities share in the returns of productive assets.',
      'Owning the future of development means measuring success not merely by ribbon-cutting ceremonies, but by reliable energy for small manufacturers, affordable logistics for local producers, and durable public value for generations.',
    ],
  },
  africaLand: {
    dot: 'N',
    category: 'LAND & RESOURCES',
    title: 'Land, resources and the promise of shared prosperity',
    img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80',
    alt: 'Hands holding soil and a seedling',
    imgPosition: 'center',
    source: 'NEF123123 Perspective · Land & Resources',
    paragraphs: [
      'Land and natural resources form the foundation of Africa’s economic potential—spanning fertile arable soils, freshwater basins, critical transition minerals, and renewable energy corridors.',
      'For decades, raw resource extraction without local beneficiation exported jobs and industrial margins abroad while leaving host communities vulnerable to ecological strain and volatile boom-and-bust cycles.',
      'A stewardship-driven model places equitable land tenure, environmental restoration, and domestic mineral and agricultural processing at the centre of national development strategies.',
      'By pairing fair ownership frameworks with accessible credit, extension services, and community equity stakes, Africa’s natural wealth can anchor broad-based opportunity and shared prosperity across both rural and urban communities.',
    ],
  },
  industrialisation: {
    dot: 'N',
    category: 'INDUSTRIALISATION',
    title: 'Continental Value Addition & Local Manufacturing',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1100&q=85',
    alt: 'Industrial production facility',
    imgPosition: 'center',
    source: 'NEF123123 Editorial Desk · Industrialisation',
    paragraphs: [
      'Across Africa’s industrial corridors, policy attention is increasingly shifting away from exporting raw commodities and toward domestic beneficiation, component assembly, and finished-goods manufacturing.',
      'Economists note that exporting unprocessed minerals and agricultural crops transfers the highest-margin stages of production—and the skilled engineering, logistics, and fabrication jobs tied to them—to external markets.',
      'Expanding special industrial zones powered by reliable electricity, regional rail links, and technical training colleges enables domestic enterprises to turn local raw materials into construction steel, processed foods, pharmaceuticals, and clean-energy hardware.',
      'Retaining value addition on the continent strengthens currency stability, widens the tax base for public services, and creates durable pathways for youth employment and technological sovereignty.',
    ],
  },
  affiliatePartners: {
    dot: 'A',
    category: 'AMAZON & SHOPIFY AFFILIATE',
    title: 'Amazon & Shopify Affiliate Marketing',
    img: null,
    alt: '',
    imgPosition: 'center',
    source: 'Affiliate Marketing Overview · Amazon & Shopify',
    paragraphs: [
      'Affiliate marketing through Amazon and Shopify gives publishers, creators, and online storefronts a direct way to recommend verified products and earn referral commissions when visitors complete qualifying purchases.',
      'With the Amazon Associates programme, featured links direct shoppers straight to marketplace listings across home essentials, electronics, books, and everyday goods, with real-time pricing and checkout handled securely on Amazon.',
      'Shopify affiliate marketing complements marketplace links by connecting audiences to independent direct-to-consumer brands, niche retail stores, and digital product storefronts powered by Shopify’s e-commerce platform and partner tracking tools.',
      'Clear affiliate disclosure ensures shoppers always know when links are sponsored, while curated Amazon and Shopify recommendations keep product discovery focused on practical value at no extra cost to the buyer.',
    ],
  },
};

const clickableStoryContainers = Array.from(
  document.querySelectorAll(
    '.story-body-clickable[data-article-id], .news-dispatch-clickable[data-article-id], .affiliate-ad-clickable-card[data-article-id]'
  )
);
const articleReaderModal = document.getElementById('articleReaderModal');
const closeArticleModalBtn = document.getElementById('closeArticleModal');
const closeArticleModalFooterBtn = document.getElementById('closeArticleModalFooter');
const articleModalBackdrop = document.getElementById('articleModalBackdrop');
const articleModalDot = document.getElementById('articleModalDot');
const articleModalCategory = document.getElementById('articleModalCategory');
const articleReaderTitle = document.getElementById('articleReaderTitle');
const articleModalMedia = articleReaderModal?.querySelector('.article-modal-media');
const articleModalImg = document.getElementById('articleModalImg');
const articleModalText = document.getElementById('articleModalText');
const articleModalSource = document.getElementById('articleModalSource');
let lastReaderTrigger = null;

function openArticleReader(articleId, triggerEl) {
  const article = articleCatalog[articleId];
  if (!articleReaderModal || !article) return;
  lastReaderTrigger = triggerEl || null;
  if (articleModalDot) articleModalDot.textContent = article.dot;
  if (articleModalCategory) articleModalCategory.textContent = article.category;
  if (articleReaderTitle) articleReaderTitle.textContent = article.title;
  if (articleModalMedia && articleModalImg) {
    if (article.img) {
      articleModalMedia.hidden = false;
      articleModalImg.setAttribute('src', article.img);
      articleModalImg.setAttribute('alt', article.alt);
      articleModalImg.style.objectPosition = article.imgPosition || 'center';
    } else {
      articleModalMedia.hidden = true;
      articleModalImg.removeAttribute('src');
      articleModalImg.setAttribute('alt', '');
    }
  }
  if (articleModalText) {
    articleModalText.textContent = '';
    article.paragraphs.forEach((copy) => {
      const p = document.createElement('p');
      p.textContent = copy;
      articleModalText.appendChild(p);
    });
  }
  if (articleModalSource) articleModalSource.textContent = article.source;

  articleReaderModal.hidden = false;
  document.body.style.overflow = 'hidden';
  closeArticleModalBtn?.focus();
}

function closeArticleReader() {
  if (!articleReaderModal || articleReaderModal.hidden) return;
  articleReaderModal.hidden = true;
  document.body.style.overflow = '';
  lastReaderTrigger?.focus();
}

clickableStoryContainers.forEach((storyContainer) => {
  const articleId = storyContainer.dataset.articleId;
  const readBtn = storyContainer.querySelector('.story-read-btn, .dispatch-read-btn, .ad-read-btn');

  storyContainer.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    if (event.target.closest('button') && event.target.closest('button') !== readBtn) return;
    openArticleReader(articleId, storyContainer);
  });

  storyContainer.addEventListener('keydown', (event) => {
    if (event.target.closest('a, button')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openArticleReader(articleId, storyContainer);
    }
  });

  readBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    openArticleReader(articleId, storyContainer);
  });
});

document
  .querySelectorAll('.msn-card-media-btn[data-article-id], .affiliate-ad-clickable[data-article-id]')
  .forEach((mediaBtn) => {
    mediaBtn.addEventListener('click', () => {
      openArticleReader(mediaBtn.dataset.articleId, mediaBtn);
    });
  });

closeArticleModalBtn?.addEventListener('click', closeArticleReader);
closeArticleModalFooterBtn?.addEventListener('click', closeArticleReader);
articleModalBackdrop?.addEventListener('click', closeArticleReader);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && articleReaderModal && !articleReaderModal.hidden) {
    closeArticleReader();
  }
});
