import sqlite3 from "sqlite3";

export default class Database {
  constructor(db) {
    this.db = new sqlite3.Database(db);
  }
  addProfile(profile) {
    this.db.run("INSERT INTO Profiles (profile_name) VALUES ?", profile);
  }
  deleteProfile(profile) {
    this.db.run(`DELETE FROM Profiles WHERE profile_name = ?`, profile);
  }
  insertAnotacao(anotacao, profile, municipio) {
    this.db.run(
      `INSERT INTO Anotacoes (municipio_id, profile_id, anotacao) VALUES (?, ?, ?)`,
      [municipio, profile, municipio],
    );
  }
  deleteAnotacao(id) {
    this.db.run(`DELETE FROM Anotacoes WHERE anotacao_id = ?`, id);
  }
  insertCadastro(profile, municipio) {
    this.db.run(
      `INSERT INTO Cadastro (profile_id, municipio_id) VALUES (?, ?)`,
      [profile, municipio],
    );
  }
  deleteCadastro(id) {
    this.db.run(`DELETE FROM Cadastro WHERE cadastro_id = ?`, id);
  }
}
