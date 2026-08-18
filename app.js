// RaVida — simple stack-based navigation, no build step required.

const ICONS = {
  smile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" stroke-linecap="round"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" stroke-linecap="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

const badgeClass = {
  POPULAR: "badge-popular",
  TRENDING: "badge-trending",
  ADVANCED: "badge-advanced"
};

// Navigation stack: each entry is { view: 'home' | 'category' | 'subcategory', categoryId, subcategoryId }
let stack = [{ view: "home" }];

const root = document.getElementById("app-root");

function push(entry) {
  stack.push(entry);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pop() {
  if (stack.length > 1) stack.pop();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function findCategory(id) {
  return DATA.categories.find((c) => c.id === id);
}

function findSubcategory(categoryId, subId) {
  const cat = findCategory(categoryId);
  return cat ? cat.subcategories.find((s) => s.id === subId) : null;
}

function el(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstElementChild;
}

function renderHeader(title) {
  const header = el(`
    <div class="screen-header">
      <button class="back-btn" aria-label="Go back">${ICONS.arrowLeft}</button>
      <h1 class="screen-title">${title}</h1>
    </div>
  `);
  header.querySelector(".back-btn").addEventListener("click", pop);
  return header;
}

function renderHome() {
  const wrap = el(`<div></div>`);
  const hero = el(`
    <div class="home-hero">
      <img class="home-logo" src="logo.jpeg" alt="RaVida logo" />
      <h1 class="home-title">RaVida</h1>
      <p class="home-tagline">${DATA.tagline}</p>
    </div>
  `);
  const grid = el(`<div class="category-grid"></div>`);

  DATA.categories.forEach((cat) => {
    const card = el(`
      <button class="category-card">
        <span class="category-icon">${ICONS[cat.icon]}</span>
        <span class="category-label">${cat.name}</span>
      </button>
    `);
    card.addEventListener("click", () => push({ view: "category", categoryId: cat.id }));
    grid.appendChild(card);
  });

  wrap.appendChild(hero);
  wrap.appendChild(grid);
  wrap.appendChild(el(`<p class="footer-note">RaVida Medical &amp; Holistic Clinic</p>`));
  return wrap;
}

function renderCategory(categoryId) {
  const cat = findCategory(categoryId);
  const wrap = el(`<div></div>`);
  wrap.appendChild(renderHeader(cat.name));

  const list = el(`<div class="list-col"></div>`);
  cat.subcategories.forEach((sub) => {
    const badge = sub.badge
      ? `<span class="badge ${badgeClass[sub.badge]}">${sub.badge}</span>`
      : "";
    const row = el(`
      <button class="list-row">
        <span class="list-row-main">
          <span class="list-row-title">${sub.name}</span>
          ${badge}
        </span>
        <span class="chevron">${ICONS.chevronRight}</span>
      </button>
    `);
    row.addEventListener("click", () =>
      push({ view: "subcategory", categoryId, subcategoryId: sub.id })
    );
    list.appendChild(row);
  });

  wrap.appendChild(list);
  return wrap;
}

function renderSubcategory(categoryId, subcategoryId) {
  const sub = findSubcategory(categoryId, subcategoryId);
  const wrap = el(`<div></div>`);
  wrap.appendChild(renderHeader(sub.name));

  const col = el(`<div class="accordion-col"></div>`);

  sub.items.forEach((item, idx) => {
    const itemEl = el(`
      <div class="accordion-item">
        <button class="accordion-trigger" aria-expanded="false">
          <span class="accordion-heading">
            <span class="accordion-title">${item.title}</span>
            <span class="accordion-subtitle">${item.subtitle}</span>
          </span>
          <span class="accordion-chevron">${ICONS.chevronDown}</span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel-inner">
            <ul class="bullet-list">
              ${item.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `);

    const trigger = itemEl.querySelector(".accordion-trigger");
    const panel = itemEl.querySelector(".accordion-panel");

    trigger.addEventListener("click", () => {
      const isOpen = itemEl.classList.contains("open");
      if (isOpen) {
        panel.style.maxHeight = null;
        itemEl.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        itemEl.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });

    // First item open by default, matching the reference screenshots
    if (idx === 0) {
      itemEl.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        panel.style.maxHeight = panel.scrollHeight + "px";
      });
    }

    col.appendChild(itemEl);
  });

  wrap.appendChild(col);
  return wrap;
}

function render() {
  const current = stack[stack.length - 1];
  root.innerHTML = "";

  let screen;
  if (current.view === "home") {
    screen = renderHome();
  } else if (current.view === "category") {
    screen = renderCategory(current.categoryId);
  } else if (current.view === "subcategory") {
    screen = renderSubcategory(current.categoryId, current.subcategoryId);
  }

  root.appendChild(screen);
}

render();
