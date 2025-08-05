import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const dbPromise = open({
    filename: './database/sundown.db',
    driver: sqlite3.Database
});

async function criarTabelas() {
    const db = await dbPromise;

    await db.exec('PRAGMA foreign_keys = ON;');

    await db.exec(`
        CREATE TABLE IF NOT EXISTS meses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ano INTEGER NOT NULL,
            nome TEXT NOT NULL,
            total_dias INTEGER NOT NULL,
            inicio_semana TEXT NOT NULL,
            UNIQUE(ano, nome)
        );

        CREATE TABLE IF NOT EXISTS dias_operacao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dia INTEGER NOT NULL,
            status TEXT NOT NULL,
            mes_id INTEGER NOT NULL,
            FOREIGN KEY (mes_id) REFERENCES meses(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS datas_especiais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao TEXT NOT NULL,
            mes_id INTEGER NOT NULL,
            FOREIGN KEY (mes_id) REFERENCES meses(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS tipos_ingresso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            precoAdulto REAL NOT NULL,
            precoInfantil REAL NOT NULL,
            desc TEXT NOT NULL,
            altura TEXT NOT NULL,
            acesso_todas_atracoes INTEGER NOT NULL,
            caminho_img TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS atracoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo_atracao TEXT NOT NULL UNIQUE,
            texto_atracao TEXT NOT NULL,
            caminho_img TEXT NOT NULL,
            texto_alt TEXT NOT NULL, 
            caminho_atracao TEXT
        );
    `);
}

criarTabelas();

export { dbPromise };
