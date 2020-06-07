//importação da dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()
// verbose dá mensagens de aviso no terminal

// criar o objeto que fará operações no db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto db para operações
 db.serialize(() => {
    // com comandos sql:
    // criar tabela:
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // inserir dados
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        'https://images.unsplash.com/photo-1567177172939-9b0ee9d116d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        'Colectoria',
        'Guilherme Gemballa, Jardim América',
        'n° 260',
        'Santa Catarina',
        'Rio do Sul',
        'Resíduos eletrônicos, Lâmpadas'
    ]
    
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)


    // consultar dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    /* deletar dados (nao vamos, só como faz)
     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    }) */
}) 