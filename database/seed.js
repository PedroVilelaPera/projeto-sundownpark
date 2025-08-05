import { dbPromise } from './db.js'

// DADOS DO BANCO
const calendarioJSON = {
    "2025" : {
        "Setembro" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "segunda",
            "diasAbertos" : [6,7,13,14,20,21,27,28], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : []
        },
        "Outubro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "quarta",
            "diasAbertos" : [4,5,10,11,12,17,18,19,25,26], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : ["10 a 12 - Feriado Semana das Crianças"]
        },
        "Novembro" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "sabado",
            "diasAbertos" : [1,2,8,9,14,15,16,20,21,22,23,29,30], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : ["15 - Feriado Proclamação da República", "20 - Dia da Consciência Negra"]
        },
        "Dezembro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "segunda",
            "diasAbertos" : [6,7,12,13,14,20,21,25,26,27,28], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : ["25 - Feriado de Natal"]
        }
    },
    "2026" : {
        "Janeiro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "quinta",
            "diasAbertos" : [1,2,3,4,9,10,11,16,17,18,23,24,25,30,31], 
            "diasAConfirmarAbertura" : [8],
            "datasEspeciais" : ["01 - Feriado de Ano Novo"]
        },
        "Fevereiro" : {
            "totalDeDias" : 28,
            "diaDaSemanaQueComeca" : "domingo",
            "diasAbertos" : [1,7,8,14,15,16,17,21,22,28], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : ["14 a 17 - Feriado de Carnaval"]
        },
        "Março" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "domingo",
            "diasAbertos" : [1,7,8,14,15,21,22,28,29], 
            "diasAConfirmarAbertura" : [],
            "datasEspeciais" : []
        },
        "Abril" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "quarta",
            "diasAbertos" : [5,12,19,21,26], 
            "diasAConfirmarAbertura" : [4,11,18,25],
            "datasEspeciais" : ["21 - Feriado de Tiradentes"]
        },
        "Maio" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "sexta",
            "diasAbertos" : [1,3], 
            "diasAConfirmarAbertura" : [2],
            "datasEspeciais" : ["01 - Feriado dia do Trabalho"]
        }
        
        
    }
}
const ingressos = [
    { nome: "Ingresso Padrão", precoAdulto: 99.90, precoInfantil: 69.90, desc: "Com este ingresso, você e sua família têm acesso a diversas atrações emocionantes e relaxantes. Desfrute de um dia inesquecível em um ambiente seguro e acolhedor.", altura: "Para crianças e adultos acima de 1,40m de altura.", acesso_todas_atracoes: 0, caminho_img: "./assets/imgs/ingresso_padrao.png" },
    { nome: "Combo Sundown Park", precoAdulto: 99.90, precoInfantil: 99.90, desc: "Com este ingresso, você e sua família têm acesso a diversas atrações emocionantes e relaxantes. Desfrute de um dia inesquecível em um ambiente seguro e acolhedor.", altura: "Para crianças e adultos acima de 1,40m de altura.", acesso_todas_atracoes: 1, caminho_img: './assets/imgs/ingresso-combo.jpg' }
]
const atracoes = [
    { "titulo_atracao": "Reino dos Dinossauros", "texto_atracao": "Embarque numa aventura jurássica e explore o Reino dos Dinossauros, uma área temática que fascina crianças e adultos. Caminhe entre réplicas impressionantes dessas criaturas pré-históricas e sinta a emoção de estar perto dos gigantes do passado!", "caminho_img": "./assets/imgs/parque_dino.jpg", "texto_alt": "Imagem do Reino dos Dinossauros no Sundown Park", "caminho_atracao": "/atracao1" },
    { "titulo_atracao": "Ilha dos Piratas", "texto_atracao": "Prepare-se para zarpar rumo à diversão na Ilha dos Piratas! Explore um mundo de aventuras com escorregadores, jatos d'água e muitas surpresas para os pequenos marujos. Deixe a imaginação correr solta e encontre o tesouro da alegria neste playground aquático temático.", "caminho_img": "./assets/imgs/ilha_piratas.jpg", "texto_alt": "Imagem da Ilha dos Piratas no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Torre do Pânico", "texto_atracao": "Prepare-se para um frio na barriga e um grito de pura emoção! A Torre do Pânico desafia os mais corajosos a encarar uma queda vertiginosa que vai te deixar sem fôlego. Sinta a adrenalina pulsar enquanto você despenca em alta velocidade. Será que você tem coragem?", "caminho_img": "./assets/imgs/torre_panico.jpg", "texto_alt": "Imagem da Torre do Pânico no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Kionda (Piscina de Ondas)", "texto_atracao": "Transporte-se para o litoral sem sair do parque na Kionda, a piscina que simula o balanço suave e divertido do mar. Relaxe na \"praia\" ou pule nas ondas contagiantes que garantem a diversão de toda a família. Aqui, a vibe praiana é garantida o dia inteiro!", "caminho_img": "./assets/imgs/kionda.jpg", "texto_alt": "Imagem da Kionda (Piscina de Ondas) no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Aqua Kids", "texto_atracao": "O paraíso da criançada tem nome: Aqua Kids! Um espaço especialmente projetado para os pequenos aventureiros, com mini toboáguas, escorregadores coloridos e fontes interativas. Aqui, a diversão é segura e a alegria não tem tamanho, garantindo sorrisos e muitas risadas.", "caminho_img": "./assets/imgs/kids.jpg", "texto_alt": "Imagem do Aqua Kids no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Trem Bala", "texto_atracao": "Sinta a velocidade e a emoção de um foguete no Trem Bala! Com 90 metros de pura adrenalina, este toboágua proporciona uma descida alucinante para quem busca fortes emoções. Agarre firme sua boia e prepare-se para uma viagem inesquecível e cheia de velocidade.", "caminho_img": "./assets/imgs/trem_bala.jpg", "texto_alt": "Imagem do Trem Bala no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Loko Balde", "texto_atracao": "Prepare-se para um banho de surpresa e muita risada com o Loko Balde! Espere ansiosamente enquanto o enorme balde enche e, de repente, despeja uma cascata de água refrescante sobre todos. É diversão garantida e um dos momentos mais esperados do parque!", "caminho_img": "./assets/imgs/loco_balde.jpg", "texto_alt": "Imagem do Loko Balde no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Piscina Atlântica (Piscina Olímpica)", "texto_atracao": "Para os amantes da natação ou para quem busca um mergulho mais tranquilo, a Piscina Atlântica é o lugar ideal. Com dimensões olímpicas, oferece espaço de sobra para praticar seu nado ou simplesmente relaxar sob o sol. Um convite ao bem-estar e à prática esportiva.", "caminho_img": "./assets/imgs/piscina_olimpica.jpg", "texto_alt": "Imagem da Piscina Atlântica no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Splash Ball", "texto_atracao": "Curta a emoção na medida certa no Splash Ball! Ideal para quem quer sentir um friozinho na barriga sem encarar as alturas mais radicais, este escorregador oferece uma descida divertida e refrescante. Prepare-se para um mergulho cheio de alegria e velocidade!", "caminho_img": "./assets/imgs/splash_ball.jpg", "texto_alt": "Imagem do Splash Ball no Sundown Park", "caminho_atracao": null },
    { "titulo_atracao": "Rio Lento (Passeio de Boia)", "texto_atracao": "Relaxe e deixe a correnteza te levar em um delicioso passeio pelo Rio Lento. Flutue em sua boia enquanto aprecia a paisagem do parque e recarrega as energias. É o momento perfeito para descansar entre uma aventura e outra, curtindo a tranquilidade das águas.", "caminho_img": "./assets/imgs/rio_lento.jpg", "texto_alt": "Imagem do Rio Lento no Sundown Park", "caminho_atracao": null }
]

