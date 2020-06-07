const express = require("express") //chamando o express e guardando na var
const server = express()

//pegar o db para a aplicação poder usar
const db = require("./database/db")

// config pasta public para ele achar os css e scripts
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, 
    noCache: true
})


//configurar caminho da aplicação
//página inicial
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um título"})

})
// rotas para as outras páginas
server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do form
    // console.log(req.body)

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
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]
    
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
  
})


server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }
    

    // dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        // mostrar a página html com os dados do db
        return res.render("search-results.html", {places: rows, total: total})
    })

    
})

//ligar o servidor
server.listen(3000)
