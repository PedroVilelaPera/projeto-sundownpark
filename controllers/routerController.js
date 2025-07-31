import { __dirname } from "../index.js"
import { dbPromise } from '../database/db.js'

function home(req, res) {
    return res.status(200).sendFile(__dirname + "/public/home.html")
}

function ingressos(req, res) {
    return res.status(200).sendFile(__dirname + "/public/ingressos.html")
}

async function servirIngressos(req, res) {
    const db = await dbPromise
    const dados = await db.all("SELECT * FROM tipos_ingresso")
    return res.status(200).json(dados)
}

async function servirIngressoPorId(req, res) {

    const id = req.params.id;
    const db = await dbPromise;

    const dados = await db.get("SELECT * FROM tipos_ingresso WHERE id = ?", id);

    if (dados) {
        return res.status(200).json(dados);
    } else {
        return res.status(404).json({ message: "Ingresso não encontrado" });
    }
}

function atracoes(req, res) {
    return res.status(200).sendFile(__dirname + "/public/atracoes.html")
}

function calendario(req, res) {
    return res.status(200).sendFile(__dirname + "/public/calendario.html")
}

function compra(req, res) {
    return res.status(200).sendFile(__dirname + "/public/compra.html")
}

function atracaoExemplo(req, res) {
    return res.status(200).sendFile(__dirname + "/public/atracao1.html")
}

export { home, ingressos, servirIngressos, servirIngressoPorId, atracoes, calendario, compra, atracaoExemplo }
