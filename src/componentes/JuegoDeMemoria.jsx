import React, { useState, useEffect, useRef } from "react";
import "../Style/JuegoDeMemoria.css";

const CONFIG_NIVELES = [
  { id: 1, nombre: "Nivel 1", parejas: 3 },
  { id: 2, nombre: "Nivel 2", parejas: 4 },
  { id: 3, nombre: "Nivel 3", parejas: 5 },
  { id: 4, nombre: "Nivel 4", parejas: 6 },
  { id: 5, nombre: "Nivel 5", parejas: 7 },
  { id: 6, nombre: "Nivel 6", parejas: 8 },
  { id: 7, nombre: "Nivel 7", parejas: 9 },
  { id: 8, nombre: "Nivel 8", parejas: 10 },
  { id: 9, nombre: "Nivel 9", parejas: 12 },
];

const ICONOS = [
  "🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮",
  "🍎", "🍌", "🍉", "🍇", "🍓", "🍒", "🥝", "🍑", "🥭", "🍍",
  "⚽", "🏀", "🏈", "🎱", "🚀", "🛸", "🌍", "⭐"
];

const EMOJIS_PREMIO = ["😊", "😍", "😜", "😎", "🤓", "😁", "🤩", "🥳", "🏆"];

const generarCartas = (nivel) => {
  const seleccion = ICONOS.slice(0, nivel.parejas);
  const duplicadas = [...seleccion, ...seleccion];
  for (let i = duplicadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicadas[i], duplicadas[j]] = [duplicadas[j], duplicadas[i]];
  }
  return duplicadas.map((valor, idx) => ({
    id: `${Date.now()}-${idx}-${Math.random()}`,
    valor,
  }));
};

