import React, { useState } from 'react';
import Header from '../componentes/Header'; 
import Footer from '../componentes/Footer';
import CuentoDetalle from './CuentoDetalle'; 

import "../Style/Cuentos.css";

const data = [
  {
    categoria: "Animales Cuentos y Fabulas",
    cuentos: [
      { id: "liebre-tortuga", titulo: "La Liebre y la Tortuga", imagen: "../imagenCuentos/laliebreylatortuga.jpeg" },
      { id: "leon-raton", titulo: "El León y el Ratón", imagen: "../imagenCuentos/LeonyRaton.jpeg" },
      { id: "cigarra-hormiga", titulo: "La Cigarra y la Hormiga", imagen: "../imagenCuentos/cigarra-hormiga.jpeg" },
      { id: "patito-feo", titulo: "El Patito Feo", imagen: "../imagenCuentos/PatitoFeo.jpeg" }
    ]
  },
  {
    categoria: "Princesas",
    cuentos: [
      { id: "bella-durmiente", titulo: "La Bella Durmiente", imagen: "../imagenCuentos/bella-durmiente.jpeg" },
      { id: "cenicienta", titulo: "Cenicienta", imagen: "../imagenCuentos/cenicienta.jpeg" },
      { id: "rapunzel", titulo: "Rapunzel", imagen: "../imagenCuentos/rapunzel.jpeg" },
      { id: "princesa-guisante", titulo: "La Princesa y el Guisante", imagen: "../imagenCuentos/princesa-guisante.jpeg" }
    ]
  },
  {
    categoria: "Clásicos",
    cuentos: [
      { id: "caperucita", titulo: "Caperucita Roja", imagen: "../imagenCuentos/caperucita.jpeg" },
      { id: "tres-cerditos", titulo: "Los Tres Cerditos", imagen: "../imagenCuentos/cerditos.jpeg" },
      { id: "hansel-gretel", titulo: "Hansel y Gretel", imagen: "../imagenCuentos/hansel-gretel.jpeg" },
      { id: "blancanieves", titulo: "Blancanieves", imagen: "../imagenCuentos/blancanieves.jpeg" }
    ]
  },
  {
    categoria: "Para Dormir",
    cuentos: [
      { id: "gigante-nubes", titulo: "El Gato que Contaba Nubes", imagen: "../imagenCuentos/nubes-gato.jpeg" }, 
      { id: "linterna-magica", titulo: "La Linterna Mágica", imagen: "../imagenCuentos/linterna.jpeg" },
      { id: "arbol-secretos", titulo: "El Árbol que Guardaba Secretos", imagen: "../imagenCuentos/arbol.jpeg" },
      { id: "pluma-sueno", titulo: "Ricitos de oro y los tres osos", imagen: "../imagenCuentos/ricitos.jpeg" }
    ]
  }
];

export default function Cuentos() {
  
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  if (idSeleccionado) {
    return (
      <>
        <Header />
        <CuentoDetalle 
           id={idSeleccionado} 
           volver={() => setIdSeleccionado(null)} 
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="cuentos-page-wrapper"> 
        <div className="cuentos-header-block"> 
          <h1 className="cuentos-titulo-principal">Biblioteca de Cuentos</h1>
          <img 
            src="./imagenCuentos/seccioncuento.png" 
            alt="Saltamontes feliz saltando" 
            className="cuentos-mascota-float"
          />
        </div>

        <p className="cuentos-descripcion-texto"> 
          Explorá esta hermosa colección de cuentos llenos de aventuras, magia,
          animales y personajes inolvidables. Elegí una categoría y descubrí
          historias divertidas y educativas pensadas especialmente para los más pequeños.
        </p>

        {data.map((cat) => (
          <div key={cat.categoria} className="cuentos-categoria-bloque">
            <h2 className="cuentos-categoria-titulo">{cat.categoria}</h2>

            <div className="cuentos-grid-container">
              {cat.cuentos.map((cuento) => (
                <button
                  key={cuento.id}
                  className="cuentos-item-card"
                  onClick={() => setIdSeleccionado(cuento.id)}
                >
                  <img src={cuento.imagen} alt={cuento.titulo} className="cuentos-item-img" /> 
                  <p className="cuentos-item-nombre">{cuento.titulo}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
      
    </>
  );
}