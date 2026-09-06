// Case studies / project work. Each object:
//   tag         short label shown on the card, e.g. "LBO Model"
//   category    filter group — "valuation" | "deal" | "screening"
//   title       project title
//   verdict     the one-line call / summary
//   stats       array of { label, value } — up to 4, shown as a small stat strip
//   points      supporting bullets for the quick-view modal
//   reportUrl   optional path to a PDF write-up (relative — sits in /reports)
//   modelUrl    optional path to the underlying .xlsx model (relative — sits in /models)
// The grid renders an intentional "in progress" placeholder when this array is empty.
const BUILT_IN_PROJECTS = [
  {
    tag: "LBO Model",
    category: "deal",
    title: "Qualys, Inc. — Take-Private LBO",
    verdict: "A cash-generative, debt-free security compounder, repriced by a market that wasn't paying for the balance sheet.",
    stats: [
      { label: "Entry multiple", value: "10.0x" },
      { label: "Entry leverage", value: "4.5x" },
      { label: "MOIC", value: "2.29x" },
      { label: "Gross IRR", value: "18.0%" }
    ],
    points: [
      "FY2025 revenue of $669M grew 10% at a 47% Adjusted EBITDA margin, against no funded debt and roughly $446M of cash",
      "Underwrites a 30% take-private premium at a 10.0x EBITDA entry — a discount to where quality cybersecurity SaaS names have historically traded",
      "Base case assumes no exit multiple expansion; free cash flow alone delevers from 4.5x to roughly 1.0x and drives the 2.29x MOIC / 18.0% IRR"
    ],
    reportUrl: "reports/QLYS_Investment_Thesis.pdf",
    modelUrl: "models/QLYS_LBO_Model.xlsx"
  },
  {
    tag: "IPO Valuation",
    category: "valuation",
    title: "Jio Platforms — IPO Valuation",
    verdict: "Conditional Subscribe: one of the highest-quality large-scale businesses to list in India in years, priced somewhere between a telecom carrier and a digital platform.",
    stats: [
      { label: "Revenue CAGR FY24–26", value: "15.8%" },
      { label: "FY26 EBITDA margin", value: "51.9%" },
      { label: "Blended fair value", value: "$130bn" },
      { label: "Implied EV range", value: "$96–171bn" }
    ],
    points: [
      "Category leadership across the connectivity stack: #1 in wireless (49.95% share) and fixed broadband (42.60% share), plus the largest 5G base outside China",
      "Net leverage already down to 0.4x from 0.9x; IPO proceeds are earmarked to take net debt to roughly zero",
      "Comparable-company work puts fair value near ₹1,335/share — above roughly ₹1,600/share, investors are underwriting a platform story the DRHP doesn't yet prove out in the numbers"
    ],
    reportUrl: "reports/Jio_Platforms_IPO_Investment_Thesis.pdf",
    modelUrl: "models/Jio_Platforms_IPO_Valuation.xlsx"
  },
  {
    tag: "DCF & Comps",
    category: "valuation",
    title: "The Coca-Cola Company — DCF + Comparable Company Valuation",
    verdict: "Overvalued: blended fair value lands roughly 26% below the market price, with the DCF and EV/EBITDA comp agreeing and the P/E comp the clear outlier.",
    stats: [
      { label: "Share price", value: "$91.10" },
      { label: "DCF (base case)", value: "$61.90" },
      { label: "Blended fair value", value: "$67.85" },
      { label: "Vs. price", value: "(26%)" }
    ],
    points: [
      "The concentrate-and-syrup model keeps capex light, which is most of why free cash flow conversion holds up even as developed-market volume growth flattens",
      "DCF ($61.90) and the EV/EBITDA comp ($39.97) point the same direction; the P/E comp ($101.68) is the outlier, pulled up by Monster Beverage's structurally richer multiple",
      "A 6.83% WACC and terminal growth assumption carry most of the valuation — the model's sensitivity table and Bear/Base/Bull toggle isolate exactly how much"
    ],
    reportUrl: "reports/KO_DCF_Comps_Writeup.pdf",
    modelUrl: "models/KO_DCF_Comps_Model.xlsx"
  },
  {
    tag: "M&A Case Study",
    category: "deal",
    title: "Microsoft's Acquisition of Activision Blizzard",
    verdict: "Strategically compelling, financially reasonable — not the bargain a first-pass DCF suggests, and not the overpay the 45% headline premium implies either.",
    stats: [
      { label: "Offer price / share", value: "$95.00" },
      { label: "Enterprise value", value: "$68.7bn" },
      { label: "Premium to unaffected", value: "45.3%" },
      { label: "Standalone DCF / share", value: "~$93" }
    ],
    points: [
      "Standalone DCF value lands around $90–95/share — essentially where Microsoft paid, once franchise-concentration risk is priced into the discount rate",
      "A meaningful share of the 45% premium is Microsoft paying back a discount the market had already applied after the 2021 DFEH lawsuit and leadership crisis",
      "Real economics hinge on Game Pass, mobile, and cloud synergies that were genuinely hard to underwrite in January 2022 and remain only partially proven out today"
    ],
    reportUrl: "reports/MSFT_ATVI_MA_Report.pdf"
  },
  {
    tag: "Equity Research",
    category: "valuation",
    title: "NVIDIA Corporation — Initiation of Coverage",
    verdict: "HOLD: near-term growth is close to a sure thing — the real disagreement is what discount rate a business this large, this fast-growing, and this customer-concentrated deserves.",
    stats: [
      { label: "Rating", value: "HOLD" },
      { label: "Blended price target", value: "$179" },
      { label: "Share price", value: "$217.43" },
      { label: "PT vs. price", value: "(17.6%)" }
    ],
    points: [
      "Q2 FY27 revenue of $96.2bn, up 106% YoY, with the company beating its own guidance for thirteen consecutive quarters",
      "A standalone DCF at NVIDIA's own reported beta implies roughly $133/share; the same cash flows at a de-risked discount rate imply roughly $226 — the stock trades almost exactly between the two",
      "The blended $179 price target weights the two DCF scenarios well above the P/E-based comp, which the model treats as unreliable"
    ],
    reportUrl: "reports/NVDA_Equity_Research_Report.pdf",
    modelUrl: "models/NVDA_Equity_Research_Model.xlsx"
  },
  {
    tag: "Screening Model",
    category: "screening",
    title: "Enterprise Software & Cybersecurity — PE Target Screen",
    verdict: "A systematic, five-factor screen across six listed names — built to surface LBO-suitable fundamentals, not just a cheap multiple.",
    stats: [
      { label: "Universe", value: "6 companies" },
      { label: "Top candidate", value: "Qualys (QLYS)" },
      { label: "Composite score", value: "82.4" },
      { label: "EV/EBITDA", value: "7.4x" }
    ],
    points: [
      "Scores each company on growth quality, margin, leverage headroom, valuation, and business stability — a cheap multiple alone is treated as a warning label, not a buy signal",
      "Ranked Qualys the top candidate at a composite score of 82.4, feeding directly into the standalone take-private LBO underwrite",
      "Deliberately includes Rapid7 as a stress test: statistically cheap on trailing EV/EBITDA, but hard to underwrite amid activist involvement and a 2026 CEO transition"
    ],
    modelUrl: "models/PE_Target_Screening_Model.xlsx"
  }
];

