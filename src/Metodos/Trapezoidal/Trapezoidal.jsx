import React from 'react'
import '../Metodos.css'
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';

function Trapezoidal() {
  const [funcion, setFuncion] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(null);
  const [graficaData, setGraficaData] = useState([]);
  const [tablaIteracion, setTablaIteracion] = useState([]);
  function convertirLatexAMathJS(exprLatex) {
  return exprLatex
    .replace(/\\exp\(([^)]+)\)/g, 'exp($1)')
    .replace(/\\ln\(([^)]+)\)/g, 'log($1)')
    .replace(/\\log\(([^)]+)\)/g, 'log10($1)')
    .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
    .replace(/\\cdot/g, '*')
    .replace(/\^/g, '**') // opcional, solo si estás usando `**` en vez de `^` en Math.js
}


  const calcularTrapezoidal = async () => {
    try {
      // Validación mínima
      if (!funcion || isNaN(a) || isNaN(b) || isNaN(n)) {
        alert('Completa todos los campos correctamente');
        return;
      }


      const response = await fetch("https://flask-hello-world2-red.vercel.app/trapecio", {

        method: "POST", body: JSON.stringify({
          "a": Number(a),
          "b": Number(b),
          "formato": "latex",
          "funcion": funcion,
          "n": Number(n),
        }),

        headers: {
          "Content-Type": "application/json"
        }

      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Error al calcular');
      }


      setResultado(data);
      console.log('Resultado:', data);
      setTablaIteracion(data.tabla_iteracion);
      const expresionMathJS = convertirLatexAMathJS(funcion);

      // Preparar datos para graficar
      const expr = parse(expresionMathJS);
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
      console.error('Error al calcular la integral:', err);
      setResultado(null);
    }
  };
  return (
    < div className='container'>
      <div className='metodo'>
        <h1>Calculadora Trapezoidal</h1>
        <p>F(X)</p>
        <input type="input" placeholder="Ej: x^2 + 2*x + 1"  value={funcion}
          onChange={(e) => setFuncion(e.target.value)}/>
        <p>A</p>
        <input type="input" placeholder="Límite inferior" value={a}
          onChange={(e) => setA(e.target.value)}/>
        <p>B</p>
        <input type="input" placeholder="Límite superior" value={b} onChange={(e)=> setB(e.target.value)}/>
        <p>N</p>
        <input type="input" name="" id="" placeholder='1,2,3,4,5,6,7,8,9' value={n} onChange={(e)=> setN(e.target.value)}/>
        <button className='btn-calcular' onClick={calcularTrapezoidal}>Calcular</button>
      </div>
      <div className='Resultados'>
        <h1>Resultado</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}


        {resultado && (
          <>
            <label>Resultado de la integral:</label>
            <p>{resultado.resultado}</p>




          </>
        )}
        {tablaIteracion && (
          <>
            <label>Tabla de iteracion:</label>
            <table>
              <thead>
                <tr>
                  <th>X</th>
                  <th>f(x)</th>
                </tr>
              </thead>
              <tbody>
                {tablaIteracion.map((iteracion, index) => (
                  <tr key={index}>
                    <td>{iteracion.xi}</td>
                    <td>{iteracion["f(xi) * coef"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  )
}

export default Trapezoidal