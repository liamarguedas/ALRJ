import React, { useEffect } from 'react';
import './MapaRJ.css';

const MapaRJ = () => {
  useEffect(() => {
    // Carregar o SVG usando fetch
    fetch('/Mapa_do_IDH_do_Rio_de_Janeiro_(2010).svg')
      .then(response => response.text())
      .then(svgContent => {
        // Inserir o conteúdo do SVG diretamente no DOM
        const svgContainer = document.getElementById('svg-container');
        svgContainer.innerHTML = svgContent;

        // Selecionar o documento SVG
        const svgElement = svgContainer.querySelector('svg');
        
        svgElement.querySelectorAll('.region').forEach((region, index) => {
          // Calcular a posição central da região
          const bbox = region.getBBox();
          const x = bbox.x + bbox.width / 2;
          const y = bbox.y + bbox.height / 2 + 4;

          // Criar o elemento de texto e posicioná-lo
          const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textElement.setAttribute('x', x);
          textElement.setAttribute('y', y);
          textElement.setAttribute('class', 'number');
          textElement.textContent = index + 1;

          svgElement.appendChild(textElement);

          // Adicionar interatividade de clique à região
          region.addEventListener('click', function () {
            this.classList.toggle('active');
          });
        });
      })
      .catch(error => {
        console.error('Erro ao carregar o SVG:', error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Mapa Interativo do Rio de Janeiro</h1>
      <div id="svg-container"></div>
    </div>
  );
};

export default MapaRJ;
