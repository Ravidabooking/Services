// RaVida Admin Mode
// NOTE: This is a client-side gate for convenience, not real security —
// the credentials live in this file, which anyone can view in the browser.
// Good enough to keep casual visitors from poking around; not a substitute
// for a real backend if this ever needs to protect sensitive data.

(function () {
  const ADMIN_EMAIL = "admin@shift.com";
  const ADMIN_PASSWORD = "Admin14321432";

  const SESSION_KEY = "ravida_admin_active";
  const LS_OWNER = "ravida_gh_owner";
  const LS_REPO = "ravida_gh_repo";
  const LS_BRANCH = "ravida_gh_branch";
  const LS_TOKEN = "ravida_gh_token";

  const ICON_CHOICES = ["smile", "sun", "plus", "clock", "heart", "leaf", "drop", "sparkle", "star", "shield", "flower", "hand", "syringe", "scissors"];

  let editMode = false;
  let footerClicks = 0;
  let footerTimer = null;
  let dirty = false; // true once DATA has been edited since last publish/download

  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function toast(msg, isError) {
    const t = el(`<div class="admin-toast">${msg}</div>`);
    if (isError) t.style.borderColor = "#e08484";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }

  // ---------- Login ----------

  function openLoginModal() {
    if (document.getElementById("admin-login-overlay")) return;
    const overlay = el(`
      <div class="admin-overlay" id="admin-login-overlay">
        <div class="admin-modal">
          <h2>Admin Login</h2>
          <p class="admin-note">This unlocks live editing for this browser session. It's a soft gate, not a secure login — don't use it to protect sensitive information.</p>
          <p class="admin-error" id="admin-login-error"></p>
          <div class="admin-field">
            <label>Email</label>
            <input type="email" id="admin-email" autocomplete="username" />
          </div>
          <div class="admin-field">
            <label>Password</label>
            <input type="password" id="admin-password" autocomplete="current-password" />
          </div>
          <div class="admin-row-buttons">
            <button class="admin-btn admin-btn-ghost" id="admin-login-cancel">Cancel</button>
            <button class="admin-btn" id="admin-login-submit">Log In</button>
          </div>
        </div>
      </div>
    `);
    document.body.appendChild(overlay);

    const emailInput = overlay.querySelector("#admin-email");
    const passInput = overlay.querySelector("#admin-password");
    const errEl = overlay.querySelector("#admin-login-error");

    function attempt() {
      const email = emailInput.value.trim().toLowerCase();
      const pass = passInput.value;
      if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "1");
        overlay.remove();
        bootAdminUI();
        toast("Admin mode unlocked");
      } else {
        errEl.textContent = "Incorrect email or password.";
      }
    }

    overlay.querySelector("#admin-login-submit").addEventListener("click", attempt);
    overlay.querySelector("#admin-login-cancel").addEventListener("click", () => overlay.remove());
    [emailInput, passInput].forEach((i) =>
      i.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); })
    );
    emailInput.focus();
  }

  function attachHiddenTrigger() {
    document.addEventListener("click", (e) => {
      const note = e.target.closest('[data-role="footer-note"]');
      if (!note) return;
      footerClicks++;
      clearTimeout(footerTimer);
      footerTimer = setTimeout(() => (footerClicks = 0), 2500);
      if (footerClicks >= 5) {
        footerClicks = 0;
        if (!isLoggedIn()) openLoginModal();
        else toast("Already in admin mode");
      }
    });

    if (new URLSearchParams(location.search).get("admin") === "1" && !isLoggedIn()) {
      openLoginModal();
    }
  }

  // ---------- Toolbar ----------

  function renderToolbar() {
    document.getElementById("admin-toolbar")?.remove();
    const bar = el(`
      <div class="admin-toolbar" id="admin-toolbar">
        <span class="admin-badge-live">ADMIN</span>
        <button id="admin-toggle-edit">${editMode ? "✓ Editing" : "Edit Content"}</button>
        <div class="admin-toolbar-sep"></div>
        <button id="admin-open-theme">Theme &amp; Style</button>
        <button id="admin-open-publish">Publish</button>
        <div class="admin-toolbar-sep"></div>
        <button id="admin-exit">Exit Admin</button>
      </div>
    `);
    document.body.appendChild(bar);
    document.body.classList.add("has-admin-toolbar");

    bar.querySelector("#admin-toggle-edit").addEventListener("click", () => {
      editMode = !editMode;
      document.body.classList.toggle("admin-editing", editMode);
      renderToolbar();
      injectEditAffordances();
    });
    bar.querySelector("#admin-open-theme").addEventListener("click", openThemePanel);
    bar.querySelector("#admin-open-publish").addEventListener("click", openPublishPanel);
    bar.querySelector("#admin-exit").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      editMode = false;
      document.body.classList.remove("admin-editing");
      document.getElementById("admin-toolbar")?.remove();
      document.body.classList.remove("has-admin-toolbar");
      closePanel();
      toast("Exited admin mode");
    });
  }

  function bootAdminUI() {
    renderToolbar();
    injectEditAffordances();
  }

  // ---------- Panels (generic) ----------

  function closePanel() {
    document.getElementById("admin-panel")?.remove();
  }

  function openPanel(title, bodyHtml) {
    closePanel();
    const panel = el(`
      <div class="admin-panel" id="admin-panel">
        <div class="admin-panel-header">
          <h3>${title}</h3>
          <button class="admin-panel-close" id="admin-panel-close">&times;</button>
        </div>
        <div id="admin-panel-body">${bodyHtml}</div>
      </div>
    `);
    document.body.appendChild(panel);
    panel.querySelector("#admin-panel-close").addEventListener("click", closePanel);
    return panel;
  }

  // ---------- Theme panel ----------

  function openThemePanel() {
    const t = DATA.theme;
    const panel = openPanel("Theme &amp; Style", `
      <div class="admin-section">
        <h4>Colors</h4>
        ${colorRow("Background (deepest)", "bg0", t.colors.bg0)}
        ${colorRow("Background (cards)", "bg2", t.colors.bg2)}
        ${colorRow("Gold accent", "gold", t.colors.gold)}
        ${colorRow("Gold (bright/hover)", "goldBright", t.colors.goldBright)}
        ${colorRow("Text (white)", "white", t.colors.white)}
        ${colorRow("Text (gray/secondary)", "gray", t.colors.gray)}
      </div>
      <div class="admin-section">
        <h4>Typography</h4>
        <div class="admin-field">
          <label>Heading font</label>
          <select id="theme-font-display">
            <option value="'Cormorant Garamond', 'Playfair Display', serif">Cormorant Garamond</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Poppins', sans-serif">Poppins (sans)</option>
          </select>
        </div>
        <div class="admin-field">
          <label>Body font</label>
          <select id="theme-font-body">
            <option value="'Poppins', 'Inter', sans-serif">Poppins</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Helvetica Neue', Arial, sans-serif">Helvetica</option>
          </select>
        </div>
        ${sliderRow("Home title size", "homeTitleSize", parsePx(t.fonts.homeTitleSize), 28, 80)}
        ${sliderRow("Page title size", "screenTitleSize", parsePx(t.fonts.screenTitleSize), 20, 48)}
        ${sliderRow("Body text size", "bodySize", parsePx(t.fonts.bodySize), 12, 20)}
      </div>
      <div class="admin-section">
        <h4>Logo</h4>
        <img class="admin-thumb" id="theme-logo-preview" src="${t.logo.src}" />
        <button class="admin-btn admin-btn-ghost admin-btn-small admin-upload-btn" id="theme-logo-upload">Upload new logo</button>
        <input type="file" id="theme-logo-file" accept="image/*" hidden />
        ${sliderRow("Logo size", "logoSize", t.logo.size, 48, 180)}
      </div>
      <div class="admin-section">
        <h4>Background</h4>
        <div class="admin-field">
          <label>Type</label>
          <select id="theme-bg-type">
            <option value="default">Default (none)</option>
            <option value="color">Solid color</option>
            <option value="image">Image</option>
            <option value="video">Video (paste a URL)</option>
          </select>
        </div>
        <div id="theme-bg-controls"></div>
        <p class="admin-hint">Tip: keep uploaded images under ~300KB so publishing to GitHub stays reliable. For video, paste a hosted URL (e.g. an .mp4 link) rather than uploading a raw file.</p>
      </div>
    `);

    // Prefill selects
    panel.querySelector("#theme-font-display").value = t.fonts.displayFont;
    panel.querySelector("#theme-font-body").value = t.fonts.bodyFont;
    panel.querySelector("#theme-bg-type").value = t.background.type;

    // Color pickers
    panel.querySelectorAll("[data-color-key]").forEach((input) => {
      input.addEventListener("input", () => {
        t.colors[input.dataset.colorKey] = input.value;
        markDirty();
        RavidaApp.applyTheme();
      });
    });

    // Fonts
    panel.querySelector("#theme-font-display").addEventListener("change", (e) => {
      t.fonts.displayFont = e.target.value;
      markDirty();
      RavidaApp.applyTheme();
    });
    panel.querySelector("#theme-font-body").addEventListener("change", (e) => {
      t.fonts.bodyFont = e.target.value;
      markDirty();
      RavidaApp.applyTheme();
    });

    // Sliders
    bindSlider(panel, "homeTitleSize", (v) => { t.fonts.homeTitleSize = v + "px"; RavidaApp.applyTheme(); });
    bindSlider(panel, "screenTitleSize", (v) => { t.fonts.screenTitleSize = v + "px"; RavidaApp.applyTheme(); });
    bindSlider(panel, "bodySize", (v) => { t.fonts.bodySize = v + "px"; RavidaApp.applyTheme(); });
    bindSlider(panel, "logoSize", (v) => { t.logo.size = v; RavidaApp.applyTheme(); });

    // Logo upload
    const logoFile = panel.querySelector("#theme-logo-file");
    panel.querySelector("#theme-logo-upload").addEventListener("click", () => logoFile.click());
    logoFile.addEventListener("change", () => {
      const file = logoFile.files[0];
      if (!file) return;
      readAsDataURL(file, (dataUrl) => {
        t.logo.src = dataUrl;
        panel.querySelector("#theme-logo-preview").src = dataUrl;
        markDirty();
        RavidaApp.render();
      });
    });

    // Background controls
    function renderBgControls() {
      const wrap = panel.querySelector("#theme-bg-controls");
      const type = t.background.type;
      if (type === "color") {
        wrap.innerHTML = `<div class="admin-field"><label>Color</label><input type="color" id="bg-color-input" value="${/^#/.test(t.background.value) ? t.background.value : "#0a0a0a"}" /></div>`;
        wrap.querySelector("#bg-color-input").addEventListener("input", (e) => {
          t.background.value = e.target.value;
          markDirty();
          RavidaApp.applyTheme();
        });
      } else if (type === "image") {
        wrap.innerHTML = `
          <button class="admin-btn admin-btn-ghost admin-btn-small" id="bg-image-upload">Upload image</button>
          <input type="file" id="bg-image-file" accept="image/*" hidden />
          ${t.background.value ? `<img class="admin-thumb" src="${t.background.value}" />` : ""}
        `;
        wrap.querySelector("#bg-image-upload").addEventListener("click", () => wrap.querySelector("#bg-image-file").click());
        wrap.querySelector("#bg-image-file").addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (!file) return;
          readAsDataURL(file, (dataUrl) => {
            t.background.value = dataUrl;
            markDirty();
            RavidaApp.applyTheme();
            renderBgControls();
          });
        });
      } else if (type === "video") {
        wrap.innerHTML = `<div class="admin-field"><label>Video URL</label><input type="text" id="bg-video-url" placeholder="https://.../background.mp4" value="${t.background.value || ""}" /></div>`;
        wrap.querySelector("#bg-video-url").addEventListener("change", (e) => {
          t.background.value = e.target.value.trim();
          markDirty();
          RavidaApp.applyTheme();
        });
      } else {
        wrap.innerHTML = "";
      }
    }
    renderBgControls();

    panel.querySelector("#theme-bg-type").addEventListener("change", (e) => {
      t.background.type = e.target.value;
      markDirty();
      RavidaApp.applyTheme();
      renderBgControls();
    });
  }

  function colorRow(label, key, value) {
    return `
      <div class="admin-color-row">
        <label>${label}</label>
        <input type="color" data-color-key="${key}" value="${toHex(value)}" />
      </div>
    `;
  }

  function sliderRow(label, key, value, min, max) {
    return `
      <div class="admin-slider-row">
        <label><span>${label}</span><span id="val-${key}">${value}</span></label>
        <input type="range" id="slider-${key}" min="${min}" max="${max}" value="${value}" />
      </div>
    `;
  }

  function bindSlider(panel, key, onChange) {
    const slider = panel.querySelector(`#slider-${key}`);
    const valLabel = panel.querySelector(`#val-${key}`);
    if (!slider) return;
    slider.addEventListener("input", () => {
      valLabel.textContent = slider.value;
      markDirty();
      onChange(Number(slider.value));
    });
  }

  function toHex(v) {
    if (!v) return "#000000";
    if (v.startsWith("#") && (v.length === 7 || v.length === 4)) return v;
    // rgba(...) fallback — color inputs need hex, so just default
    return "#c9a85c";
  }

  function parsePx(v) {
    return parseInt(v, 10) || 16;
  }

  function readAsDataURL(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  // ---------- Icon picker ----------

  function openIconPicker(categoryId) {
    const swatches = ICON_CHOICES.map(
      (key) => `<button class="icon-swatch" data-icon-key="${key}">${RavidaApp.ICONS[key]}</button>`
    ).join("");

    const panel = openPanel("Choose an icon", `
      <div class="admin-section">
        <div class="icon-grid">${swatches}</div>
        <p class="admin-hint" style="margin-top:14px;">Or paste custom SVG markup:</p>
        <textarea id="icon-custom-svg" rows="4" placeholder="<svg viewBox='0 0 24 24'>...</svg>"></textarea>
        <div class="admin-row-buttons">
          <button class="admin-btn admin-btn-small" id="icon-apply-custom">Use custom SVG</button>
        </div>
      </div>
    `);

    panel.querySelectorAll(".icon-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        DATA.theme.icons[categoryId] = btn.dataset.iconKey;
        markDirty();
        RavidaApp.render();
        closePanel();
      });
    });

    panel.querySelector("#icon-apply-custom").addEventListener("click", () => {
      const svg = panel.querySelector("#icon-custom-svg").value.trim();
      if (svg.indexOf("<svg") !== 0) {
        toast("Custom icon must start with <svg", true);
        return;
      }
      DATA.theme.icons[categoryId] = svg;
      markDirty();
      RavidaApp.render();
      closePanel();
    });
  }

  // ---------- Content editing ----------

  function markDirty() {
    dirty = true;
  }

  function makeEditable(elm, onCommit) {
    elm.setAttribute("contenteditable", "true");
    elm.addEventListener("mousedown", (e) => e.stopPropagation());
    elm.addEventListener("click", (e) => e.stopPropagation());
    elm.addEventListener("blur", () => {
      onCommit(elm.textContent.trim());
      markDirty();
    });
    elm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        elm.blur();
      }
    });
  }

  function injectEditAffordances() {
    if (!isLoggedIn()) return;
    document.body.classList.toggle("admin-editing", editMode);
    if (!editMode) return;

    const stackTop = RavidaApp.getStack().slice(-1)[0];

    if (stackTop.view === "home") {
      injectHomeEdits();
    } else if (stackTop.view === "category") {
      injectCategoryEdits(stackTop.categoryId);
    } else if (stackTop.view === "subcategory") {
      injectSubcategoryEdits(stackTop.categoryId, stackTop.subcategoryId);
    }
  }

  function injectHomeEdits() {
    const clinicNameEl = document.querySelector('[data-field="clinicName"]');
    const taglineEl = document.querySelector('[data-field="tagline"]');
    if (clinicNameEl) makeEditable(clinicNameEl, (v) => { DATA.clinicName = v; });
    if (taglineEl) makeEditable(taglineEl, (v) => { DATA.tagline = v; });

    document.querySelectorAll(".category-card").forEach((card) => {
      const catId = card.dataset.catId;
      const labelEl = card.querySelector('[data-field="name"]');
      const iconEl = card.querySelector('[data-role="cat-icon"]');
      if (labelEl) makeEditable(labelEl, (v) => {
        RavidaApp.findCategory(catId).name = v;
      });
      if (iconEl) {
        iconEl.style.cursor = "pointer";
        iconEl.title = "Click to change icon";
        iconEl.addEventListener("click", (e) => {
          e.stopPropagation();
          openIconPicker(catId);
        });
      }
    });

    const logoImg = document.querySelector('[data-field="logo"]');
    if (logoImg) {
      logoImg.style.cursor = "pointer";
      logoImg.title = "Click to replace logo";
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.hidden = true;
      document.body.appendChild(fileInput);
      logoImg.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.click();
      });
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;
        readAsDataURL(file, (dataUrl) => {
          DATA.theme.logo.src = dataUrl;
          markDirty();
          RavidaApp.render();
        });
      });
    }
  }

  function injectCategoryEdits(categoryId) {
    const cat = RavidaApp.findCategory(categoryId);
    const list = document.querySelector('[data-role="subcat-list"]');
    if (!list) return;

    list.querySelectorAll(".list-row").forEach((row) => {
      row.style.position = "relative";
      const subId = row.dataset.subId;
      const sub = cat.subcategories.find((s) => s.id === subId);
      const nameEl = row.querySelector('[data-field="name"]');
      const badgeEl = row.querySelector('[data-field="badge"]');

      if (nameEl) makeEditable(nameEl, (v) => { sub.name = v; });

      if (badgeEl) {
        badgeEl.hidden = false;
        badgeEl.style.cursor = "pointer";
        badgeEl.title = "Click to cycle badge";
        const cycle = ["", "POPULAR", "TRENDING", "ADVANCED"];
        badgeEl.addEventListener("click", (e) => {
          e.stopPropagation();
          const idx = cycle.indexOf(sub.badge || "");
          sub.badge = cycle[(idx + 1) % cycle.length] || undefined;
          markDirty();
          RavidaApp.render();
        });
      }

      const delBtn = el(`<button class="admin-item-delete" title="Remove subcategory">&times;</button>`);
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!confirm(`Remove "${sub.name}" and all its services?`)) return;
        cat.subcategories = cat.subcategories.filter((s) => s.id !== subId);
        markDirty();
        RavidaApp.render();
      });
      row.appendChild(delBtn);
    });

    const addRow = el(`<button class="list-row admin-mini-btn" style="justify-content:center;">+ Add subcategory</button>`);
    addRow.addEventListener("click", (e) => {
      e.stopPropagation();
      const name = prompt("Subcategory name:");
      if (!name) return;
      cat.subcategories.push({
        id: "sub-" + Date.now(),
        name: name.trim(),
        items: []
      });
      markDirty();
      RavidaApp.render();
    });
    list.appendChild(addRow);
  }

  function injectSubcategoryEdits(categoryId, subcategoryId) {
    const sub = RavidaApp.findSubcategory(categoryId, subcategoryId);
    const col = document.querySelector('[data-role="accordion-list"]');
    if (!col) return;

    col.querySelectorAll(".accordion-item").forEach((itemEl) => {
      const idx = Number(itemEl.dataset.itemIndex);
      const item = sub.items[idx];

      const titleEl = itemEl.querySelector('[data-field="title"]');
      const subtitleEl = itemEl.querySelector('[data-field="subtitle"]');
      if (titleEl) makeEditable(titleEl, (v) => { item.title = v; });
      if (subtitleEl) makeEditable(subtitleEl, (v) => { item.subtitle = v; });

      const bulletList = itemEl.querySelector('[data-role="bullet-list"]');
      if (bulletList) {
        bulletList.querySelectorAll("li").forEach((li) => {
          const bIdx = Number(li.dataset.bulletIndex);
          const span = li.querySelector('[data-field="bullet"]');
          if (span) makeEditable(span, (v) => { item.bullets[bIdx] = v; });

          const delBullet = el(`<button class="admin-mini-btn admin-mini-btn-danger" style="padding:2px 8px;margin-left:8px;">remove</button>`);
          delBullet.addEventListener("click", (e) => {
            e.stopPropagation();
            item.bullets.splice(bIdx, 1);
            markDirty();
            RavidaApp.render();
          });
          li.appendChild(delBullet);
        });

        const controls = el(`<div class="admin-inline-controls"></div>`);
        const addBulletBtn = el(`<button class="admin-mini-btn">+ Add bullet</button>`);
        addBulletBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const text = prompt("New bullet text:");
          if (!text) return;
          item.bullets.push(text.trim());
          markDirty();
          RavidaApp.render();
        });
        controls.appendChild(addBulletBtn);

        const imgBtn = el(`<button class="admin-mini-btn">${item.image ? "Replace photo" : "+ Add photo"}</button>`);
        const imgInput = document.createElement("input");
        imgInput.type = "file";
        imgInput.accept = "image/*";
        imgInput.hidden = true;
        imgBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          imgInput.click();
        });
        imgInput.addEventListener("change", () => {
          const file = imgInput.files[0];
          if (!file) return;
          readAsDataURL(file, (dataUrl) => {
            item.image = dataUrl;
            markDirty();
            RavidaApp.render();
          });
        });
        controls.appendChild(imgBtn);
        controls.appendChild(imgInput);

        if (item.image) {
          const rmImgBtn = el(`<button class="admin-mini-btn admin-mini-btn-danger">Remove photo</button>`);
          rmImgBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            delete item.image;
            markDirty();
            RavidaApp.render();
          });
          controls.appendChild(rmImgBtn);
        }

        itemEl.querySelector(".accordion-panel-inner").appendChild(controls);
      }

      itemEl.style.position = "relative";
      const delItemBtn = el(`<button class="admin-item-delete" title="Remove this service" style="top:10px;right:44px;">&times;</button>`);
      delItemBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!confirm(`Remove "${item.title}"?`)) return;
        sub.items.splice(idx, 1);
        markDirty();
        RavidaApp.render();
      });
      itemEl.querySelector(".accordion-trigger").appendChild(delItemBtn);
    });

    const addItemBtn = el(`<button class="accordion-item admin-mini-btn" style="padding:22px 24px;text-align:center;">+ Add service</button>`);
    addItemBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = prompt("Service title:");
      if (!title) return;
      const subtitle = prompt("Short subtitle:") || "";
      sub.items.push({ title: title.trim(), subtitle: subtitle.trim(), bullets: [] });
      markDirty();
      RavidaApp.render();
    });
    col.appendChild(addItemBtn);
  }

  // ---------- Publish ----------

  function serializeData() {
    // Deep-clone and drop the shared-reference trick so JSON.stringify is safe.
    const clone = JSON.parse(JSON.stringify(DATA));
    const json = JSON.stringify(clone, null, 2);
    return `// RaVida Medical & Holistic Clinic — service catalog data\n// Edited via Admin Mode. Structure: categories -> subcategories -> service groups -> sub-items\n\nconst DATA = ${json};\n`;
  }

  function openPublishPanel() {
    const owner = localStorage.getItem(LS_OWNER) || "";
    const repo = localStorage.getItem(LS_REPO) || "";
    const branch = localStorage.getItem(LS_BRANCH) || "main";
    const token = localStorage.getItem(LS_TOKEN) || "";

    const panel = openPanel("Publish changes", `
      <div class="admin-section">
        <h4>Option A — Publish to GitHub</h4>
        <p class="admin-hint">Requires a GitHub Personal Access Token with "repo" access. Generate one at github.com → Settings → Developer settings → Personal access tokens. It's stored only in this browser.</p>
        <div class="admin-field"><label>Repo owner</label><input id="gh-owner" value="${owner}" placeholder="Ravidabooking" /></div>
        <div class="admin-field"><label>Repo name</label><input id="gh-repo" value="${repo}" placeholder="Services" /></div>
        <div class="admin-field"><label>Branch</label><input id="gh-branch" value="${branch}" placeholder="main" /></div>
        <div class="admin-field"><label>Personal Access Token</label><input id="gh-token" type="password" value="${token}" placeholder="ghp_..." /></div>
        <button class="admin-btn" id="gh-publish-btn">Publish data.js to GitHub</button>
        <p class="admin-hint" id="gh-status"></p>
      </div>
      <div class="admin-section">
        <h4>Option B — Download instead</h4>
        <p class="admin-hint">Downloads an updated data.js you can upload to your repo manually (drag & drop on github.com, replacing the existing file).</p>
        <button class="admin-btn admin-btn-ghost" id="download-data">Download data.js</button>
      </div>
    `);

    panel.querySelector("#download-data").addEventListener("click", () => {
      const blob = new Blob([serializeData()], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.js";
      a.click();
      URL.revokeObjectURL(url);
      dirty = false;
      toast("data.js downloaded");
    });

    panel.querySelector("#gh-publish-btn").addEventListener("click", async () => {
      const o = panel.querySelector("#gh-owner").value.trim();
      const r = panel.querySelector("#gh-repo").value.trim();
      const b = panel.querySelector("#gh-branch").value.trim() || "main";
      const tk = panel.querySelector("#gh-token").value.trim();
      const statusEl = panel.querySelector("#gh-status");

      if (!o || !r || !tk) {
        statusEl.textContent = "Fill in owner, repo, and token first.";
        return;
      }

      localStorage.setItem(LS_OWNER, o);
      localStorage.setItem(LS_REPO, r);
      localStorage.setItem(LS_BRANCH, b);
      localStorage.setItem(LS_TOKEN, tk);

      statusEl.textContent = "Publishing…";
      try {
        await publishToGitHub(o, r, b, tk, "data.js", serializeData(), "Update site content via Admin Mode");
        statusEl.textContent = "Published! GitHub Pages will rebuild in about a minute.";
        dirty = false;
        toast("Published to GitHub");
      } catch (err) {
        console.error(err);
        statusEl.textContent = "Failed: " + (err.message || "check token permissions and repo name.");
        toast("Publish failed — see panel for details", true);
      }
    });
  }

  async function publishToGitHub(owner, repo, branch, token, path, content, message) {
    const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    };

    let sha;
    const getRes = await fetch(`${apiBase}?ref=${branch}`, { headers });
    if (getRes.status === 200) {
      const json = await getRes.json();
      sha = json.sha;
    } else if (getRes.status !== 404) {
      const errJson = await getRes.json().catch(() => ({}));
      throw new Error(errJson.message || `GitHub returned ${getRes.status} while reading the file.`);
    }

    const body = {
      message,
      content: b64EncodeUnicode(content),
      branch
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!putRes.ok) {
      const errJson = await putRes.json().catch(() => ({}));
      throw new Error(errJson.message || `GitHub returned ${putRes.status} while writing the file.`);
    }
  }

  function b64EncodeUnicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  // Warn before leaving with unsaved changes
  window.addEventListener("beforeunload", (e) => {
    if (isLoggedIn() && dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // ---------- Boot ----------

  document.addEventListener("DOMContentLoaded", () => {
    attachHiddenTrigger();
    if (isLoggedIn()) bootAdminUI();
  });

  document.addEventListener("ravida:render", () => {
    if (isLoggedIn()) injectEditAffordances();
  });
})();
