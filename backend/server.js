require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// Rota para teste
app.get("/", (req, res) => {
    res.send("API Amigo Fiel funcionando 🚀");
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");

const express = require("express");
const db = require("./connectdb");

const app = express();
const PORT = 3000;

// vendo a conexão com o bd
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conexão bem-sucedida com MySQL!");
    connection.release();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

});


