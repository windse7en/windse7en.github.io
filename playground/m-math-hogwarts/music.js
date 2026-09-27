/* User-provided soundtrack, bundled unchanged with the game. */
(() => {
  const MUSIC_SOURCE = 'assets/hedwigs-theme.mp3';
  const audio = document.createElement('audio');
  audio.id = 'background-music';
  audio.loop = true;
  audio.preload = 'auto';
  audio.autoplay = true;
  audio.hidden = true;
  document.body.append(audio);

  let enabled = true;
  let status = MUSIC_SOURCE ? 'loading' : 'unavailable';
  let pending = false;
  let volume = 12;
  let requestVersion = 0;
  try {
    const saved = localStorage.getItem('m-math-hogwarts-music-volume');
    if (saved !== null && Number.isFinite(Number(saved))) volume = Math.max(0, Math.min(30, Number(saved)));
  } catch {}
  const words = (en, zh) => document.documentElement.lang.startsWith('zh') ? zh : en;

  function sync() {
    const answering = document.getElementById('game-screen')?.dataset.phase === 'question';
    audio.volume = (answering ? Math.min(volume, 8) : volume) / 100;
    const button = document.getElementById('music-toggle');
    if (!button) return;
    button.setAttribute('aria-pressed', String(enabled));
    button.dataset.status = status;
    button.textContent = !enabled ? words('♫ Off', '♫ 关') : status === 'playing' ? words('♫ On', '♫ 开') : status === 'unavailable' ? words('♫ Unavailable', '♫ 未就绪') : words('♫ Ready', '♫ 就绪');
    button.title = status === 'unavailable'
      ? words('The bundled music file is not available yet.', '内置音乐文件尚未就绪。')
      : !enabled ? words('Turn background music on', '开启背景音乐')
      : status === 'waiting' ? words('Music will start with your next game interaction. Click here to turn it off.', '音乐将在下一次游戏操作时自动开始；点此可关闭。')
      : words('Turn background music off', '关闭背景音乐');
  }

  async function play() {
    if (!enabled || !MUSIC_SOURCE || document.hidden || pending || !audio.paused) return;
    const version = ++requestVersion;
    pending = true;
    sync();
    try {
      await audio.play();
      if (version !== requestVersion) return;
      if (!enabled || document.hidden) audio.pause();
      else status = 'playing';
    } catch (error) {
      if (version !== requestVersion) return;
      status = error.name === 'NotAllowedError' ? 'waiting'
        : error.name === 'AbortError' ? 'paused' : 'unavailable';
    } finally {
      if (version === requestVersion) { pending = false; sync(); }
    }
  }

  function pause() {
    requestVersion++;
    pending = false;
    audio.pause();
    status = 'paused';
    sync();
  }

  document.addEventListener('click', event => {
    if (event.target.closest('#music-toggle')) {
      enabled = !enabled;
      if (enabled) { audio.autoplay = true; play(); }
      else { audio.autoplay = false; pause(); }
      sync();
      document.getElementById('answer')?.focus({ preventScroll: true });
      return;
    }
    if (status !== 'unavailable') play();
  });
  document.addEventListener('keydown', event => {
    // Keep the game's Enter handling intact; never preventDefault or steal focus.
    if (!event.repeat && !event.target.closest('#music-toggle') && status !== 'unavailable') play();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (enabled) play();
  });
  audio.addEventListener('playing', () => {
    if (!enabled || document.hidden) { pause(); return; }
    status = 'playing'; sync();
  });
  audio.addEventListener('error', () => { status = 'unavailable'; sync(); });
  window.syncGameMusic = sync;
  new MutationObserver(sync).observe(document.getElementById('game-screen'), {
    attributes: true, attributeFilter: ['data-phase']
  });
  sync();
  if (MUSIC_SOURCE) { audio.src = MUSIC_SOURCE; play(); }
})();
