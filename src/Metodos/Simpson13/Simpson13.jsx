import React from 'react'
import '../Metodos.css'

function Simpson13() {
  return (
    < div className='container'>
      <div className='metodo'>
        <h1>Calculadora Simpson 1/3</h1>
        <p>F(X)</p>
        <input type="input" placeholder="Ej: x^2 + 2*x + 1"/>
        <p>A</p>
        <input type="input" placeholder="Límite inferior" />
        <p>B</p>
        <input type="input" placeholder="Límite superior" />
        <button className='btn-calcular'>Calcular</button>
      </div>
      <div className='Resultados'>
        <h1>Resultado</h1>
        <label htmlFor=""></label>
        <p>Gráfica de la funcion</p>
        <div className='Grafica'>
        </div>
      </div>
      </div>
  )
}

export default  Simpson13