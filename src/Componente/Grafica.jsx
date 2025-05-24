import React from 'react';
import Plot from 'react-plotly.js';

const Grafica = ({ puntos, funcion }) => {
  // Preparar datos para la gráfica
  const x = puntos.map((p) => p.x);
  const y = puntos.map((p) => p.y);

  return (
    <div style={{ minHeight: '400px', padding: '20px' }}>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            name: 'f(x)',
            line: { color: 'royalblue', width: 2 },
            fill: 'tozeroy',
            fillcolor: 'rgba(65, 105, 225, 0.2)',
          }
        ]}
        layout={{
          title: {
            text: `Área bajo la curva f(x) = ${funcion}`,
            font: {
              size: 20,
              family: 'Arial, sans-serif',
              color: '#333',
            }
          },
          xaxis: {
            title: 'x',
            showgrid: true,
            gridcolor: '#e0e0e0',
          },
          yaxis: {
            title: 'f(x)',
            showgrid: true,
            gridcolor: '#e0e0e0',
          },
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          font: {
            family: 'Arial, sans-serif',
            size: 14,
            color: '#444',
          },
          margin: {
            l: 60,
            r: 30,
            b: 50,
            t: 60,
            pad: 10
          },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
      />
    </div>
  );
};

export default Grafica;
