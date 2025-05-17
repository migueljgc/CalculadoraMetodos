import React from 'react'
import '../Metodos.css'

function Trapezoidal() {
  return (
    < div className='container'>
      <div className='metodo'>
        <h1>Calculadora Trapezoidal</h1>
        <p>F(X)</p>
        <input type="input" placeholder="Ej: x^2 + 2*x + 1"/>
        <p>A</p>
        <input type="input" placeholder="Límite inferior" />
        <p>B</p>
        <input type="input" placeholder="Límite superior" />
        <p>N</p>
        <input type="input" name="" id="" placeholder='1,2,3,4,5,6,7,8,9'/>
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

export default Trapezoidal