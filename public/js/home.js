window.addEventListener("load", main)

async function acessarIngressos() {
        const res = await fetch("/api/ingressos")
        const dado = await res.json()
        console.log(dado)
        return dado;
}
function criarCardIngresso(ingresso) {

    return `
        <div class="produto">
            <img src="${ingresso.caminho_img}" alt="ingresso" style="width:100%; height: 67%;">
                <div class="texto-produto">
                    <h2>${ingresso.nome}</h2>
                    <a href="/ingressos" class="saiba-mais">Saiba Mais</a>
                </div>
        </div>
    `;
}

async function main() {
    const ingressos = await acessarIngressos();
    const container = document.getElementById('produtos'); 

    ingressos.forEach(ingresso => {
        container.innerHTML += criarCardIngresso(ingresso);
    });
}