const translations = {};

// Aciona o evento de clique no botão de idioma
document.querySelectorAll(".toggle-item").forEach(item => {
    item.addEventListener("click", function () {
        const lang = item.dataset.i18n;
        setLanguage(lang);
    });
});

// Carrega o arquivo JSON de um idioma
async function loadLanguage(lang) {
    // Verifica se o idioma já foi carregado anteriormente
    if (translations[lang]) {
        return translations[lang];
    }

    try {    
        // Faz a requisição pro JSON    
        const response = await fetch(`/i18n/${lang}.json`);
        const data = await response.json();
        // Armazena e retorna o conteúdo do arquivo
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error("Erro ao carregar tradução:", error)    
    }
}

// Altera o conteúdo do HTML com base no idioma
async function setLanguage(lang) {
    // Armazena o JSON
    const languageData = await loadLanguage(lang);

    if (!languageData) {
        console.error(`Idioma '${lang}' não encontrado.`);
    }

    // Armazena os elementos a serem traduzidos
    const elements = document.querySelectorAll('[data-i18n]');

    // Percorre os elementos a serem traduzidos
    elements.forEach(element => {
        // Obtém a key informada no HTML
        const key = element.getAttribute('data-i18n');
        // Obtém a tradução no JSON
        const translatedText = languageData[key];

        // Substitui o conteúdo pela tradução
        if (translatedText) {
            element.textContent = translatedText;
        } else {
            console.error(`Chave de tradução não encontrada para '${key}' no idioma '${lang}'`);
        }
    });
}

// Inicializa o idioma como inglês
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
});