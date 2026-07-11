(function () {
  const key = "taothinks-lang";
  const supported = new Set(["zh", "en"]);

  function setLanguage(lang) {
    const next = supported.has(lang) ? lang : "zh";
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    try {
      window.localStorage.setItem(key, next);
    } catch (_error) {
      // Ignore private-browsing storage errors.
    }
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langSwitch === next));
    });
  }

  let stored = "zh";
  try {
    stored = window.localStorage.getItem(key) || "zh";
  } catch (_error) {
    stored = "zh";
  }

  setLanguage(stored);

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-lang-switch]");
    if (!target) return;
    setLanguage(target.dataset.langSwitch);
  });
})();
