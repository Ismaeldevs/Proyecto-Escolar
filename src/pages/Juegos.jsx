import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import "../style/juegos.css";

export default function Juegos() {
  const navigate = useNavigate();

  // Datos originales recuperados
  const juegos = [
    {
      id: 1,
      titulo: "Juego de Memoria",
      descripcion: "Encuentra las parejas lo más rápido posible.",
      ruta: "/juegodememoria",
      imagen: "/images/Gemini_Generated_Image_g3pnqgg3pnqgg3pn.png",
    },
    {
      id: 2,
      titulo: "Abecedario Desordenado",
      descripcion: "Responde preguntas y gana puntos.",
      ruta: "/juegoabecedariodesordenado",
      imagen: "/images/AbcDesordenadoimgPrincipal.png",
    },
    {
      id: 3,
      titulo: "Clasificación de Objetos",
      descripcion: "Agrega cada objeto a su lugar.",
      ruta: "/juegoclasificacion",
      imagen: "/images/clasificacionPrincipal.png",
    },
    {
      id: 4,
      titulo: "Relaciona los Plurales",
      descripcion: "Une cada imagen con su plural correcto.",
      ruta: "/juegoplurales",
      imagen: "/images/RelacionaLasPluralesPrincipal.png",
    },
    {
      id: 5,
      titulo: "Atrapa al Topo",
      descripcion: "Haz clic en el topo antes de que desaparezca y gana estrellas.",
      ruta: "/juego-atrapa-al-topo",
      imagen: "/images/AtrapaaltopoPrincipal.png",
    },
    {
      id: 6,
      titulo: "Tren Numérico",
      descripcion: "Arrastra los vagones y ordénalos correctamente.",
      ruta: "/tren-numerico",
      imagen: "/images/TrenPrincipal.png",
    },
    {
      id: 7,
      titulo: "Rompecabezas de Vocales",
      descripcion: "Arma el rompecabezas de la vocal seleccionada.",
      ruta: "/rompecabezas",
      imagen: "/images/RompecabezasPrincipal.png",
    },
  ];

  return (
    <>
      <Header />

      <div className="juegos-page-pro">
        <div className="juegos-container-pro">
          <div className="juegos-header-row">
            <div className="titulo-wrapper">
              <h1>🎮 ¡A Jugar!</h1>
            </div>
            
            <img 
              src="./imagenmascota/seccionjuegos.png" 
              alt="Mascota Juegos" 
              className="juegos-mascota-pro" 
            />
          </div>

          <div className="juegos-grid-pro">
            {juegos.map((juego) => (
              <div 
                key={juego.id} 
                className="game-card-3d"
                onClick={() => navigate(juego.ruta)}
              >
                <div className="card-image-box">
                  <div className="overlay-play">▶</div>
                  <img src={juego.imagen} alt={juego.titulo} />
                </div>
                
                <div className="card-content">
                  <h3>{juego.titulo}</h3>
                  <p>{juego.descripcion}</p>
                  <button className="btn-jugar-pro">Jugar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};