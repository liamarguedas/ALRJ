import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const dbPath = "./db/cadastro.db";

app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connection:", err.message);
  } else {
    console.log("very good");
  }
});


// puxar municipios ---------------------------------------
app.get("/municipios", (req, res) => {
  const sql = "SELECT * FROM Municipios";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});
// ------------------------------------------------------


// adicionar anotacao ------------------------------
app.post("/anotacoes", (req,res) => {
  const {municipio_id, profile_id, anotacao} = req.body;
  const sql = `
  INSERT INTO Anotacoes (municipio_id, profile_id, anotacao)
  VALUES (?, ?, ?)
`;

const params = [municipio_id, profile_id, anotacao];
db.run(sql, params, function(err){
  if(err){
    res.status(400).json({error: err.message});

    return;
  }
  res.json({
    message: "anotação salva com sucesso !",
    data:{ anotacao_id: this.lastID,municipio_id, profile_id, anotacao }
   });
 });
});
// -----------------------------------------------

