(() => {
  const signalKey = 'm-math-hogwarts-reset-signal';
  const prefix = 'm-math-hogwarts-';
  function freeze() {
    resettingLocalData = true;
    clearInterval(timerHandle);
    phase = 'resetting';
    document.body.inert = true;
    document.getElementById('background-music')?.pause();
  }
  // Stop sibling tabs from writing their old in-memory progress back after reset.
  window.addEventListener('storage', event => {
    if (event.key !== signalKey) return;
    if (event.newValue) freeze();
    else location.reload();
  });
  document.addEventListener('click', async event => {
    if (!event.target.closest('#reset-local-data') || resettingLocalData) return;
    if (!confirm(t(pair(
      'Clear this game’s player, house, puzzle progress, all learning records and unfinished round? This cannot be undone. Other playground games are not affected.',
      '清空本游戏的角色、学院、拼图进度、全部学习记录和未完成题组，并从头开始？此操作无法撤销，不影响其他小游戏。'
    )))) return;
    try {
      localStorage.setItem(signalKey, crypto.randomUUID());
      freeze();
      const clear = async () => {
        const db = recordsDb || await openRecords();
        await new Promise((resolve, reject) => {
          const tx = db.transaction(Array.from(db.objectStoreNames), 'readwrite');
          for (const name of db.objectStoreNames) tx.objectStore(name).clear();
          tx.oncomplete = resolve;
          tx.onerror = tx.onabort = () => reject(tx.error || Error('Reset failed'));
        });
        for (const key of Object.keys(localStorage)) {
          if (key.startsWith(prefix) && key !== signalKey) localStorage.removeItem(key);
        }
      };
      if (navigator.locks) await navigator.locks.request(WEEKLY_KEY, clear);
      else await clear();
      localStorage.removeItem(signalKey);
      location.reload();
    } catch (error) {
      try { localStorage.removeItem(signalKey); } catch {}
      document.body.inert = false;
      alert(t(pair('Could not finish clearing local data. Reload and try again.', '本地数据未能全部清空，请刷新后重试。')));
      location.reload();
    }
  });
})();
