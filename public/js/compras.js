window.addEventListener('load', function () {
    const params = new URLSearchParams(window.location.search);
    const ingressoId = params.get('id');

    adicionarListenersDeAtualizacao(ingressoId);
    adicionarListenerDeData();
});

async function acessarIngresso(id) {
    const response = await fetch('/api/ingressos/' + id);
    const ingresso = await response.json();
    return ingresso;
}

async function adicionarListenersDeAtualizacao(id) {
    const ingresso = await acessarIngresso(id);

    const qtdAdultoInput = document.getElementById('qtd_adulto');
    const qtdInfantilInput = document.getElementById('qtd_infantil');
    
    document.querySelector('.container-texto .tamanho-maior').textContent = ingresso.nome;
    document.getElementById('img-ingresso-format').src = ingresso.caminho_img;

    let precoAdulto = ingresso.precoAdulto;
    let precoInfantil = ingresso.precoInfantil;

    const precoAdultoElement = document.querySelector('.container-quantidade div:nth-child(1) h2:nth-of-type(2)');
    const precoInfantilElement = document.querySelector('.container-quantidade div:nth-child(2) h2:nth-of-type(2)');

    if (precoAdultoElement) {
        precoAdultoElement.textContent = `R$ ${precoAdulto.toFixed(2).replace('.', ',')}`;
    }
    if (precoInfantilElement) {
        precoInfantilElement.textContent = `R$ ${precoInfantil.toFixed(2).replace('.', ',')}`;
    }

    qtdAdultoInput.addEventListener('input', () => {
        atualizarCarrinho(precoAdulto, precoInfantil, qtdAdultoInput, qtdInfantilInput);
    });

    qtdInfantilInput.addEventListener('input', () => {
        atualizarCarrinho(precoAdulto, precoInfantil, qtdAdultoInput, qtdInfantilInput);
    });

    atualizarCarrinho(precoAdulto, precoInfantil, qtdAdultoInput, qtdInfantilInput);
}

function atualizarCarrinho(precoAdulto, precoInfantil, qtdAdultoInput, qtdInfantilInput) {
    const qtdAdulto = parseInt(qtdAdultoInput.value) || 0;
    const qtdInfantil = parseInt(qtdInfantilInput.value) || 0;

    const total = (qtdAdulto * precoAdulto) + (qtdInfantil * precoInfantil);
    document.getElementById('valor').innerHTML = `<strong>R$ ${total.toFixed(2).replace('.', ',')}</strong>`;

    const itensCarrinhoDiv = document.getElementById('itens-carrinho');
    itensCarrinhoDiv.innerHTML = '';

    if (qtdAdulto > 0 || qtdInfantil > 0) {
        itensCarrinhoDiv.innerHTML += `<div class="container-detalhes"><p class="cor-texto-2"><strong>Detalhes do ingresso</strong></p></div>`;
    }
    if (qtdAdulto > 0) {
        itensCarrinhoDiv.innerHTML += `<div class="container-detalhes-ingresso"><p class="cor-texto"><strong>Adultos x ${qtdAdulto}</strong></p><p class="cor-texto"><strong>R$ ${(qtdAdulto * precoAdulto).toFixed(2).replace('.', ',')}</strong></p></div>`;
    }
    if (qtdInfantil > 0) {
        itensCarrinhoDiv.innerHTML += `<div class="container-detalhes-ingresso"><p class="cor-texto"><strong>Infantil x ${qtdInfantil}</strong></p><p class="cor-texto"><strong>R$ ${(qtdInfantil * precoInfantil).toFixed(2).replace('.', ',')}</strong></p></div>`;
    }
}

function adicionarListenerDeData() {
    const dataDisplay = document.querySelector('.div-data p strong');
    const opcoesData = document.querySelectorAll('input[name="tipo"]');

    opcoesData.forEach(function (input) {
        input.addEventListener('change', function (event) {
            atualizarDataExibida(event.target, dataDisplay);
        });
    });

    const selecionadoInicial = document.querySelector('input[name="tipo"]:checked');
    if (selecionadoInicial) {
        atualizarDataExibida(selecionadoInicial, dataDisplay);
    }
}

function atualizarDataExibida(elementoSelecionado, dataDisplay) {
    if (elementoSelecionado.type === 'radio') {
        if (elementoSelecionado.value.toLowerCase() === 'hoje') {
            dataDisplay.textContent = 'Hoje';
        } else if (elementoSelecionado.value.toLowerCase() === 'amanha') {
            dataDisplay.textContent = 'Amanhã';
        }
    } else if (elementoSelecionado.type === 'date') {
        const [ano, mes, dia] = elementoSelecionado.value.split('-');
        if (dia && mes && ano) {
            dataDisplay.textContent = `${dia}/${mes}/${ano}`;
        }
    }
}
