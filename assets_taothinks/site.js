(function () {
  const key = "taothinks-lang";
  const supported = new Set(["zh", "en"]);
  const integrations = window.taothinksIntegrations || {};
  const countedViews = new Set();
  const pendingAnalyticsViews = [];
  let currentLang = "zh";

  function setLanguage(lang, options) {
    const shouldTrack = options && options.track;
    const next = supported.has(lang) ? lang : "zh";
    currentLang = next;
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
    updateGiscusLanguage(next);
    if (shouldTrack) trackPageview(next);
  }

  let stored = "zh";
  try {
    stored = window.localStorage.getItem(key) || "zh";
  } catch (_error) {
    stored = "zh";
  }

  setLanguage(stored);
  initAnalytics();
  initGiscus();

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-lang-switch]");
    if (!target) return;
    setLanguage(target.dataset.langSwitch, { track: true });
  });

  function canonicalPath() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      try {
        const url = new URL(canonical.href);
        return url.pathname || "/";
      } catch (_error) {
        // Fall back to the visible URL below.
      }
    }
    return window.location.pathname || "/";
  }

  function analyticsPath(lang) {
    const analytics = integrations.analytics || {};
    const path = canonicalPath();
    return analytics.path_language_suffix === false ? path : `${path}::${lang}`;
  }

  function trackPageview(lang) {
    const analytics = integrations.analytics || {};
    if (!analytics.enabled || analytics.provider !== "goatcounter" || !analytics.endpoint) return;

    const path = analyticsPath(lang);
    if (countedViews.has(path)) return;
    countedViews.add(path);

    const payload = { path, title: document.title };
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count(payload);
      return;
    }
    pendingAnalyticsViews.push(payload);
  }

  function flushAnalyticsQueue() {
    if (!window.goatcounter || typeof window.goatcounter.count !== "function") return;
    while (pendingAnalyticsViews.length) {
      window.goatcounter.count(pendingAnalyticsViews.shift());
    }
  }

  function initAnalytics() {
    const analytics = integrations.analytics || {};
    if (!analytics.enabled || analytics.provider !== "goatcounter" || !analytics.endpoint) return;

    window.goatcounter = {
      endpoint: analytics.endpoint,
      no_onload: true,
      no_events: true,
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = analytics.endpoint;
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true, no_events: true });
    script.addEventListener("load", flushAnalyticsQueue);
    document.head.appendChild(script);

    trackPageview(currentLang);
  }

  function giscusLanguage(lang) {
    const giscus = integrations.giscus || {};
    const languages = giscus.languages || {};
    return languages[lang] || (lang === "zh" ? "zh-CN" : "en");
  }

  function initGiscus() {
    const container = document.querySelector("[data-giscus-thread]");
    if (!container) return;

    const giscus = integrations.giscus || {};
    const hasConfig = Boolean(
      giscus.enabled &&
        giscus.repo &&
        giscus.repoId &&
        giscus.category &&
        giscus.categoryId
    );

    if (!hasConfig) {
      container.innerHTML = [
        '<div class="integration-note">',
        '<span class="lang-zh">评论区代码已接入，正在等待 GitHub Discussions 和 Giscus 配置完成。</span>',
        '<span class="lang-en">The comments module is wired in and waiting for GitHub Discussions and Giscus configuration.</span>',
        "</div>",
      ].join("");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscus.repo);
    script.setAttribute("data-repo-id", giscus.repoId);
    script.setAttribute("data-category", giscus.category);
    script.setAttribute("data-category-id", giscus.categoryId);
    script.setAttribute("data-mapping", giscus.mapping || "pathname");
    script.setAttribute("data-strict", giscus.strict || "0");
    script.setAttribute("data-reactions-enabled", giscus.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", giscus.emitMetadata || "0");
    script.setAttribute("data-input-position", giscus.inputPosition || "top");
    script.setAttribute("data-theme", giscus.theme || "light");
    script.setAttribute("data-lang", giscusLanguage(currentLang));
    container.appendChild(script);
  }

  function updateGiscusLanguage(lang) {
    const frame = document.querySelector("iframe.giscus-frame");
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { lang: giscusLanguage(lang) } } },
      "https://giscus.app"
    );
  }
})();
