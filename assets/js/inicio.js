/* Nube Nácar · inicio: opiniones */
(() => {
  const NN = window.NN, $ = NN.$;
  const box = $('#quote'), count = $('#quote-count');
  let i = 0;
  const show = (k) => {
    i = (k + NN.QUOTES.length) % NN.QUOTES.length;
    const [text, who, svc] = NN.QUOTES[i];
    box.innerHTML = `<blockquote>“${text}”</blockquote><figcaption>${who}<span>${svc}</span></figcaption>`;
    box.classList.remove('enter'); void box.offsetWidth; box.classList.add('enter');
    count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(NN.QUOTES.length).padStart(2, '0')}`;
  };
  $('#quote-prev').addEventListener('click', () => show(i - 1));
  $('#quote-next').addEventListener('click', () => show(i + 1));
  show(0);
})();
