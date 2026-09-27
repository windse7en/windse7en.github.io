(() => {
  const filters = document.querySelector('.filters');
  const cards = [...document.querySelectorAll('.game-card')];
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const category = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    const count = cards.filter(card => !card.hidden).length;
    document.getElementById('game-count').textContent = `${count} ${count === 1 ? 'activity' : 'activities'} to explore`;
  });
})();
