import pandas as pd
import json

def main():
    """_"""
    with open("./municipios.json", encoding="utf-8") as file:
        json_file = json.load(file)
    
    columns = ["municipio_id", "municipio_name", "municipio_zona"]
    ZONA_CENTRAL = json_file["Zona Central"]
    ZONA_SUL = json_file["Zona Sul"]
    ZONA_OESTE = concatenate_multiple_bairros("Zona Oeste", json_file)
    ZONA_NORTE = concatenate_multiple_bairros("Zona Norte", json_file)
    ZONE = create_zone_column([ZONA_CENTRAL, ZONA_SUL, ZONA_OESTE, ZONA_NORTE], json_file.keys())
    BAIRRO = create_bairro_column([ZONA_CENTRAL, ZONA_SUL, ZONA_OESTE, ZONA_NORTE])

    data = pd.DataFrame()
    data[columns[0]] = [id + 1 for id in range(len(BAIRRO))]
    data[columns[1]] = BAIRRO
    data[columns[2]] = ZONE

    data.to_csv("./modeled_municipios.csv", index=False)

def concatenate_multiple_bairros(zona, file):
    bairros = list()
    
    for bairro in file[zona].keys():
        
        bairros.extend(file[zona][bairro])

    return bairros

def create_bairro_column(zones):
    
    bairro_column = list()
    for zone in zones:
        bairro_column.extend(zone)
        
    return bairro_column

def create_zone_column(zones, zones_name):
    zone_column = list()
    for index, name in enumerate(zones_name):
        zone_column.extend([name] * len(zones[index]))
    return zone_column


if __name__ == "__main__":
    main();
