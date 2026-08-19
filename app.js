// RaVida — simple stack-based navigation, no build step required.

const ICONS = {
  smile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" stroke-linecap="round"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" stroke-linecap="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-9.5-9C.8 7.2 2.8 4 6 4c2 0 3.4 1.1 4 2.2C10.6 5.1 12 4 14 4c3.2 0 5.2 3.2 3.5 7-2.5 4.6-9.5 9-9.5 9Z" stroke-linejoin="round"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19c8 1 14-5 14-14-9 0-14 5-14 14Z" stroke-linejoin="round"/><path d="M5 19c2-4 5-7 9-9" stroke-linecap="round"/></svg>`,
  drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3s6 6.8 6 11a6 6 0 1 1-12 0c0-4.2 6-11 6-11Z" stroke-linejoin="round"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.6 5.8L21 9.6l-4.7 4.2L17.6 21 12 17.6 6.4 21l1.3-7.2L3 9.6l6.4-0.8L12 3Z" stroke-linejoin="round"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" stroke-linejoin="round"/></svg>`,
  flower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="2.3"/><circle cx="12" cy="6" r="2.3"/><circle cx="12" cy="18" r="2.3"/><circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="12" r="2.3"/></svg>`,
  hand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 12V4a1.5 1.5 0 0 1 3 0v8M14 12.2V5.5a1.5 1.5 0 0 1 3 0V13M8 13c0-1-3-1-3 1.5 0 3.5 3 8.5 8 8.5s7-3.5 7-7.5v-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  syringe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 4l-3 3M17 7l-9 9-3 5 5-3 9-9-2-2ZM14 10l-3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="6" r="2.3"/><circle cx="6" cy="18" r="2.3"/><path d="M8 8l11 11M19 5 8 16" stroke-linecap="round"/></svg>`,
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

function iconMarkup(key) {
  return ICONS[key] || ICONS.sparkle;
}

// ---------- Theme application ----------

function applyTheme() {
  const t = (DATA && DATA.theme) || {};
  const c = t.colors || {};
  const f = t.fonts || {};
  const rootStyle = document.documentElement.style;

  const map = {
    "--bg-0": c.bg0, "--bg-1": c.bg1, "--bg-2": c.bg2,
    "--gold": c.gold, "--gold-bright": c.goldBright,
    "--white": c.white, "--gray": c.gray, "--gray-dim": c.grayDim,
    "--card-border": c.cardBorder, "--card-border-hover": c.cardBorderHover,
    "--font-display": f.displayFont, "--font-body": f.bodyFont
  };
  Object.entries(map).forEach(([k, v]) => { if (v) rootStyle.setProperty(k, v); });

  if (f.homeTitleSize) rootStyle.setProperty("--home-title-size", f.homeTitleSize);
  if (f.screenTitleSize) rootStyle.setProperty("--screen-title-size", f.screenTitleSize);
  if (f.bodySize) rootStyle.setProperty("--body-size", f.bodySize);

  const logoSize = (t.logo && t.logo.size) || 96;
  rootStyle.setProperty("--logo-size", logoSize + "px");

  renderBackground(t.background);
}

function renderBackground(bg) {
  let layer = document.getElementById("bg-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "bg-layer";
    document.body.insertBefore(layer, document.body.firstChild);
  }
  layer.innerHTML = "";
  layer.removeAttribute("style");
  layer.className = "";

  if (!bg || bg.type === "default" || !bg.value) return;

  if (bg.type === "color") {
    layer.style.background = bg.value;
  } else if (bg.type === "image") {
    layer.style.backgroundImage = `url(${bg.value})`;
    layer.style.backgroundSize = "cover";
    layer.style.backgroundPosition = "center";
    layer.classList.add("bg-dim");
  } else if (bg.type === "video") {
    const parsed = parseVideoUrl(bg.value);
    if (parsed.type === "file") {
      const video = document.createElement("video");
      video.src = parsed.src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      layer.appendChild(video);
    } else if (parsed.type === "youtube" || parsed.type === "vimeo") {
      const iframeWrap = document.createElement("div");
      iframeWrap.className = "bg-embed-wrap";
      const iframe = document.createElement("iframe");
      iframe.src = parsed.src;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
      iframe.className = "bg-embed-iframe";
      iframeWrap.appendChild(iframe);
      layer.appendChild(iframeWrap);
    } else {
      // Unrecognized link — nothing we can safely embed
      return;
    }
    layer.classList.add("bg-dim");
  }
}

function parseVideoUrl(raw) {
  const url = (raw || "").trim();
  if (!url) return { type: "none" };

  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      type: "vimeo",
      src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`
    };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url) || url.startsWith("data:video")) {
    return { type: "file", src: url };
  }

  return { type: "unknown" };
}

// ---------- Screens ----------

function renderHeader(title) {
  const header = el(`
    <div class="screen-header">
      <button class="back-btn" aria-label="Go back">${ICONS.arrowLeft}</button>
      <h1 class="screen-title" data-field="title">${title}</h1>
    </div>
  `);
  header.querySelector(".back-btn").addEventListener("click", pop);
  return header;
}

function renderHome() {
  const wrap = el(`<div></div>`);
  const logoSrc = (DATA.theme && DATA.theme.logo && DATA.theme.logo.src) || "logo.jpeg";
  const hero = el(`
    <div class="home-hero">
      <img class="home-logo" src="${logoSrc}" alt="RaVida logo" data-field="logo" />
      <h1 class="home-title" data-field="clinicName">${DATA.clinicName}</h1>
      <p class="home-tagline" data-field="tagline">${DATA.tagline}</p>
    </div>
  `);
  const grid = el(`<div class="category-grid" data-role="category-grid"></div>`);

  DATA.categories.forEach((cat) => {
    const iconKey = (DATA.theme && DATA.theme.icons && DATA.theme.icons[cat.id]) || cat.icon;
    const iconSvg = iconKey && iconKey.indexOf("<svg") === 0 ? iconKey : iconMarkup(iconKey);
    const card = el(`
      <button class="category-card" data-cat-id="${cat.id}">
        <span class="category-icon" data-role="cat-icon">${iconSvg}</span>
        <span class="category-label" data-field="name">${cat.name}</span>
      </button>
    `);
    card.addEventListener("click", () => {
      push({ view: "category", categoryId: cat.id });
    });
    grid.appendChild(card);
  });

  wrap.appendChild(hero);
  wrap.appendChild(grid);
  wrap.appendChild(el(`<p class="footer-note" data-role="footer-note">RaVida Medical &amp; Holistic Clinic</p>`));
  return wrap;
}

function renderCategory(categoryId) {
  const cat = findCategory(categoryId);
  const wrap = el(`<div></div>`);
  wrap.appendChild(renderHeader(cat.name));

  const list = el(`<div class="list-col" data-role="subcat-list" data-cat-id="${categoryId}"></div>`);
  cat.subcategories.forEach((sub) => {
    const badge = sub.badge
      ? `<span class="badge ${badgeClass[sub.badge]}" data-field="badge">${sub.badge}</span>`
      : `<span class="badge badge-none" data-field="badge" hidden></span>`;
    const row = el(`
      <button class="list-row" data-cat-id="${categoryId}" data-sub-id="${sub.id}">
        <span class="list-row-main">
          <span class="list-row-title" data-field="name">${sub.name}</span>
          ${badge}
        </span>
        <span class="chevron">${ICONS.chevronRight}</span>
      </button>
    `);
    row.addEventListener("click", () => {
      push({ view: "subcategory", categoryId, subcategoryId: sub.id });
    });
    list.appendChild(row);
  });

  wrap.appendChild(list);
  return wrap;
}

function renderSubcategory(categoryId, subcategoryId) {
  const sub = findSubcategory(categoryId, subcategoryId);
  const wrap = el(`<div></div>`);
  wrap.appendChild(renderHeader(sub.name));

  const col = el(`<div class="accordion-col" data-role="accordion-list" data-cat-id="${categoryId}" data-sub-id="${subcategoryId}"></div>`);

  sub.items.forEach((item, idx) => {
    const imageBlock = item.image
      ? `<img class="service-image" src="${item.image}" alt="${item.title}" data-field="image" />`
      : "";
    const itemEl = el(`
      <div class="accordion-item" data-item-index="${idx}">
        <button class="accordion-trigger" aria-expanded="false">
          <span class="accordion-heading">
            <span class="accordion-title" data-field="title">${item.title}</span>
            <span class="accordion-subtitle" data-field="subtitle">${item.subtitle}</span>
          </span>
          <span class="accordion-chevron">${ICONS.chevronDown}</span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel-inner">
            ${imageBlock}
            <ul class="bullet-list" data-role="bullet-list">
              ${item.bullets.map((b, bi) => `<li data-bullet-index="${bi}"><span data-field="bullet">${b}</span></li>`).join("")}
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
  applyTheme();
  document.dispatchEvent(new CustomEvent("ravida:render", { detail: { current } }));
}

// Expose a small API for admin.js to use without tight coupling
window.RavidaApp = {
  render,
  applyTheme,
  push,
  pop,
  getStack: () => stack,
  findCategory,
  findSubcategory,
  el,
  ICONS,
  badgeClass,
  parseVideoUrl
};

applyTheme();
render();