async function popularBanco() {
    const db = await dbPromise;

    await db.run('BEGIN TRANSACTION');
    for (const ano in calendarioJSON) {
        for (const nomeMes in calendarioJSON[ano]) {
            const data = calendarioJSON[ano][nomeMes];

            const result = await db.run('INSERT INTO meses (ano, nome, total_dias, inicio_semana) VALUES (?, ?, ?, ?)', ano, nomeMes, data.totalDeDias, data.diaDaSemanaQueComeca);
            const mesId = result.lastID;

            for (const dia of data.diasAbertos) {
                await db.run('INSERT INTO dias_operacao (dia, status, mes_id) VALUES (?, ?, ?)', dia, 'aberto', mesId);
            }
            for (const dia of data.diasAConfirmarAbertura) {
                await db.run('INSERT INTO dias_operacao (dia, status, mes_id) VALUES (?, ?, ?)', dia, 'a_confirmar', mesId);
            }
            for (const desc of data.datasEspeciais) {
                await db.run('INSERT INTO datas_especiais (descricao, mes_id) VALUES (?, ?)', desc, mesId);
            }
        }
    }
    await db.run('COMMIT');

    for (const ingresso of ingressos) {
        await db.run('INSERT INTO tipos_ingresso (nome, precoAdulto, precoInfantil, desc, altura, acesso_todas_atracoes, caminho_img) VALUES (?, ?, ?, ?, ?, ?, ?)', ingresso.nome, ingresso.precoAdulto, ingresso.precoInfantil , ingresso.desc, ingresso.altura, ingresso.acesso_todas_atracoes, ingresso.caminho_img);
    }

    for (const atracao of atracoes) {
        await db.run('INSERT INTO atracoes (titulo_atracao, texto_atracao, caminho_img, texto_alt, caminho_atracao) VALUES (?, ?, ?, ?, ?)', atracao.titulo_atracao, atracao.texto_atracao, atracao.caminho_img, atracao.texto_alt, atracao.caminho_atracao);
    }
}

popularBanco();