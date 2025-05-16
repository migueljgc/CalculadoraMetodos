import { useState } from "react";
import "./home.css";
import JorgeBoole from "./Metodos/JorgeBoole/JorgeBoole.jsx";
import SimpsonAbierto from "./Metodos/SimpsonAbierto/SimpsonAbierto";
import Simpson13 from "./Metodos/Simpson13/Simpson13";
import Simpson38 from "./Metodos/Simpson38/Simpson38";
import Trapezoidal from "./Metodos/Trapezoidal/Trapezoidal";

function Home() {
  const [metodoActivo, setMetodoActivo] = useState("boole"); // ← por defecto Boole

  const handleClick = (metodo) => {
    setMetodoActivo(metodo);

  const hamburguesa = document.querySelector("#hamburguer");
  const enlaces = document.querySelector("#nav-links");

  hamburguesa.addEventListener("click", () => {
    enlaces.classList.toggle("show");
  });
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
            <ul className="nav-links" id="nav-links">
              <a className="metodos" onClick={() => handleClick("boole")}>
                Jorge Boole
              </a>
              <a className="metodos" onClick={() => handleClick("abierto")}>
                Simpson Abierto
              </a>
              <a className="metodos" onClick={() => handleClick("simpson13")}>
                Simpson 1/3
              </a>
              <a className="metodos" onClick={() => handleClick("simpson38")}>
                Simpson 3/8
              </a>
              <a className="metodos" onClick={() => handleClick("trapezoidal")}>
                Trapezoidal
              </a>
              <div className="hamburguer" id="hamburguer">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </ul>
          </nav>
        </header>
      </div>
      <div className="modal-container">
        {metodoActivo === "boole" && <JorgeBoole />}
        {metodoActivo === "abierto" && <SimpsonAbierto />}
        {metodoActivo === "simpson13" && <Simpson13 />}
        {metodoActivo === "simpson38" && <Simpson38 />}
        {metodoActivo === "trapezoidal" && <Trapezoidal />}
      </div>
    </>
  );
}

export default Home;
