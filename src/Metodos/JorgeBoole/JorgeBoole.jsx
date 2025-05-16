import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { evaluate, parse } from 'mathjs';

const JorgeBoole = () => {
  const [funcion, setFuncion] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [graficaData, setGraficaData] = useState([]);

  const calcularBoole = async () => {
    try {
      // Validación mínima
      if (!funcion || isNaN(a) || isNaN(b)) {
        alert('Completa todos los campos correctamente');
        return;
      }
      const body = {
        funcion,
        formato: 'python',
        a: parseFloat(a),
        b: parseFloat(b),
        n: 4 // debe ser múltiplo de 4
      };


      const response = await fetch('https://flask-hello-world2-red.vercel.app/boole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Error al calcular');
      }

      const data = await response.json();
      setResultado(data);
      // Preparar datos para graficar
      const expr = parse(funcion);
      const compiled = expr.compile();
      const puntosX = [];
      const puntosY = [];

      for (let x = parseFloat(a); x <= parseFloat(b); x += 0.1) {
        try {
          const y = compiled.evaluate({ x });
          puntosX.push(x);
          puntosY.push(y);
        } catch (e) {
          console.error('Error evaluando en x=', x, e);
        }
      }

      setGraficaData([{ x: puntosX, y: puntosY, type: 'scatter', mode: 'lines', marker: { color: 'blue' } }]);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResultado(null);
    }
  };

  return (
    <div className='container'>
      <div className='metodo'>
        <h1>Calculadora Jorge Boole</h1>

        <p>F(X)</p>
        <input className='input'
          type="text"
          value={funcion}
          onChange={(e) => setFuncion(e.target.value)}
          placeholder="Ej: x^2 + 2*x + 1"
        />

        <p>A</p>
        <input className='input'
          type="text"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Límite inferior"
        />

        <p>B</p>
        <input className='input'
          type="text"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Límite superior"
        />

        <button onClick={calcularBoole} className='btn-calcular'>Calcular</button>
      </div>

      <div className='Resultados'>
        <h1>Resultado</h1>

        {error && <p style={{ color: 'red' }}>{"Error al calcular"}</p>}

        {resultado && (
          <>
            <label>Resultado de la integral:</label>
            <p>{resultado.resultado}</p>
            <p>Parámetros usados:</p>
            <pre>{JSON.stringify(resultado.parametros, null, 2)}</pre>
          </>
        )}

        <p>Gráfica de la funcion</p>
        <div className='Grafica'>
          {graficaData.length > 0 && (
          <Plot
            data={graficaData}
            layout={{ title: 'f(x)', xaxis: { title: 'x' }, yaxis: { title: 'f(x)' } }}
            style={{ width: '100%', height: '400px' }}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default JorgeBoole;
