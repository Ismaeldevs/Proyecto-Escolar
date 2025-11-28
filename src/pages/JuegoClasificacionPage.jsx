import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import JuegoClasificacion from "../componentes/JuegoClasificacion";

export default function JuegoClasificacionPage() {
  return (
    <div>
      <Header />
      <div className="page-juego flex flex-col items-center p-4">
        
        <div className="juego-container w-full flex justify-center">
          <JuegoClasificacion />
        </div>
      </div>
      <Footer />
    </div>
  );
}
