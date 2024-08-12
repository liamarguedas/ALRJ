import sqlite3
import pandas as pd
import json
from pathlib import Path

BASE_DIR = Path(__file__).parents[2]
DB_NAME = "cadastro.db"

def main():
    """_"""

    db = BASE_DIR / "db" / DB_NAME
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    create_profiles_table = '''
    CREATE TABLE IF NOT EXISTS Profiles (
        profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_name TEXT NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    '''

    create_municipios_table = '''
    CREATE TABLE IF NOT EXISTS Municipios (
        municipio_id INTEGER PRIMARY KEY AUTOINCREMENT,
        municipio_name TEXT NOT NULL,
        municipio_zona TEXT NOT NULL
    );
    '''

    # create_cadastro_table = '''
    # CREATE TABLE IF NOT EXISTS Cadastro (
    #     cadastro_id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     profile_id INTEGER NOT NULL,
    #     created DATETIME DEFAULT CURRENT_TIMESTAMP,
    #     FOREIGN KEY (profile_id) REFERENCES Profiles (profile_id)
    # );
    # '''

    create_anotacoes_table = '''
    CREATE TABLE IF NOT EXISTS Anotacoes (
        anotacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
        municipio_id INTEGER NOT NULL,
        profile_id INTEGER NOT NULL,
        anotacao TEXT NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (municipio_id) REFERENCES Municipios (municipio_id),
        FOREIGN KEY (profile_id) REFERENCES Profiles (profile_id)
    );
    '''

    cursor.execute(create_profiles_table)
    cursor.execute(create_municipios_table)
    # cursor.execute(create_cadastro_table)
    cursor.execute(create_anotacoes_table)

    insert_municipio(conn, cursor, *read_municipios())
    # Commit the changes and close the connection
    conn.commit()
    conn.close()

def read_municipios():
    """_"""
    data = pd.read_csv("../municipios/modeled_municipios.csv")
    return data["municipio_id"].to_list(), data["municipio_name"].to_list(), data["municipio_zona"].to_list()


def insert_municipio(conn, cursor, municipio_id, municipio_name, municipio_zona):
    """_"""
    insert_municipio_sql = '''
    INSERT INTO Municipios (municipio_id, municipio_name, municipio_zona)
    VALUES (?, ?, ?)
    '''
    cursor.execute(insert_municipio_sql, (municipio_id, municipio_name, municipio_zona))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    main()
