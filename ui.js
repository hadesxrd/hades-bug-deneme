'use strict';
// Presentation only: all requests are same-origin GET fixtures through app.js.
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('scenario-search');
  const cards = [...document.querySelectorAll('.scenario[data-search]')];
  const empty = document.getElementById('empty-scenarios');
  if (search && empty) {
    search.addEventListener('input', () => {
      const q = search.value.toLocaleLowerCase('tr-TR').trim();
      let count = 0;
      cards.forEach(card => {
        const visible = (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase('tr-TR').includes(q);
        card.hidden = !visible;
        if (visible) count++;
      });
      empty.hidden = count !== 0;
    });
  }
  document.querySelectorAll('[data-test][data-path]').forEach(button => {
    button.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      button.closest('.scenario')?.classList.add('selected');
    });
  });
  const copy = document.getElementById('copy-response');
  copy?.addEventListener('click', async () => {
    const text = document.getElementById('response-body')?.textContent || '';
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
        temp.remove();
      }
      copy.textContent = 'Kopyalandı ✓';
      setTimeout(() => { copy.innerHTML = 'Yanıtı kopyala <span>⧉</span>'; }, 1700);
    } catch (_) { copy.textContent = 'Kopyalama başarısız'; }
  });
  // Light-weight request timing display, independent of the scanner fixture script.
  const execute = document.getElementById('execute-btn');
  const timing = document.getElementById('response-timing');
  const observeRequest = () => {
    if (!timing) return;
    const start = performance.now();
    timing.textContent = 'REQUESTING...';
    const target = document.getElementById('response-status');
    if (!target) return;
    const observer = new MutationObserver(() => {
      if (target.textContent !== 'LOADING') {
        timing.textContent = `${Math.max(1,Math.round(performance.now() - start))} ms`;
        observer.disconnect();
      }
    });
    observer.observe(target, {childList:true,characterData:true,subtree:true});
    setTimeout(()=>observer.disconnect(),10000);
  };
  execute?.addEventListener('click',observeRequest);
  document.querySelectorAll('[data-test][data-path]').forEach(btn => btn.addEventListener('click',observeRequest));
});
