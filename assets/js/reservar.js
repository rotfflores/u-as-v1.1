/* Nube Nácar · reservar: formulario en tres pasos (demostración), horario */
(() => {
  const NN = window.NN, $ = NN.$, $$ = NN.$$, S = NN.SERVICE;
  const form = $('#booking'), dateIn = $('#f-date'), artist = $('#f-artist');
  const steps = $$('.fstep', form), marks = $$('#stepper li');
  let cur = 0;

  /* ---- Opciones ---- */
  $('#svc-choices').innerHTML = NN.GROUPS.filter((g) => !g.extra).map((g) => g.items.map(([id, name, , min, price]) =>
    `<label class="choice"><input type="radio" name="servicio" value="${id}" required><span><b>${name}</b><i>${g.g} · ${min} min · ${NN.money(price)}</i></span></label>`).join('')).join('');
  $('#extra-choices').innerHTML = ['x-frances', 'x-cromo', 'x-arte'].map((id) =>
    `<label class="choice"><input type="checkbox" name="extra" value="${id}"><span><b>${S[id].name}</b><i>+${NN.money(S[id].price)}${S[id].from ? ' por uña' : ''}</i></span></label>`).join('');
  artist.insertAdjacentHTML('beforeend', NN.TEAM.map((m) => `<option value="${m.id}">${m.name}</option>`).join(''));
  dateIn.min = NN.iso(new Date());
  dateIn.value = NN.next ? NN.next.date : NN.iso(new Date());

  /* ---- Datos que llegan desde otras páginas ---- */
  const q = new URLSearchParams(location.search);
  const pre = form.querySelector(`input[name="servicio"][value="${CSS.escape(q.get('servicio') || '')}"]`);
  if (pre) pre.checked = true;
  if (q.get('artista')) artist.value = q.get('artista');
  if (q.get('nota')) $('#f-notes').value = q.get('nota').slice(0, 300);
  const tone = NN.TONE[q.get('tono')];
  if (tone) {
    $('#tone-pick').hidden = false;
    $('#tone-pick i').style.setProperty('--c', tone.hex);
    $('#tone-pick b').textContent = `${tone.name} · ${tone.finish.toLowerCase()}`;
    if (!$('#f-notes').value) $('#f-notes').value = `Tono: ${tone.name}.`;
  }

  /* ---- Horarios y resumen ---- */
  function renderSlots() {
    const keep = form.querySelector('input[name="slot"]:checked')?.value;
    $('#slots').innerHTML = (dateIn.value ? NN.slotsFor(dateIn.value) : []).map((s) =>
      `<label class="choice"><input type="radio" name="slot" value="${s.time}" ${s.free ? '' : 'disabled'} ${s.free && s.time === keep ? 'checked' : ''}><span>${s.time}</span></label>`).join('');
  }
  const fmtDate = (s) => NN.parseISO(s).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
  function renderSummary() {
    const svc = S[form.querySelector('input[name="servicio"]:checked')?.value];
    const extras = $$('input[name="extra"]:checked', form).map((i) => S[i.value]);
    const min = (svc ? svc.min : 0) + extras.reduce((a, e) => a + e.min, 0);
    const price = (svc ? svc.price : 0) + extras.reduce((a, e) => a + e.price, 0);
    $('#s-service').textContent = svc ? [svc.name, ...extras.map((e) => e.name.split(' ')[0].toLowerCase())].join(' + ') : 'Por elegir';
    $('#s-time').textContent = svc ? `${min} min aprox.` : '—';
    $('#s-artist').textContent = artist.value ? artist.options[artist.selectedIndex].text : 'Sin preferencia';
    $('#s-date').textContent = dateIn.value ? fmtDate(dateIn.value) : '—';
    $('#s-slot').textContent = form.querySelector('input[name="slot"]:checked')?.value || 'Por elegir';
    $('#s-total').textContent = NN.money(price);
  }

  /* ---- Pasos ---- */
  function go(k) {
    cur = k;
    steps.forEach((s, i) => { s.hidden = i !== k; });
    marks.forEach((m, i) => { m.classList.toggle('on', i <= k); if (i === k) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current'); });
    steps[k].classList.remove('enter'); void steps[k].offsetWidth; steps[k].classList.add('enter');
    $('#back').hidden = k === 0;
    $('#next').hidden = k === steps.length - 1;
    $('#submit').hidden = k !== steps.length - 1;
    const top = $('#reserva').getBoundingClientRect().top;
    if (top < 0) $('#reserva').scrollIntoView({ behavior: NN.reduce ? 'auto' : 'smooth' });
  }
  function valid(k) {
    const st = steps[k];
    if (k === 0 && !st.querySelector('input[name="servicio"]:checked')) { NN.say('Elige un servicio para continuar'); st.querySelector('input[name="servicio"]').focus(); return false; }
    if (k === 1) {
      if (!dateIn.checkValidity()) { dateIn.reportValidity(); return false; }
      if (!st.querySelector('input[name="slot"]:checked')) { $('#slot-err').hidden = false; (st.querySelector('input[name="slot"]:not(:disabled)') || dateIn).focus(); return false; }
    }
    const bad = [...st.querySelectorAll('input,select,textarea')].find((el) => !el.checkValidity());
    if (bad) { bad.reportValidity(); bad.focus(); return false; }
    return true;
  }
  $('#next').addEventListener('click', () => { if (valid(cur)) go(cur + 1); });
  $('#back').addEventListener('click', () => go(cur - 1));
  form.addEventListener('change', (ev) => {
    if (ev.target === dateIn) renderSlots();
    if (ev.target.name === 'slot') $('#slot-err').hidden = true;
    renderSummary();
  });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (cur !== steps.length - 1) { if (valid(cur)) go(cur + 1); return; }
    if (!valid(cur)) return;
    const name = $('#f-name').value.trim().split(' ')[0];
    $('#done-title').innerHTML = `Gracias, <em>${name.replace(/[<>&"]/g, '')}</em>`;
    $('#done-text').textContent = `${$('#s-service').textContent} el ${$('#s-date').textContent} a las ${$('#s-slot').textContent}. En el sitio real, aquí el estudio recibiría tu solicitud y te confirmaría por WhatsApp.`;
    form.hidden = true; $('#stepper').hidden = true; $('#done').hidden = false;
    $('#reserva').scrollIntoView({ behavior: NN.reduce ? 'auto' : 'smooth' });
  });
  $('#again').addEventListener('click', () => { form.reset(); dateIn.value = NN.next ? NN.next.date : NN.iso(new Date()); form.hidden = false; $('#stepper').hidden = false; $('#done').hidden = true; renderSlots(); renderSummary(); go(0); });

  /* ---- Horario ---- */
  const today = new Date().getDay();
  $('#hours tbody').innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) =>
    `<tr class="${d === today ? 'today' : ''}"><td>${NN.DAYS[d]}</td><td>${NN.hh(NN.HOURS[d][0])} – ${NN.hh(NN.HOURS[d][1])}</td></tr>`).join('');

  renderSlots(); renderSummary(); go(pre ? 1 : 0);
})();
