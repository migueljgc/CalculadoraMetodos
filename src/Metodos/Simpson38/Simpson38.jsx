import React from 'react'
import '../Metodos.css'

function Simpson38() {
  return (
    < div className='container'>
      <div className='metodo'>
        <h1>Calculadora Simpson 3/8</h1>
        <p>F(X)</p>
        <input type="text" />
        <p>a</p>
        <input type="text" />
        <p>b</p>
        <input type="text" />
        <button>Calcular</button>
      </div>
      <div className='Resultados'>
        <h1>Resultado</h1>
        <label htmlFor=""></label>
        <p>Grafica</p>
        <div>

        </div>
      </div>
      </div>
  )
}

export default Simpson38