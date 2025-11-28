import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import RelacionaPlurales from "../componentes/RelacionaPlurales";

export default function JuegoRelacionaPluralesPage() {
  return (
    <div>
      <Header />

      <div className="page-juego">
        

        <div className="juego-container">
          <RelacionaPlurales />
        </div>
      </div>

      <Footer />
    </div>
  );
}
