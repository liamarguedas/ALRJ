import React, { useEffect } from 'react';
import './MapaRJ.css';


const regioes = {
  "Zona Central": [
    "Bairro Imperial de São Cristóvão", "Benfica", "Caju", "Catumbi", "Centro", "Cidade Nova", "Estácio", 
    "Gamboa", "Glória", "Lapa", "Mangueira", "Paquetá", "Rio Comprido", "Santa Teresa", "Santo Cristo", 
    "Saúde", "Vasco da Gama"
  ],
  "Zona Sul": [
    "Botafogo", "Catete", "Copacabana", "Cosme Velho", "Flamengo", "Gávea", "Humaitá", "Ipanema", 
    "Jardim Botânico", "Lagoa", "Laranjeiras", "Leblon", "Leme", "Rocinha", "São Conrado", "Urca", "Vidigal"
  ],
  "Zona Oeste": {
    "Barra da Tijuca e Baixada de Jacarepaguá": [
      "Anil", "Barra da Tijuca", "Camorim", "Cidade de Deus", "Curicica", "Freguesia de Jacarepaguá", 
      "Gardênia Azul", "Grumari", "Itanhangá", "Jacarepaguá", "Joá", "Praça Seca", "Pechincha", 
      "Recreio dos Bandeirantes", "Tanque", "Taquara", "Vargem Grande", "Vargem Pequena", "Vila Valqueire"
    ],
    "Grande Bangu": [
      "Bangu", "Deodoro", "Gericinó", "Jardim Sulacap", "Magalhães Bastos", "Padre Miguel", "Realengo", 
      "Santíssimo", "Senador Camará", "Vila Kennedy", "Vila Militar"
    ],
    "Barra de Guaratiba": [
      "Campo Grande", "Cosmos", "Guaratiba", "Inhoaíba", "Paciência", "Pedra de Guaratiba", "Santa Cruz", 
      "Senador Vasconcelos", "Sepetiba"
    ]
  },
  "Zona Norte": {
    "Grande Tijuca": [
      "Alto da Boa Vista", "Andaraí", "Grajaú", "Maracanã", "Praça da Bandeira", "Tijuca", "Vila Isabel"
    ],
    "Grande Méier": [
      "Abolição", "Água Santa", "Cachambi", "Del Castilho", "Encantado", "Engenho de Dentro", "Engenho Novo", 
      "Higienópolis", "Jacaré", "Jacarezinho", "Lins de Vasconcelos", "Manguinhos", "Maria da Graça", "Méier", 
      "Piedade", "Pilares", "Riachuelo", "Rocha", "Sampaio", "São Francisco Xavier", "Todos os Santos"
    ],
    "Ilha do Governador e Zona da Leopoldina": [
      "Bonsucesso", "Bancários", "Cacuia", "Cidade Universitária", "Cocotá", "Freguesia", "Galeão", 
      "Jardim Carioca", "Jardim Guanabara", "Maré", "Moneró", "Olaria", "Pitangueiras", "Portuguesa", 
      "Praia da Bandeira", "Ramos", "Ribeira", "Tauá", "Zumbi"
    ],
    "Outras Zonas": [
      "Acari", "Anchieta", "Barros Filho", "Bento Ribeiro", "Brás de Pina", "Campinho", "Cavalcanti", 
      "Cascadura", "Coelho Neto", "Colégio", "Complexo do Alemão", "Cordovil", "Costa Barros", "Engenheiro Leal", 
      "Engenho da Rainha", "Guadalupe", "Honório Gurgel", "Inhaúma", "Irajá", "Jardim América", "Madureira", 
      "Marechal Hermes", "Oswaldo Cruz", "Parada de Lucas", "Parque Anchieta", "Parque Colúmbia", "Pavuna", 
      "Penha", "Penha Circular", "Quintino Bocaiuva", "Ricardo de Albuquerque", "Rocha Miranda", "Tomás Coelho", 
      "Turiaçu", "Vaz Lobo", "Vicente de Carvalho", "Vigário Geral", "Vila da Penha", "Vila Kosmos", "Vista Alegre"
    ]
  }
};

// cria lista dos bairros
const criarListaRegioes = (json) => {
  const lista = [];
  Object.entries(json).forEach(([zona, regioes]) => {
    if (Array.isArray(regioes)) {
      lista.push(...regioes);
    } else {
      Object.values(regioes).forEach((subregioes) => {
        lista.push(...subregioes);
      });
    }
  });
  return lista;
};
// -----------------------------------------------

const MapaRJ = () => {
  const listaRegioes = criarListaRegioes(regioes);

  useEffect(() => {
    fetch('/Mapa_do_IDH_do_Rio_de_Janeiro_(2010).svg')
      .then(response => response.text())
      .then(svgContent => {
        const svgContainer = document.getElementById('svg-container');
        svgContainer.innerHTML = svgContent;
        const svgElement = svgContainer.querySelector('svg');

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);

        const regions = Array.from(svgElement.querySelectorAll('.region'));
        regions.forEach((region, index) => {
          const regionName = listaRegioes[index] || "Região Desconhecida";

          region.addEventListener('mouseover', function (event) {
            tooltip.textContent = regionName;
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
          });

          region.addEventListener('mouseout', function () {
            tooltip.style.display = 'none';
          });

          region.addEventListener('click', function () {
            this.classList.toggle('active');
          });
        });
      })
      .catch(error => {
        console.error('Erro ao carregar o SVG:', error);
      });
  }, );

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Mapa Interativo do Rio de Janeiro</h1>
      <div id="svg-container"></div>
    </div>
  );
};

export default MapaRJ;
