(function(){
  var N = window.NUMEROS || [];
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function img(n){return 'img/portada-'+n.id+'.jpg'}
  function pdf(n){return 'pdf/lde-'+n.id+'-es.pdf'}

  var ult = document.getElementById('ultimo');
  if (ult && N[0]) {
    var n = N[0];
    ult.innerHTML = '<div class="hero"><div class="cover"><a href="numero.html?n='+n.id+'"><img src="'+img(n)+'" alt="Portada de '+esc(n.titulo)+'"></a><p class="credit">'+esc(n.portada)+'</p></div>'+
      '<div><h1>¡Lee el último número de LDE en español!</h1><p class="mut">'+esc(n.titulo)+' · '+esc(n.volumen)+'</p>'+
      '<h2>En este número</h2><ul class="toc">'+n.articulos.slice(0,5).map(function(a){return '<li><b>'+esc(a.t)+'</b><span>'+esc(a.d)+'</span></li>'}).join('')+'</ul>'+
      '<a class="btn main" href="'+pdf(n)+'">Descargar PDF</a><a class="btn" href="numero.html?n='+n.id+'">Ver índice completo</a></div></div>';
  }
  var list = document.getElementById('lista-numeros');
  if (list) {
    list.innerHTML = N.map(function(n){
      return '<a class="card" href="numero.html?n='+n.id+'"><img loading="lazy" src="'+img(n)+'" alt="Portada de '+esc(n.titulo)+'"><b>'+esc(n.titulo)+'</b><small>'+esc(n.volumen)+'</small></a>';
    }).join('');
  }
  var box = document.getElementById('numero');
  if (box) {
    var id = new URLSearchParams(location.search).get('n');
    var m = N.filter(function(x){return x.id===id})[0] || N[0];
    if (!m) { box.textContent = 'No hay números publicados todavía.'; return; }
    document.title = m.titulo + ' — LDE en español';
    box.innerHTML = '<div class="hero"><div class="cover"><img src="'+img(m)+'" alt="Portada de '+esc(m.titulo)+'"><p class="credit">'+esc(m.portada)+'</p></div>'+
      '<div><h1>'+esc(m.titulo)+'</h1><p class="mut">'+esc(m.volumen)+' · Edición en español revisada por Elena González Vallejo</p>'+
      '<a class="btn main" href="'+pdf(m)+'">Descargar PDF</a><a class="btn" href="'+esc(m.original)+'">Original en inglés</a><hr>'+
      '<h2>En este número</h2><ul class="toc">'+m.articulos.map(function(a){return '<li><b>'+esc(a.t)+'</b><span>'+esc(a.d)+'</span></li>'}).join('')+'</ul></div></div>';
  }
})();
