import React, { useEffect } from 'react';
import './MapaRJ.css';

const MapaRJ = () => {
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

        svgElement.querySelectorAll('.region').forEach((region, index) => {
          // Definir um nome fictício para cada região
          region.setAttribute('data-name', `Região ${index + 1}`);

          region.addEventListener('mouseover', function (event) {
            tooltip.textContent = this.getAttribute('data-name');
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
          });

          region.addEventListener('mouseout', function () {
            tooltip.style.display = 'none';
          });

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
