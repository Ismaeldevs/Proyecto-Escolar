import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Abecedario from "../componentes/JuegoAbecedarioDesordenado"; 

export default function AbecedarioPage() {
  return (
    <div>
      <Header />
      <div className="page-juego">
        <div className="juego-container">
          <Abecedario />
        </div>
      </div>
      <Footer />
    </div>
  );
}
