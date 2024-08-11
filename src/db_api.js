import sqlite3 from "sqlite3";

export default class Database {
  constructor(db) {
    this.db = new sqlite3.Database(db);
  }

  createTables() {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXIST Profiles (profile_id INTEGER PRIMARY KEY AUTOINCREMENT, profile_name TEXT NOT NULL, created DATETIME DEFAULT CURRENT_TIMESTAMP)");
      this.db.run("CREATE TABLE IF NOT EXIST Municipios (municipio_id INTEGER PRIMARY KEY AUTOINCREMENT, municipio_name TEXT NOT NULL, created DATETIME DEFAULT CURRENT_TIMESTAMP)");
      this.db.run("CREATE TABLE IF NOT EXIST Anotacoes (anotacao_id INTEGER PRIMARY KEY AUTOINCREMENT, municipio_id INTEGER NOT NULL, profile_id INTEGER NOT NULL, anotacao TEXT NOT NULL, created DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (municipio_id) REFERENCES Municipios (municipio_id), FOREIGN KEY (profile_id) REFERENCES Profiles (profile_id)");
);
    });
  }

}