const BUILT_IN_INSIGHTS = [
  {
    category: "markets",
    tag: "Sports Business",
    date: "Case Study",
    title: "How Formula 1 Makes Money and Why It Is a Billion-Dollar Machine",
    summary: "A business-model breakdown of Formula 1 focused on media rights, sponsorship, race economics, brand power, and how the sport built a scaled global monetization engine.",
    points: [
      "Explains the revenue architecture behind a global sports property",
      "Connects brand, media, and commercial strategy into one framework",
      "Shows ability to analyze business models beyond traditional finance sectors"
    ],
    articleUrl: "https://www.linkedin.com/pulse/how-formula-1-makes-money-why-its-billion-dollar-machine-tiwari-0alcc/?trackingId=JzrRonJe5Fv8yQ0zr7es7A%3D%3D",
    postUrl: "https://www.linkedin.com/pulse/how-formula-1-makes-money-why-its-billion-dollar-machine-tiwari-0alcc/?trackingId=JzrRonJe5Fv8yQ0zr7es7A%3D%3D"
  },
  {
    category: "fintech",
    tag: "Fintech",
    date: "Case Study",
    title: "Pine Labs and the Fintech IPO Question",
    summary: "A fintech-focused lens on Pine Labs, its positioning, business quality, and the larger IPO conversation around Indian fintech infrastructure and investor expectations.",
    points: [
      "Demonstrates understanding of fintech infrastructure and capital markets",
      "Combines company analysis with market timing and investor sentiment",
      "Shows comfort analyzing fintech infrastructure alongside capital-markets timing"
    ],
    articleUrl: "https://www.linkedin.com/posts/adityatiwari19_fintech-pinelabs-ipo-activity-7345800545946714112-Ny-T?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_fintech-pinelabs-ipo-activity-7345800545946714112-Ny-T?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "ib",
    tag: "Conglomerates",
    date: "Case Study",
    title: "From Steel to Startups: The Tata Group Playbook",
    summary: "A strategy-led case study of Tata Group examining how a legacy conglomerate adapted across sectors, institutions, and eras while retaining strategic relevance.",
    points: [
      "Shows long-horizon thinking about business transformation",
      "Links legacy industrial strength with modern strategic reinvention",
      "Signals strong interest in corporate strategy and value creation"
    ],
    articleUrl: "https://www.linkedin.com/pulse/from-steel-startups-aditya-tiwari-d9s9c/?trackingId=eZzkQXafX3rVlcxvih9jPA%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_casestudy-tatagroup-indiainc-activity-7340615574403633152-Bqvr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "strategy",
    tag: "Consumer Tech",
    date: "Case Study",
    title: "From Minutes to Market Share: The Zepto Story",
    summary: "A high-speed business case study on Zepto, quick commerce economics, competitive strategy, market timing, and the operating logic behind category creation.",
    points: [
      "Explores scale, distribution, and market-share capture in a new category",
      "Balances narrative growth with strategic and commercial realities",
      "Shows comfort analyzing modern consumer and tech business models"
    ],
    articleUrl: "https://www.linkedin.com/pulse/from-minutes-market-share-aditya-tiwari-7fqhc/?trackingId=EWykSGryPigS2ne8qvDcvA%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_casestudy-zepto-quickcommerce-activity-7338427779287347200-uJu4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "markets",
    tag: "Digital Infra",
    date: "Case Study",
    title: "Jio: The Telecom Disruption That Rebooted a Nation",
    summary: "A market-shaping case study on Jio covering telecom economics, digital infrastructure, scale strategy, and how one business can alter an entire ecosystem.",
    points: [
      "Analyzes disruption through pricing, infrastructure, and ecosystem expansion",
      "Shows ability to think about market structure at national scale",
      "Connects business strategy with platform effects and adoption"
    ],
    articleUrl: "https://www.linkedin.com/pulse/jio-telecom-rebooted-nation-aditya-tiwari-ctplc/?trackingId=KBGwIQ6ct2wopF3aAWJlsQ%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_casestudy-jio-digitalindia-activity-7338086428657991681-oaHi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "markets",
    tag: "Sports Business",
    date: "Case Study",
    title: "From Match Day to Market Domination: The IPL Business Engine",
    summary: "A sports-business analysis of the IPL as an entertainment, media, consumer, and brand platform with durable commercial leverage.",
    points: [
      "Breaks down media, sponsorship, fandom, and platform monetization",
      "Shows comfort analyzing modern business models outside narrow templates",
      "Useful proof of strategic thinking and commercial pattern recognition"
    ],
    articleUrl: "https://www.linkedin.com/pulse/from-match-day-market-domination-aditya-tiwari-pqkkc/?trackingId=jMmNsvP3ZssyOHmCsJau3Q%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_ipl-businessofsport-casestudy-activity-7335145658359709699-mSzt?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "strategy",
    tag: "Retail",
    date: "Case Study",
    title: "From Shame to Shelf Space: Building a Retail Moat",
    summary: "A consumer and retail positioning case study focused on brand strength, distribution leverage, customer psychology, and how shelf presence turns into durable advantage.",
    points: [
      "Highlights brand and distribution as strategic assets",
      "Connects retail visibility to moat-building and market capture",
      "Shows ability to analyze consumer businesses with nuance"
    ],
    articleUrl: "https://www.linkedin.com/pulse/from-shame-shelf-space-aditya-tiwari-ygibc/?trackingId=HEgheMlWuRjjU8wCHit0jw%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_casestudy-retailmoats-comfortbrand-activity-7334435984232599552-mXad?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  },
  {
    category: "ib",
    tag: "FMCG",
    date: "Case Study",
    title: "From Bhujia to Bowls to Boardrooms: The Haldiram Story",
    summary: "A case study on Haldiram's growth, brand positioning, product strength, and how an Indian FMCG story compounds from consumer habit into scalable business power.",
    points: [
      "Demonstrates understanding of FMCG scale and brand durability",
      "Shows how product, distribution, and recall reinforce each other",
      "Shows range across strategy, markets, and consumer-sector analysis"
    ],
    articleUrl: "https://www.linkedin.com/pulse/from-bhujia-bowls-boardrooms-aditya-tiwari-kolnc/?trackingId=5Kart1wLHjf%2FK%2F7ZhuZjag%3D%3D",
    postUrl: "https://www.linkedin.com/posts/adityatiwari19_casestudy-fmcg-haldiram-activity-7334058498550308866-LoXR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZ7RmQBjOuMR_xInrxXLSKk6psFHavF8U0"
  }
];

// ---------- content added via admin.html (stored in this browser only) ----------
// admin.html keeps one persistent "master list" per content type in localStorage.
// The first time admin.html runs in a browser, it seeds that list from BUILT_IN_*
// below. After that, the master list (not BUILT_IN_*) is the source of truth for
// that browser — adding/removing in admin.html edits it directly, so nothing is
// ever lost across multiple add-then-export rounds. To make changes visible to
// everyone who visits the live site (not just this browser), use admin.html's
// "Save Website File" button, which downloads a fresh script.js with the current
// master list baked in as BUILT_IN_PROJECTS / BUILT_IN_INSIGHTS.
function getAllProjects() {
  try {
    const master = localStorage.getItem("portfolio-master-projects");
    if (master) {
      return JSON.parse(master);
    }
  } catch (e) {
    // fall through to built-in
  }
  return BUILT_IN_PROJECTS;
}

function getAllInsights() {
  try {
    const master = localStorage.getItem("portfolio-master-insights");
    if (master) {
      return JSON.parse(master);
    }
  } catch (e) {
    // fall through to built-in
  }
  return BUILT_IN_INSIGHTS;
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");
const progressRule = document.getElementById("progressRule");
const navLinks = document.querySelectorAll(".nav a");

const projectGrid = document.getElementById("projectGrid");
const projectFilterButtons = document.querySelectorAll("#projectFilterGroup .filter-btn");
const projectModal = document.getElementById("projectModal");
const projectModalTag = document.getElementById("projectModalTag");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalVerdict = document.getElementById("projectModalVerdict");
const projectModalStats = document.getElementById("projectModalStats");
const projectModalPoints = document.getElementById("projectModalPoints");
const projectModalActions = document.getElementById("projectModalActions");
const projectModalClose = document.getElementById("projectModalClose");

const insightGrid = document.getElementById("insightGrid");
const insightFilterButtons = document.querySelectorAll("#insights .filter-btn");
const modal = document.getElementById("insightModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalSummary = document.getElementById("modalSummary");
const modalPoints = document.getElementById("modalPoints");
const modalArticleLink = document.getElementById("modalArticleLink");
const modalPostLink = document.getElementById("modalPostLink");
const modalClose = document.getElementById("modalClose");

function renderProjects(filter) {
  const projects = getAllProjects();

  if (!projects.length) {
    projectGrid.innerHTML = `
      <article class="project-card project-placeholder">
        <span class="doc-label">In progress</span>
        <h3>Case studies are being added</h3>
        <p>Selected financial models and project write-ups will appear here shortly.</p>
      </article>
      <article class="project-card project-placeholder">
        <span class="doc-label">In progress</span>
        <h3>Reserved slot</h3>
        <p>&nbsp;</p>
      </article>
      <article class="project-card project-placeholder">
        <span class="doc-label">In progress</span>
        <h3>Reserved slot</h3>
        <p>&nbsp;</p>
      </article>
    `;
    return;
  }

  projectGrid.innerHTML = projects
    .map((project, originalIndex) => ({ ...project, originalIndex }))
    .filter((project) => !filter || project.category === filter)
    .map((project) => {
      const hint = [project.reportUrl ? "Write-up" : null, project.modelUrl ? "Model" : null]
        .filter(Boolean)
        .join(" + ");

      return `
        <article class="project-card" data-index="${project.originalIndex}">
          <span class="doc-label">${project.tag}</span>
          <h3>${project.title}</h3>
          <p>${project.verdict}</p>
          <div class="project-stats">
            ${project.stats
              .slice(0, 4)
              .map((stat) => `<div class="project-stat"><span>${stat.label}</span><strong>${stat.value}</strong></div>`)
              .join("")}
          </div>
          <div class="project-meta">
            <button class="mini-btn" data-action="project-details" data-index="${project.originalIndex}">Quick view</button>
            ${hint ? `<span class="project-hint">${hint}</span>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

function activateProjectFilter(button) {
  projectFilterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderProjects(button.dataset.filter);
}

function openProjectModal(index) {
  const project = getAllProjects()[index];

  if (!project) {
    return;
  }

  projectModalTag.textContent = project.tag;
  projectModalTitle.textContent = project.title;
  projectModalVerdict.textContent = project.verdict;
  projectModalStats.innerHTML = project.stats
    .map((stat) => `<div><span>${stat.label}</span><strong>${stat.value}</strong></div>`)
    .join("");
  projectModalPoints.innerHTML = project.points.map((point) => `<li>${point}</li>`).join("");

  const actions = [];
  if (project.reportUrl) {
    actions.push(`<a class="btn btn-primary" href="${project.reportUrl}" target="_blank" rel="noreferrer">Read full write-up</a>`);
  }
  if (project.modelUrl) {
    actions.push(`<a class="btn btn-secondary" href="${project.modelUrl}" target="_blank" rel="noreferrer">Download model (.xlsx)</a>`);
  }
  projectModalActions.innerHTML = actions.join("");

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function renderInsights(filter) {
  insightGrid.innerHTML = getAllInsights()
    .map((insight, originalIndex) => ({ ...insight, originalIndex }))
    .filter((insight) => !filter || insight.category === filter)
    .map(
      (insight) => `
        <article class="insight-card" data-index="${insight.originalIndex}" data-category="${insight.category}">
          <div class="tag-row">
            <span class="tag">${insight.tag}</span>
            <span class="insight-date">${insight.date}</span>
          </div>
          <h3>${insight.title}</h3>
          <p>${insight.summary}</p>
          <div class="insight-meta">
            <button class="mini-btn" data-action="details" data-index="${insight.originalIndex}">Quick view</button>
            <div class="insight-buttons">
              <a class="mini-btn" href="${insight.articleUrl}" target="_blank" rel="noreferrer">Article</a>
              <a class="mini-btn" href="${insight.postUrl}" target="_blank" rel="noreferrer">Post</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function openModal(index) {
  const insight = getAllInsights()[index];

  if (!insight) {
    return;
  }

  modalCategory.textContent = insight.tag;
  modalTitle.textContent = insight.title;
  modalSummary.textContent = insight.summary;
  modalPoints.innerHTML = insight.points.map((point) => `<li>${point}</li>`).join("");
  modalArticleLink.href = insight.articleUrl;
  modalPostLink.href = insight.postUrl;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function activateInsightFilter(button) {
  insightFilterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderInsights(button.dataset.filter);
}

function handleReveal() {
  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function handleSectionSpy() {
  const sections = [...document.querySelectorAll("main section[id]")];

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function handleScrollProgress() {
  if (!progressRule) {
    return;
  }

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressRule.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

renderProjects("valuation");
renderInsights("markets");

// If admin.html (in another tab) adds content, refresh this page's grids live.
window.addEventListener("storage", (event) => {
  if (event.key === "portfolio-master-projects") {
    const activeProjectFilter = document.querySelector("#projectFilterGroup .filter-btn.active");
    renderProjects(activeProjectFilter ? activeProjectFilter.dataset.filter : "valuation");
  }
  if (event.key === "portfolio-master-insights") {
    const activeInsightFilter = document.querySelector("#insights .filter-btn.active");
    renderInsights(activeInsightFilter ? activeInsightFilter.dataset.filter : "markets");
  }
});
handleReveal();
handleSectionSpy();
handleScrollProgress();

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => activateProjectFilter(button));
});

insightFilterButtons.forEach((button) => {
  button.addEventListener("click", () => activateInsightFilter(button));
});

insightGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action='details']");

  if (!trigger) {
    return;
  }

  openModal(Number(trigger.dataset.index));
});

modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);

projectGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action='project-details']");

  if (!trigger) {
    return;
  }

  openProjectModal(Number(trigger.dataset.index));
});

projectModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeProjectModal();
  }
});

projectModalClose.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal.classList.contains("open")) {
      closeModal();
    }
    if (projectModal.classList.contains("open")) {
      closeProjectModal();
    }
  }
});
