const express = require("express");
const cors = require("cors");
const db = require("./connectdb");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// TESTE DE CONEXÃO

db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conexão bem-sucedida com MySQL!");
    connection.release();
});

// AQUI ABAIXCO É PARA O DONO

// Criar um dono
app.post("/donos", (req, res) => {
    const { nome_completo, cpf, email, telefone, endeerço } = req.body;
    const sql = `INSERT INTO dono (nome_completo, cpf, email, telefone, endeerço) 
                 VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [nome_completo, cpf, email, telefone, endeerço], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar dono:", err);
            res.status(500).json({ error: "Erro ao cadastrar dono" });
            return;
        }
        res.status(201).json({ message: "Dono cadastrado com sucesso!", id: result.insertId });
    });
});

// Listar donos
app.get("/donos", (req, res) => {
    db.query("SELECT * FROM dono", (err, results) => {
        if (err) {
            console.error("Erro ao buscar donos:", err);
            res.status(500).json({ error: "Erro ao buscar donos" });
            return;
        }
        res.json(results);
    });
});

// Buscar dono por ID
app.get("/donos/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM dono WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar dono:", err);
            res.status(500).json({ error: "Erro ao buscar dono" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Dono não encontrado" });
            return;
        }
        res.json(results[0]);
    });
});

// Atualizar dono
app.put("/donos/:id", (req, res) => {
    const { id } = req.params;
    const { nome_completo, cpf, email, telefone, endeerço } = req.body;
    const sql = `UPDATE dono SET nome_completo = ?, cpf = ?, email = ?, telefone = ?, endeerço = ? 
                 WHERE id = ?`;
    db.query(sql, [nome_completo, cpf, email, telefone, endeerço, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar dono:", err);
            res.status(500).json({ error: "Erro ao atualizar dono" });
            return;
        }
        res.json({ message: "Dono atualizado com sucesso!" });
    });
});

// Deletar dono
app.delete("/donos/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM dono WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar dono:", err);
            res.status(500).json({ error: "Erro ao deletar dono" });
            return;
        }
        res.json({ message: "Dono deletado com sucesso!" });
    });
});


/// A PARTIR DAQUI É PARA OS PETS

// Criar pet
app.post("/pets", (req, res) => {
    const { id_dono, nome_pet, especie, raça, data_nascimento, observaçôes } = req.body;
    const sql = `INSERT INTO pet (id_dono, nome_pet, especie, raça, data_nascimento, observaçôes) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [id_dono, nome_pet, especie, raça, data_nascimento, observaçôes], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar pet:", err);
            res.status(500).json({ error: "Erro ao cadastrar pet" });
            return;
        }
        res.status(201).json({ message: "Pet cadastrado com sucesso!", id: result.insertId });
    });
});

// Listar pets
app.get("/pets", (req, res) => {
    db.query("SELECT * FROM pet", (err, results) => {
        if (err) {
            console.error("Erro ao buscar pets:", err);
            res.status(500).json({ error: "Erro ao buscar pets" });
            return;
        }
        res.json(results);
    });
});

// Buscar pet por ID
app.get("/pets/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM pet WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar pet:", err);
            res.status(500).json({ error: "Erro ao buscar pet" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Pet não encontrado" });
            return;
        }
        res.json(results[0]);
    });
});

// Atualizar pet
app.put("/pets/:id", (req, res) => {
    const { id } = req.params;
    const { id_dono, nome_pet, especie, raça, data_nascimento, observaçôes } = req.body;
    const sql = `UPDATE pet 
                SET id_dono = ?, nome_pet = ?, especie = ?, raça = ?, data_nascimento = ?, observaçôes = ? 
                WHERE id = ?`;
    db.query(sql, [id_dono, nome_pet, especie, raça, data_nascimento, observaçôes, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar pet:", err);
            res.status(500).json({ error: "Erro ao atualizar pet" });
            return;
        }
        res.json({ message: "Pet atualizado com sucesso!" });
    });
});

// Deletar pet
app.delete("/pets/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM pet WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar pet:", err);
            res.status(500).json({ error: "Erro ao deletar pet" });
            return;
        }
        res.json({ message: "Pet deletado com sucesso!" });
    });
});

//SUBINDO O SERVIDOR

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
