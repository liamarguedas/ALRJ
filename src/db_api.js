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
}
