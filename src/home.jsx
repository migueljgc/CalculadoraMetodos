import { useState } from 'react'
import './home.css'
import JorgeBoole from './Metodos/JorgeBoole/JorgeBoole.jsx';


function Home() {
const [metodoActivo, setMetodoActivo] = useState('boole'); // ← por defecto Boole

  const handleClick = (metodo) => {
    setMetodoActivo(metodo);
  };

  return (
    <>
      <div className="home">
        <header className="">
          <div>
            <h1 className="">
              Calculadora <br /> Metodos Numericos
            </h1>
          </div>
          <nav className="">
            <a className="metodos" onClick={() => handleClick('boole')}>Jorge Boole</a>
            <a className="metodos" onClick={() => handleClick('abierto')}>Simpson Abierto</a>
            <a className="metodos" onClick={() => handleClick('simpson13')}>Simpson 1/3</a>
            <a className="metodos" onClick={() => handleClick('simpson38')}>Simpson 3/8</a>
            <a className="metodos" onClick={() => handleClick('trapezoidal')}>Trapezoidal</a>
          </nav>
        </header>
      </div>
       <div className="modal-container">
        {metodoActivo === 'boole' && <JorgeBoole  />}
      </div>
     
    </>
  )
}

export default Home
