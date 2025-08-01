window.addEventListener("load", main)

async function acessarAtracoes() {
        const res = await fetch("/api/atracoes")
        const dado = await res.json()
        return dado;
}

function criarCardAtracao (atracao) {
    return `
        <div class="conteudo-atracoes">
            <div class="imagem-atracoes"><img src="${atracao.caminho_img}" alt="${atracao.texto_alt}"></div>
            <div class="texto-atracoes">
                <h2>${atracao.titulo_atracao}</h2>
                <p>${atracao.texto_atracao}</p>
                <a href="${atracao.caminho_atracao}" class="saiba-mais">Saiba Mais</a>
            </div>
        </div>
    `
}

async function main() {
    const atracoes = await acessarAtracoes();
    const secao = document.getElementById('secao-atracoes');

    const h1 = document.createElement('h1');
    h1.textContent = 'Onde a adrenalina encontra o sorriso - seu dia épico começa aqui!';

    secao.innerHTML = ''; 

    secao.appendChild(h1);

    for (let i = 0; i < atracoes.length; i += 2) {
        const container = document.createElement('div');
        container.className = 'container-atracoes';

        let cardsHTML = criarCardAtracao(atracoes[i]);

        if (i + 1 < atracoes.length) {
            cardsHTML += criarCardAtracao(atracoes[i + 1]);
        }
        
        container.innerHTML = cardsHTML;

        secao.appendChild(container);
    }
}