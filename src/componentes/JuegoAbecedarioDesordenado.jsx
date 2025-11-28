import React, { useState, useCallback, useEffect, useRef } from "react";
import "../Style/abecedariodesordenado.css";


const COLUMNAS = 7; 
const LETTER_ORDER = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const generarTargetSlots = () =>
  LETTER_ORDER.map((letra, i) => ({ letra, id: `t-${i}`, isPlaced: false }));

export default function JuegoAbecedarioDesordenado() {
  const [gameState, setGameState] = useState("CARGANDO");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [targetSlots, setTargetSlots] = useState([]);
  const [draggableLetters, setDraggableLetters] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const clickSoundRef = useRef(null);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      if (!isMuted && gameState === "JUEGO") {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, gameState]);


  useEffect(() => {
    if (gameState === "CARGANDO") {
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setGameState("INICIO"), 500);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const playClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
  };

 
  const startGame = useCallback(() => {
    playClick();
    const slots = generarTargetSlots();
    setTargetSlots(slots);
    setScore(0);
    setGameState("JUEGO");

    // Generamos posiciones iniciales
    const letrasIniciales = LETTER_ORDER.map((letra, index) => ({
      id: `l-${index}`,
      letra,
      // Guardamos la posición inicial para cuando se equivocan
      top: 0,
      left: 0, 
      initialTop: 0, 
      initialLeft: 0, 
      wrong: false,
    }));

    // Dispersamos las letras aleatoriamente
    const letrasCaidas = letrasIniciales
      .map((l) => ({
        ...l,
        // Usamos porcentajes más seguros para móvil (10% a 80%)
        top: 10 + Math.random() * 60,
        left: 5 + Math.random() * 80,
        initialTop: 10 + Math.random() * 60,
        initialLeft: 5 + Math.random() * 80,
        falling: true,
      }))
      .sort(() => Math.random() - 0.5);

    setDraggableLetters(letrasCaidas);
    setMensaje("😱 ¡Las letras se cayeron! ¡Arrastra cada letra a su lugar!");
  }, []);

  const volverInicio = () => {
    playClick();
    setGameState("INICIO");
  };

  const handleDragStart = (e, letra) => {
    e.dataTransfer.setData("text/plain", letra);
    e.currentTarget.style.opacity = "0.5";
  };

  // Esta función centraliza la lógica de "verificar si la letra es correcta"
  const verificarLetra = (letraJugada, slotLetra) => {
    if (letraJugada === slotLetra) {
      // Acierto
      setTargetSlots((prev) =>
        prev.map((slot) =>
          slot.letra === slotLetra ? { ...slot, isPlaced: true } : slot
        )
      );
      setDraggableLetters((prev) =>
        prev.filter((l) => l.letra !== letraJugada)
      );
      setScore((s) => s + 10);
      playClick(); // Sonido feedback positivo (reutilizamos click)
      return true;
    } else {
      // Error
      setScore((s) => Math.max(0, s - 5));
      setDraggableLetters((prev) =>
        prev.map((l) =>
          l.letra === letraJugada
            ? { ...l, wrong: true, top: l.initialTop, left: l.initialLeft }
            : l
        )
      );
      return false;
    }
  };

  const handleDrop = (e, targetLetra) => {
    e.preventDefault();
    const draggedLetra = e.dataTransfer.getData("text/plain");
    verificarLetra(draggedLetra, targetLetra);
  };

  // Componente de Slot (Destino)
  const TargetSlot = ({ slot }) => (
    <div
      className={`slot ${slot.isPlaced ? "slot-placed" : ""}`}
      // data-letra ayuda a detectar el slot en modo Touch
      data-letra={slot.letra} 
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, slot.letra)}
    >
      {slot.letra}
    </div>
  );

  // --- COMPONENTE CARTA CON SOPORTE TÁCTIL (MÓVIL) ---
  const DraggableLetter = ({ data }) => {
    const elementRef = useRef(null);

    // Eventos Touch para móvil
    const handleTouchStart = (e) => {
      e.currentTarget.style.opacity = "0.6";
      e.currentTarget.style.zIndex = "1000"; 
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); 
      const touch = e.touches[0];
      const element = elementRef.current;
      
      if (element) {
        
        const parentRect = element.offsetParent.getBoundingClientRect();
        const newLeft = touch.clientX - parentRect.left - (element.offsetWidth / 2);
        const newTop = touch.clientY - parentRect.top - (element.offsetHeight / 2);

        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
      }
    };

    const handleTouchEnd = (e) => {
      const element = elementRef.current;
      element.style.opacity = "1";
      element.style.zIndex = "10";
      
      // Para detectar qué hay DEBAJO del dedo, necesitamos ocultar la letra un instante
      element.style.display = "none";
      const touch = e.changedTouches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      element.style.display = "flex"; // Volver a mostrar

      // Buscamos si soltamos encima de un slot
      const slot = elementBelow?.closest(".slot");
      
      if (slot) {
        const targetLetra = slot.getAttribute("data-letra");
        
        if (!slot.classList.contains("slot-placed")) {
            verificarLetra(data.letra, targetLetra);
        } else {
           
             setDraggableLetters(prev => prev.map(l => l.id === data.id ? {...l} : l));
        }
      } else {
        
         setDraggableLetters(prev => prev.map(l => l.id === data.id ? {...l} : l));
      }
    };

    return (
      <div
        ref={elementRef}
        draggable
        onDragStart={(e) => handleDragStart(e, data.letra)}
        onDragEnd={(e) => (e.currentTarget.style.opacity = "1")}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        
        className={`letter ${data.falling ? "caida" : ""} ${
          data.wrong ? "letter-wrong" : ""
        }`}
        style={{
          top: `${data.top}%`, 
          left: `${data.left}%`,
        }}
      >
        {data.letra}
      </div>
    );
  };

  const PantallaCarga = () => (
    <div className="inicio-card centered-card">
      <h1>🔄 Cargando...</h1>
      <div className="barra-carga">
        <div className="progreso" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  );

  const PantallaInicio = () => (
    <div className="inicio-card centered-card">
      <h1>🔤 ¡Abecedario Desordenado!</h1>
      <p>Las letras se van a caer 😱 — ¡Ayúdalas a volver a su sitio!</p>
      <button onClick={startGame} className="btn-jugar">
        ¡Comenzar!
      </button>
      <button
        className="btn-sonido"
        onClick={() => { playClick(); setIsMuted(!isMuted); }}
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );

  const PantallaJuego = () => (
    <div className="juego-card">
      <div className="info-bar">
        <button onClick={volverInicio} className="btn-volver">⬅ Volver</button>
        <div>Puntaje: <strong>{score}</strong></div>
      </div>

      <div className="slots-area">
        {targetSlots.map((slot) => (
          <TargetSlot key={slot.id} slot={slot} />
        ))}
      </div>

      <div className="mensaje visible">{mensaje}</div>

      <div className="letras-area">
        {draggableLetters.map((data) => (
          <DraggableLetter key={data.id} data={data} />
        ))}
      </div>

      <button
        className="btn-sonido"
        onClick={() => { playClick(); setIsMuted(!isMuted); }}
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );

  const PantallaTerminado = () => (
    <div className="fin-card centered-card">
      <h1>🎉 ¡Abecedario Ordenado!</h1>
      <p>Tu puntaje final es: <strong>{score}</strong></p>
      <button onClick={startGame} className="btn-jugar">Jugar otra vez</button>
      <button onClick={volverInicio} className="btn-volver">Volver al inicio</button>
    </div>
  );

  return (
    <div className="contenedor-principal-abc">
      {gameState === "CARGANDO" && <PantallaCarga />}
      {gameState === "INICIO" && <PantallaInicio />}
      {gameState === "JUEGO" && <PantallaJuego />}
      {gameState === "TERMINADO" && <PantallaTerminado />}
    
      <audio ref={audioRef} src="/audio/musicaparajuego2.mp3" />
      <audio ref={clickSoundRef} src="/audio/boton.mp3" />
    </div>
  );
}