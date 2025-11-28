import React from "react";
import { Outlet } from "react-router-dom";
import Encabezado from "./Encabezado"; 

const LayoutConEncabezado = () => {
  return (
    <div className="layout-con-encabezado">
      <Encabezado />
      <main className="flex-grow contenedor-principal">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutConEncabezado;
