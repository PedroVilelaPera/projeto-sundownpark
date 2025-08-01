window.addEventListener("load", main)

async function acessarIngressos() {
        const res = await fetch("/api/ingressos")
        const dado = await res.json()
        console.log(dado)
        return dado;
}

function criarCardIngresso(ingresso) {

    let acessoDino = '';

    if (ingresso.acesso_todas_atracoes === 0) {
        acessoDino = '<li class="x">Acesso às atrações do Reino dos Dinossauros.</li>';
    }
    else {
        acessoDino = '<li class="check">Acesso às atrações do Reino dos Dinossauros.</li>';
    }

    const precoFormatado = ingresso.preco.toFixed(2).replace('.', ',');

    return `
        <div class="card-encontro">
            <div class="coluna-imagem">
                <img src="${ingresso.caminho_img}" alt="Imagem do ${ingresso.nome}">
            </div>
            <div class="coluna-conteudo">
                <h2>${ingresso.nome}</h2>
                <p class="descricao">
                    ${ingresso.desc}
                </p>
                <h3 class="subtitulo-acesso">Acesso às Atrações:</h3>
                <ul class="lista-acesso">
                    <li class="check">Acesso a todas as atrações do Sundown Park.</li>
                    ${acessoDino}
                </ul>
                <p class="valores">A partir de: R$ ${precoFormatado}</p>
                
                <a href="/compra?id=${ingresso.id}" class="botao-reservar">Comprar Ingressos</a>
                
                <div class="info-adicional">
                    <p><strong>Experiência Sundown Park.</strong><br>
                    ${ingresso.altura}</p>
                </div>
            </div>
        </div>
    `;
}

async function main() {
    const ingressos = await acessarIngressos();
    const container = document.getElementById('container');

    container.innerHTML = ''; 

    ingressos.forEach(ingresso => {
        container.innerHTML += criarCardIngresso(ingresso);
    });
}
