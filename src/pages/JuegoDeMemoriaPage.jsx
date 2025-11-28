import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import JuegoMemoria from "../componentes/JuegoDeMemoria";



export default function MemoriaPage() {
  return (
    <div>
      <Header />
      <div className="page-juego">
        
        <div className="juego-container">
          <JuegoMemoria />
        </div>
      </div>
      <Footer />
    </div>
  );
}
