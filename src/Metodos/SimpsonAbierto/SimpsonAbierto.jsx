import React from 'react'
import '../Metodos.css'
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
const convertirALatex = (expr) => {
  try {
    return parse(expr).toTex();
  } catch (err) {
    console.error("Error al convertir a LaTeX:", err);
    return '';
  }
};
function SimpsonAbierto() {
  const [funcion, setFuncion] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(null);
  const [graficaData, setGraficaData] = useState([]);
  const [tablaIteracion, setTablaIteracion] = useState([]);

  const calcularSimpsonAbierto = async () => {
    try {
      // Validación mínima
      if (!funcion || isNaN(a) || isNaN(b) || isNaN(n)) {
        alert('Completa todos los campos correctamente');
        return;
      }

const funcionLatex = convertirALatex(funcion);
      console.log('Función LaTeX:', funcionLatex);
      const response = await fetch("https://flask-hello-world2-red.vercel.app/simpson_abierto", {

        method: "POST", body: JSON.stringify({
          "a": Number(a),
          "b": Number(b),
          "formato": "latex",
          "funcion": funcionLatex,
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
      console.error('Error al calcular la integral:', err);
      setResultado(null);
    }
  };
  return (
      <>
      <div className="botones-funciones">
        <button onClick={() => setFuncion(funcion + 'log(x)')}>log</button>
        <button onClick={() => setFuncion(funcion + 'sin(x)')}>sin</button>
        <button onClick={() => setFuncion(funcion + 'cos(x)')}>cos</button>
        <button onClick={() => setFuncion(funcion + '^')}>^</button>
        <button onClick={() => setFuncion(funcion + 'sqrt(x)')}>√</button>
        <button onClick={() => setFuncion(funcion + 'e^x')}>e^x</button>
      </div> 
    < div className='container'>
      <div className='metodo'>
        <h1>Calculadora Simpson Abierto</h1>
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
        <p>N</p>
        <input type="input" name="" id="" value={n} onChange={(e) => setN(e.target.value)} placeholder='Debe ser numero par 2,4,6,8,10...' />

        <button className='btn-calcular' onClick={calcularSimpsonAbierto}>Calcular</button>
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
    </>
  )
}

export default SimpsonAbierto