import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const dbPromise = open({
    filename: './database/ingressos.db',
    driver: sqlite3.Database
});

async function criarTabelas() {
    const db = await dbPromise;

    // Tabela de tipos de ingresso
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tipos_ingresso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            desc TEXT NOT NULL,
            altura TEXT NOT NULL,
            acesso_todas_atracoes INTEGER NOT NULL CHECK (acesso_todas_atracoes IN (0, 1)),
            caminho_img TEXT NOT NULL
        );
    `);
}

criarTabelas();

export { dbPromise };
