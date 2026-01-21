// ======== CONSTANTES GLOBAIS ======== //

const menu = document.getElementById("main-menu");
const sections = document.querySelectorAll("section");

// ========== EVENT LISTENERS ========== //

document.addEventListener('DOMContentLoaded', function () {
    const language = localStorage.getItem('appLanguage') || 'pt';
    const option = document.querySelector(`[data-i18n=${language}]`);

    slideToggle(option);
});

document.querySelectorAll(".toggle-item").forEach(item => {
    item.addEventListener("click", function () {
        slideToggle(this);
    });
});

document.getElementById("burger-menu-btn").addEventListener("click", showMenu);

window.onscroll = function() {
    // Mostra a barra de navegação
    showNavBar()
    // Redimensiona a barra de rolagem
    resizeScrollBar();
};

// Adiciona scroll suave assim que a página carrega
window.onload = function () {
    setLinkAnimation()
};

// =============== GERAL =============== //

function resizeScrollBar() {
  const scroll = document.getElementById("scroll");

  // Obtém a posição atual do scroll
  const scrollTop = window.pageYOffset;
  // Calcula a altura disponível da janela
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  // Calcula o progresso do scroll em porcentagem
  let progress = scrollTop / docHeight;
  progress = progress * 0.98 

  // Aumenta o tamanho conforme o progresso
  scroll.style.transform = `scaleY(${progress})`;
}

function setLinkAnimation() {
    // Seleciona todos os links da página
    links = document.querySelectorAll('a[href^="#"]');

    // Percorre os links
    links.forEach(link => {
        link.addEventListener('click', e => {
            // Retira o comporamento padrão
            e.preventDefault();
            // Armazena a referência do link
            const target = document.querySelector(link.getAttribute('href'));
            // Armazena a altura do cabeçalho
            const headerOffset = document.querySelector('nav').offsetHeight;
            // Posição do elemento alvo + posição atual da tela - altura do cabeçalho = destino do scroll
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            // Scrolla suavemente até o destino
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Esconde o menu após o clique
            hideMenu()
        });
    });
}

function showNavBar() {
    // Ativa a navbar se a página scrollar mais de 10 pixels
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active", window.pageYOffset > 10);
}

function slideToggle(option) {
  const container = option.parentElement;

  // Desativa a outra opção
  container.querySelectorAll(".toggle-item").forEach(el => el.classList.remove("active"));
  
  // Ativa a opção selecionada
  option.classList.toggle("active");

  // Move o slider
  if (option === container.children[1]) {
    container.classList.add("right");
  } else {
    container.classList.remove("right");
  }
}

// ============== MOBILE ============== //

function showMenu() {
    // Ativa o menu e troca o ícone
    menu.classList.toggle("collapsed");
    document.getElementById("burger-icon").classList.toggle("active");
};

function hideMenu() {
    // Desativa o menu e troca o ícone
    menu.classList.remove("collapsed"); 
    document.getElementById("burger-icon").classList.remove("active");    
}