export default function JuegoMemoria() {
  const [cargando, setCargando] = useState(true);
  const [progreso, setProgreso] = useState(0);
  const [estado, setEstado] = useState("INICIO");
  const [nivelActual, setNivelActual] = useState(null);
  const [cartas, setCartas] = useState([]);
  const [seleccionadasIds, setSeleccionadasIds] = useState([]);
  const [acertadas, setAcertadas] = useState([]);
  const [bloquear, setBloquear] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [nivelMaximoCompletado, setNivelMaximoCompletado] = useState(0);
  const [sonidoActivo, setSonidoActivo] = useState(true);

  const timerRef = useRef(null);
  const audioFondoRef = useRef(null);
  const clickAudioRef = useRef(null);

  // --- ASIGNAR CLASE CSS POR NIVEL (MODIFICADA) ---
  const obtenerClaseGrid = (nivelId) => {
    if (nivelId <= 2) return "juegomemoria-grid-muy-facil";   
    if (nivelId === 3) return "juegomemoria-grid-facil";      
    if (nivelId === 4) return "juegomemoria-grid-medio-bajo"; 
    if (nivelId === 5) return "juegomemoria-grid-medio";      
    if (nivelId === 6) return "juegomemoria-grid-medio-alto"; 
    return "juegomemoria-grid-dificil";                       
  };

  useEffect(() => {
    let intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo);
          setCargando(false);
          return 100;
        }
        return prev + 5;
      });
    }, 40);
  }, []);

  useEffect(() => {
    const fondo = audioFondoRef.current;
    if (fondo) {
        if (sonidoActivo) {
            fondo.volume = 0.2;
            fondo.loop = true;
            fondo.play().catch(() => {});
        } else {
            fondo.pause();
        }
    }
  }, [sonidoActivo, estado]);

  const reproducirClick = () => {
    if (sonidoActivo && clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(() => {});
    }
  };

  const iniciarNivel = (nivel) => {
    reproducirClick();
    setNivelActual(nivel);
    setCartas(generarCartas(nivel));
    setSeleccionadasIds([]);
    setAcertadas([]);
    setIntentos(0);
    setTiempo(0);
    setEstado("JUEGO");
  };

  const volverMenu = () => {
    reproducirClick();
    setEstado("MENU");
    setNivelActual(null);
  };

  useEffect(() => {
    if (estado === "JUEGO") {
      timerRef.current = setInterval(() => setTiempo((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [estado]);

  const manejarClick = (carta) => {
    if (bloquear || seleccionadasIds.includes(carta.id) || acertadas.includes(carta.valor)) return;
    reproducirClick();
    setSeleccionadasIds((prev) => [...prev, carta.id]);
  };

  useEffect(() => {
    if (seleccionadasIds.length === 2) {
      setBloquear(true);
      setIntentos((i) => i + 1);
      const [id1, id2] = seleccionadasIds;
      const carta1 = cartas.find((c) => c.id === id1);
      const carta2 = cartas.find((c) => c.id === id2);

      if (carta1.valor === carta2.valor) {
        setAcertadas((prev) => [...prev, carta1.valor]);
        setSeleccionadasIds([]);
        setBloquear(false);
      } else {
        setTimeout(() => {
          setSeleccionadasIds([]);
          setBloquear(false);
        }, 800);
      }
    }
  }, [seleccionadasIds, cartas]);

  useEffect(() => {
    if (nivelActual && acertadas.length > 0 && acertadas.length === nivelActual.parejas) {
        if (nivelActual.id > nivelMaximoCompletado) {
            setNivelMaximoCompletado(nivelActual.id);
        }
        setTimeout(() => setEstado("GANO"), 500);
    }
  }, [acertadas, nivelActual]);

  return (
    <div className="juegomemoria-wrapper">
      <audio ref={audioFondoRef} src="/audio/musicaparajuego1.mp3" />
      <audio ref={clickAudioRef} src="/audio/boton.mp3" />

      {cargando ? (
        <div className="juegomemoria-card">
          <h2 style={{color: '#d81b60'}}>Cargando...</h2>
          <div style={{width: '80%', height: '15px', background: '#f8bbd0', borderRadius: '10px'}}>
            <div style={{height: '100%', width: `${progreso}%`, background: '#e91e63', borderRadius: '10px', transition: 'width 0.2s'}}></div>
          </div>
        </div>
      ) : (
        <>
          {estado === "INICIO" && (
            <div className="juegomemoria-pantallaInicio juegomemoria-fade-in">
               <h1 className="juegomemoria-menuTitle" style={{fontSize: '3rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Juego de Memoria</h1>
               <button className="juegomemoria-botonInicio" onClick={() => { reproducirClick(); setEstado("MENU"); }}>
                 JUGAR 🚀
               </button>
               <div style={{marginTop: '20px'}}>
                  <button className="juegomemoria-boton-Musica" onClick={() => setSonidoActivo(!sonidoActivo)}>
                    {sonidoActivo ? "🔊 Música ON" : "🔇 Música OFF"}
                  </button>
               </div>
            </div>
          )}

          {estado === "MENU" && (
            <div className="juegomemoria-card juegomemoria-fade-in">
              <div className="juegomemoria-infoBar">
                <h1 className="juegomemoria-menuTitle">Niveles</h1>
                <button className="juegomemoria-boton-Musica" onClick={() => setSonidoActivo(!sonidoActivo)}>
                  {sonidoActivo ? "🔊" : "🔇"}
                </button>
              </div>

              <div className="juegomemoria-premios">
                 
                 {nivelMaximoCompletado === 0 && <span className="juegomemoria-texto-premios">¡Completa niveles para ganar premios!</span>}
                 {EMOJIS_PREMIO.map((emoji, index) => {
                    const activo = (index + 1) <= nivelMaximoCompletado;
                    return (
                        <span key={index} className={`juegomemoria-emoji ${activo ? "activo" : ""}`}>
                            {emoji}
                        </span>
                    );
                 })}
              </div>
              
              <div className="juegomemoria-nivelesGrid">
                {CONFIG_NIVELES.map((nivel) => (
                  <button
                    key={nivel.id}
                    className={`juegomemoria-btn ${nivel.id <= nivelMaximoCompletado ? "juegomemoria-btn-success" : "juegomemoria-btn-primary"}`}
                    onClick={() => iniciarNivel(nivel)}
                  >
                    {nivel.nombre} {nivel.id <= nivelMaximoCompletado ? "⭐" : ""}
                  </button>
                ))}
              </div>
            </div>
          )}

          {estado === "JUEGO" && nivelActual && (
            <div className="juegomemoria-cardNivel juegomemoria-fade-in">
              <div className="juegomemoria-infoBar">
                <button className="juegomemoria-btn juegomemoria-btn-back" onClick={volverMenu}>⬅ Menú</button>
                <h2 className="juegomemoria-menuTitle">{nivelActual.nombre}</h2>
                <div className="juegomemoria-stats">
                  <span>⏱ {tiempo}s</span>
                  <span>💡 {intentos}</span>
                </div>
              </div>

              {/* CLASES DE CARTA SINCRONIZADAS */}
              <div className={`juegomemoria-cartasGrid ${obtenerClaseGrid(nivelActual.id)}`}>
                {cartas.map((carta) => {
                  const esVolteada = seleccionadasIds.includes(carta.id) || acertadas.includes(carta.valor);
                  const esAcertada = acertadas.includes(carta.valor);
                  return (
                    <div
                      key={carta.id}
                      className={`juegomemoria-carta ${esVolteada ? "juegomemoria-carta-volteada" : ""} ${esAcertada ? "juegomemoria-carta-acertada" : ""}`}
                      onClick={() => manejarClick(carta)}
                    >
                      {esVolteada ? carta.valor : "❓"}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {estado === "GANO" && (
            <div className="juegomemoria-card juegomemoria-fade-in">
              <h1 style={{color: '#4caf50', fontSize: '3rem', margin: 0}}>¡GANASTE!</h1>
              <p style={{fontSize: '5rem', margin: '15px'}}>🏆</p>
              <p style={{
    fontSize: '1.6rem', 
    fontWeight: 'bold', 
    color: '#e91e63', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: '10px 20px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
}}>
    Tiempo: {tiempo}s | Intentos: {intentos}
</p>
              <button className="juegomemoria-botonInicio" style={{background: '#4caf50', marginTop: '20px'}} onClick={volverMenu}>
                CONTINUAR
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}