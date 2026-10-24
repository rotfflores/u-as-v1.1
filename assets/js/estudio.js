/* Nube Nácar · estudio: equipo */
(() => {
  const NN = window.NN, $ = NN.$;
  $('#team').innerHTML = NN.TEAM.map((m) => `<article class="member reveal">
    <div class="portrait" style="--tint:${m.tint}"><span aria-hidden="true">${m.ini}</span><small>${m.years} años en el oficio</small></div>
    <h3>${m.name}</h3><p class="role">${m.role}</p><p class="spec">${m.spec}</p>
    <a class="u-link" href="reservar.html?artista=${m.id}">Agendar con ella</a>
  </article>`).join('');
})();
