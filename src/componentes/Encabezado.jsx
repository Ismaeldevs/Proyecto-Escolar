import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contextos/AuthContext';
import '../Style/Encabezado.css';

const Encabezado = () => {
    const { maestroActual } = useAuth(); 

    return (
        <header className="encabezado-principal encmaestros">
            <div className="encabezado-contenedor">
                <Link to="/inicio" className="encabezado-titulo encmaestros-titulo">
                    <span role="img" aria-label="lápiz" className="encmaestros-lapiz">✏️</span>
                    <span className="texto-gradiente encmaestros-texto">
                        Plataforma de Maestros y Alumnos
                    </span>
                    <span role="img" aria-label="lápiz" className="encmaestros-lapiz">✏️</span>
                </Link>
                <nav className="encabezado-nav encmaestros-nav">
                    <Link to="/inicio" className="encabezado-btn-inicio encmaestros-btn-inicio">
                        Inicio
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Encabezado;