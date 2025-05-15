import React, { useState } from 'react';

const JorgeBoole = () => {
  const [funcion, setFuncion] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const calcularBoole = async () => {
    const body = {
      funcion,
      formato: 'python',
      a: parseFloat(a),
      b: parseFloat(b),
      n: 4 // debe ser múltiplo de 4
    };

    try {
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
        <input
          type="text"
          value={funcion}
          onChange={(e) => setFuncion(e.target.value)}
          placeholder="Ej: x^2 + 2*x + 1"
        />

        <p>a</p>
        <input
          type="text"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Límite inferior"
        />

        <p>b</p>
        <input
          type="text"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Límite superior"
        />

        <button onClick={calcularBoole}>Calcular</button>
      </div>

      <div className='Resultados'>
        <h1>Resultado</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {resultado && (
          <>
            <label>Resultado de la integral:</label>
            <p>{resultado.resultado}</p>
            <p>Parámetros usados:</p>
            <pre>{JSON.stringify(resultado.parametros, null, 2)}</pre>
          </>
        )}

        <p>Gráfica</p>
        <div>
          {/* Aquí puedes agregar la gráfica si deseas en el futuro */}
        </div>
      </div>
    </div>
  );
};

export default JorgeBoole;
