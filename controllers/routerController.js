import { __dirname } from "../index.js"
import { dbPromise } from '../database/db.js'

// SERVIR PÁGINAS
function home(req, res) {
    return res.status(200).sendFile(__dirname + "/public/home.html")
}
function ingressos(req, res) {
    return res.status(200).sendFile(__dirname + "/public/ingressos.html")
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
// SERVIR DADOS
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
async function servirCalendario(req, res) {
    const db = await dbPromise;

    const sql = `
        SELECT
            m.ano,
            m.nome,
            m.total_dias AS totalDeDias,
            m.inicio_semana AS diaDaSemanaQueComeca,
            GROUP_CONCAT(CASE WHEN do.status = 'aberto' THEN do.dia END) as diasAbertos,
            GROUP_CONCAT(CASE WHEN do.status = 'a_confirmar' THEN do.dia END) as diasAConfirmarAbertura,
            (SELECT GROUP_CONCAT(de.descricao, ';') FROM datas_especiais de WHERE de.mes_id = m.id) as datasEspeciais
        FROM meses m
        LEFT JOIN dias_operacao do ON m.id = do.mes_id
        GROUP BY m.id
        ORDER BY m.ano, m.id
    `;

    const rows = await db.all(sql);

    const calendarioFinal = {};
    for (const row of rows) {
        if (!calendarioFinal[row.ano]) {
            calendarioFinal[row.ano] = {};
        }

        calendarioFinal[row.ano][row.nome] = {
            totalDeDias: row.totalDeDias,
            diaDaSemanaQueComeca: row.diaDaSemanaQueComeca,
            diasAbertos: row.diasAbertos ? row.diasAbertos.split(',').map(Number) : [],
            diasAConfirmarAbertura: row.diasAConfirmarAbertura ? row.diasAConfirmarAbertura.split(',').map(Number) : [],
            datasEspeciais: row.datasEspeciais ? row.datasEspeciais.split(';') : []
        };
    }

    return res.status(200).json(calendarioFinal)
}
async function servirAtracoes(req, res){
    const db = await dbPromise
    const dados = await db.all("SELECT * FROM atracoes")
    return res.status(200).json(dados)
}

export {home, ingressos, servirIngressos, servirIngressoPorId, atracoes, servirAtracoes, calendario, servirCalendario, compra, atracaoExemplo}
