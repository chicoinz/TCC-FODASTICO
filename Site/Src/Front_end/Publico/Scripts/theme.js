/**
 * Tema (claro/escuro) e menu mobile do cabeçalho.
 * A preferência é salva em localStorage; sem preferência salva, o site segue
 * a configuração do sistema operacional do usuário.
 */
(function () {
  const root = document.documentElement;
  const salvo = localStorage.getItem('darkMode');
  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const escuroInicial = salvo === null ? sistemaEscuro : salvo === 'true';

  if (escuroInicial) {
    root.classList.add('dark-mode');
  }

  const botaoTema = document.getElementById('themeToggle');
  const iconeTema = document.querySelector('.theme-icon');

  function atualizarIcone() {
    if (iconeTema) {
      iconeTema.textContent = root.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
  }

  atualizarIcone();

  if (botaoTema) {
    botaoTema.addEventListener('click', function () {
      root.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', root.classList.contains('dark-mode'));
      atualizarIcone();
    });
  }

  const botaoMenu = document.getElementById('headerToggle');
  const container = document.querySelector('.header-container');

  if (!botaoMenu || !container) return;

  botaoMenu.addEventListener('click', function (evento) {
    evento.stopPropagation();
    container.classList.toggle('mobile-open');
    botaoMenu.classList.toggle('active');
  });

  container.querySelectorAll('.header-nav a, .header-right a').forEach(function (link) {
    link.addEventListener('click', function () {
      container.classList.remove('mobile-open');
      botaoMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', function (evento) {
    if (!container.contains(evento.target) && !botaoMenu.contains(evento.target)) {
      container.classList.remove('mobile-open');
      botaoMenu.classList.remove('active');
    }
  });
})();
