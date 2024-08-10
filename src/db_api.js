import sqlite3 from "sqlite3";

export default class Database {
  constructor(db) {
    this.db = new sqlite3.Database(db);
  }

  createTables() {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS )");
    });
  }
}
