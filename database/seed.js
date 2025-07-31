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

async function popularBanco() {
    const db = await dbPromise

    for (let x = 0; x < ingressos.length; x++) {
        await db.run(
            `
                INSERT INTO tipos_ingresso (nome, preco, desc, altura, acesso_todas_atracoes, caminho_img) VALUES (?,?,?,?,?,?)
                `, [ingressos[x].nome, ingressos[x].preco, ingressos[x].desc, ingressos[x].altura, ingressos[x].acesso_todas_atracoes, ingressos[x].caminho_img]
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

    // day.js -> obter todos os fins de semana, constroi o objeto que represnta o evento, popula no BD.
    // moment.js
}
