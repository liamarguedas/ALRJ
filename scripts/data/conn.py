import sqlite3
import os
from pathlib import Path


BASE_DIR = Path(__file__).parents[2] 
DB_NAME = "cadastro.db"
print(BASE_DIR)

def main():

    try:
        db = BASE_DIR / "db" / DB_NAME
        conn = sqlite3.connect(db)

    except sqlite3.Error as error:
        print("Failed to read data from sqlite table", error)
    
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
        created DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    '''

    create_cadastro_table = '''
    CREATE TABLE IF NOT EXISTS Cadastro (
        cadastro_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_id INTEGER NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES Profiles (profile_id)
    );
    '''

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

    # Execute the SQL commands
    cursor.execute(create_profiles_table)
    cursor.execute(create_municipios_table)
    cursor.execute(create_cadastro_table)
    cursor.execute(create_anotacoes_table)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()



if __name__ == "__main__":
    main()
