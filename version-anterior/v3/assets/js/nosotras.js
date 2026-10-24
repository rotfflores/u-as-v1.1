/* Nube Nácar · nosotras: tarjetas del equipo */
(() => {
  const NN = window.NN, $ = NN.$;
  $('#team').innerHTML = NN.TEAM.map((m) => `<article class="member card lift rise">
      <span class="years">${m.years} años</span>
      <div class="avatar" style="--h1:${m.h1};--h2:${m.h2}" aria-hidden="true">${m.ini}</div>
      <div><h3>${m.name}</h3><p class="role">${m.role}</p></div>
      <div class="tags">${m.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="member-foot"><span>Agenda directo con ella</span><a class="link-btn" href="reservar.html?artista=${m.id}">Agendar</a></div>
    </article>`).join('');
})();
