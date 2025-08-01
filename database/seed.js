import { dbPromise } from "./db.js";

let ingressos = [
    {
        nome: "Ingresso Padrão",
        preco: 69.90,
        desc: "Com este ingresso, você e sua família têm acesso a diversas atrações emocionantes e relaxantes. Desfrute de um dia inesquecível em um ambiente seguro e acolhedor.",
        altura: "Para crianças e adultos acima de 1,40m de altura.",
        acesso_todas_atracoes: false,
        caminho_img: "./assets/imgs/ingresso_padrao.png"

    },
    {
        nome: "Combo Sundown Park",
        preco: 99.90,
        desc: "Com este ingresso, você e sua família têm acesso a diversas atrações emocionantes e relaxantes. Desfrute de um dia inesquecível em um ambiente seguro e acolhedor.",
        altura: "Para crianças e adultos acima de 1,40m de altura.",
        acesso_todas_atracoes: true,
        caminho_img: './assets/imgs/ingresso-combo.jpg'
    }
]

let atracoes = [
  {
    "titulo_atracao": "Reino dos Dinossauros",
    "texto_atracao": "Embarque numa aventura jurássica e explore o Reino dos Dinossauros, uma área temática que fascina crianças e adultos. Caminhe entre réplicas impressionantes dessas criaturas pré-históricas e sinta a emoção de estar perto dos gigantes do passado!",
    "caminho_img": "./assets/imgs/parque_dino.jpg",
    "texto_alt": "Imagem do Reino dos Dinossauros no Sundown Park",
    "caminho_atracao": "/atracao1"
  },
  {
    "titulo_atracao": "Ilha dos Piratas",
    "texto_atracao": "Prepare-se para zarpar rumo à diversão na Ilha dos Piratas! Explore um mundo de aventuras com escorregadores, jatos d'água e muitas surpresas para os pequenos marujos. Deixe a imaginação correr solta e encontre o tesouro da alegria neste playground aquático temático.",
    "caminho_img": "./assets/imgs/ilha_piratas.jpg",
    "texto_alt": "Imagem da Ilha dos Piratas no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Torre do Pânico",
    "texto_atracao": "Prepare-se para um frio na barriga e um grito de pura emoção! A Torre do Pânico desafia os mais corajosos a encarar uma queda vertiginosa que vai te deixar sem fôlego. Sinta a adrenalina pulsar enquanto você despenca em alta velocidade. Será que você tem coragem?",
    "caminho_img": "./assets/imgs/torre_panico.jpg",
    "texto_alt": "Imagem da Torre do Pânico no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Kionda (Piscina de Ondas)",
    "texto_atracao": "Transporte-se para o litoral sem sair do parque na Kionda, a piscina que simula o balanço suave e divertido do mar. Relaxe na \"praia\" ou pule nas ondas contagiantes que garantem a diversão de toda a família. Aqui, a vibe praiana é garantida o dia inteiro!",
    "caminho_img": "./assets/imgs/kionda.jpg",
    "texto_alt": "Imagem da Kionda (Piscina de Ondas) no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Aqua Kids",
    "texto_atracao": "O paraíso da criançada tem nome: Aqua Kids! Um espaço especialmente projetado para os pequenos aventureiros, com mini toboáguas, escorregadores coloridos e fontes interativas. Aqui, a diversão é segura e a alegria não tem tamanho, garantindo sorrisos e muitas risadas.",
    "caminho_img": "./assets/imgs/kids.jpg",
    "texto_alt": "Imagem do Aqua Kids no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Trem Bala",
    "texto_atracao": "Sinta a velocidade e a emoção de um foguete no Trem Bala! Com 90 metros de pura adrenalina, este toboágua proporciona uma descida alucinante para quem busca fortes emoções. Agarre firme sua boia e prepare-se para uma viagem inesquecível e cheia de velocidade.",
    "caminho_img": "./assets/imgs/trem_bala.jpg",
    "texto_alt": "Imagem do Trem Bala no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Loko Balde",
    "texto_atracao": "Prepare-se para um banho de surpresa e muita risada com o Loko Balde! Espere ansiosamente enquanto o enorme balde enche e, de repente, despeja uma cascata de água refrescante sobre todos. É diversão garantida e um dos momentos mais esperados do parque!",
    "caminho_img": "./assets/imgs/loco_balde.jpg",
    "texto_alt": "Imagem do Loko Balde no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Piscina Atlântica (Piscina Olímpica)",
    "texto_atracao": "Para os amantes da natação ou para quem busca um mergulho mais tranquilo, a Piscina Atlântica é o lugar ideal. Com dimensões olímpicas, oferece espaço de sobra para praticar seu nado ou simplesmente relaxar sob o sol. Um convite ao bem-estar e à prática esportiva.",
    "caminho_img": "./assets/imgs/piscina_olimpica.jpg",
    "texto_alt": "Imagem da Piscina Atlântica no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Splash Ball",
    "texto_atracao": "Curta a emoção na medida certa no Splash Ball! Ideal para quem quer sentir um friozinho na barriga sem encarar as alturas mais radicais, este escorregador oferece uma descida divertida e refrescante. Prepare-se para um mergulho cheio de alegria e velocidade!",
    "caminho_img": "./assets/imgs/splash_ball.jpg",
    "texto_alt": "Imagem do Splash Ball no Sundown Park",
    "caminho_atracao": null
  },
  {
    "titulo_atracao": "Rio Lento (Passeio de Boia)",
    "texto_atracao": "Relaxe e deixe a correnteza te levar em um delicioso passeio pelo Rio Lento. Flutue em sua boia enquanto aprecia a paisagem do parque e recarrega as energias. É o momento perfeito para descansar entre uma aventura e outra, curtindo a tranquilidade das águas.",
    "caminho_img": "./assets/imgs/rio_lento.jpg",
    "texto_alt": "Imagem do Rio Lento no Sundown Park",
    "caminho_atracao": null
  }
];

async function popularBanco() {
    const db = await dbPromise

    for (let x = 0; x < ingressos.length; x++) {
      await db.run(
        `
          INSERT INTO tipos_ingresso (nome, preco, desc, altura, acesso_todas_atracoes, caminho_img) VALUES (?,?,?,?,?,?)
        `, [ingressos[x].nome, ingressos[x].preco, ingressos[x].desc, ingressos[x].altura, ingressos[x].acesso_todas_atracoes, ingressos[x].caminho_img]
      )
    }

    for (let x = 0; x < atracoes.length; x++) {
      await db.run(
        `
          INSERT INTO atracoes (titulo_atracao, texto_atracao, caminho_img, texto_alt, caminho_atracao) VALUES (?,?,?,?,?)
        `, [atracoes[x].titulo_atracao, atracoes[x].texto_atracao, atracoes[x].caminho_img, atracoes[x].texto_alt, atracoes[x].caminho_atracao]
      )
    }
}

popularBanco()

// talvez
async function popularBDEventos() {
    const db = await dbPromise

    let eventos = [
        { data: "06/09/2026", descricao: "Aberto ao publico", disponivel: true }

    ]

    // day.js -> obter todos os fins de semana, constroi o objeto que representa o evento, popula no BD.
    // moment.js
}
