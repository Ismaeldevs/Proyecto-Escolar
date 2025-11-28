import React, { useEffect, useRef, useState } from "react";
import "../Style/relacionaplurales.css";

const NIVELES_CONFIG = [
  {
    id: 1,
    nombre: "Nivel 1 - Animales",
    parejas: [
      { singular: "Gato", plural: "Gatos", emoji: "🐱" },
      { singular: "Perro", plural: "Perros", emoji: "🐶" },
      { singular: "Pato", plural: "Patos", emoji: "🦆" }
    ]
  },
  {
    id: 2,
    nombre: "Nivel 2 - Objetos",
    parejas: [
      { singular: "Libro", plural: "Libros", emoji: "📚" },
      { singular: "Reloj", plural: "Relojes", emoji: "⌚" },
      { singular: "Lápiz", plural: "Lápices", emoji: "✏️" }
    ]
  },
  {
    id: 3,
    nombre: "Nivel 3 - Comida",
    parejas: [
      { singular: "Manzana", plural: "Manzanas", emoji: "🍎" },
      { singular: "Pan", plural: "Panes", emoji: "🍞" },
      { singular: "Taco", plural: "Tacos", emoji: "🌮" }
    ]
  },
  {
    id: 4,
    nombre: "Nivel 4 - Naturaleza",
    parejas: [
      { singular: "Árbol", plural: "Árboles", emoji: "🌳" },
      { singular: "Flor", plural: "Flores", emoji: "🌸" },
      { singular: "Hongo", plural: "Hongos", emoji: "🍄" }
    ]
  },
  {
    id: 5,
    nombre: "Nivel 5 - Cuerpo",
    parejas: [
      { singular: "Mano", plural: "Manos", emoji: "✋" },
      { singular: "Pie", plural: "Pies", emoji: "🦶" },
      { singular: "Ojo", plural: "Ojos", emoji: "👀" }
    ]
  },
  {
    id: 6,
    nombre: "Nivel 6 - Profesiones",
    parejas: [
      { singular: "Doctor", plural: "Doctores", emoji: "👨‍⚕️" },
      { singular: "Chef", plural: "Chefs", emoji: "👩‍🍳" },
      { singular: "Policía", plural: "Policías", emoji: "👮" }
    ]
  }
];

const TOTAL_NIVELES = NIVELES_CONFIG.length;

export default function RelacionaPlurales() {
  const [gameState, setGameState] = useState("INICIO");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [score, setScore] = useState(0);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [estrellasGanadas, setEstrellasGanadas] = useState(Array(TOTAL_NIVELES).fill(0));
  const [erroresNivel, setErroresNivel] = useState(0);
  
  const [permanentLines, setPermanentLines] = useState([]);
  const [tempLine, setTempLine] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [muted, setMuted] = useState(false);

  const svgRef = useRef(null);
  const gameAreaRef = useRef(null);
  const audioRef = useRef(null);
  const firstPlayTriggeredRef = useRef(false);
  const [juegoPares, setJuegoPares] = useState({ images: [], words: [] });

  // Cargar progreso
  useEffect(() => {
    const saved = localStorage.getItem("plurales-progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentLevel(data.currentLevel || 1);
        setScore(data.score || 0);
        const savedStars = data.estrellas || [];
        // Asegurar array completo
        const fullStars = [...savedStars, ...Array(Math.max(0, TOTAL_NIVELES - savedStars.length)).fill(0)];
        setEstrellasGanadas(fullStars);
      } catch {}
    }
  }, []);

  // Guardar progreso
  useEffect(() => {
    localStorage.setItem(
      "plurales-progress",
      JSON.stringify({ currentLevel, score, estrellas: estrellasGanadas })
    );
  }, [currentLevel, score, estrellasGanadas]);

  // Audio
  useEffect(() => {
    if (!audioRef.current) {
      const music = new Audio("/audio/musicaparajuego1.mp3");
      music.loop = true;
      music.volume = muted ? 0 : 0.35;
      audioRef.current = music;
      music.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    muted ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [muted]);

  // Autoplay touch
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current && !firstPlayTriggeredRef.current) {
        audioRef.current.play().catch(() => {});
        firstPlayTriggeredRef.current = true;
      }
      window.removeEventListener("pointerdown", tryPlay);
    };
    window.addEventListener("pointerdown", tryPlay, { once: true });
    return () => window.removeEventListener("pointerdown", tryPlay);
  }, []);

  const iniciarNivel = (nivel) => {
    const cfg = NIVELES_CONFIG[nivel - 1];
    if (!cfg) return;
    setGameState("JUEGO");
    setShowProgress(false);
    setParesEncontrados([]);
    setErroresNivel(0);
    setMensaje("");
    setPermanentLines([]);

    const imgs = cfg.parejas.map((p, i) => ({
      id: `img-${nivel}-${i}`,
      valor: p.plural,
      singular: p.singular,
      emoji: p.emoji
    }));

    const words = cfg.parejas
      .map((p, i) => ({ id: `txt-${nivel}-${i}`, valor: p.plural }))
      .sort(() => Math.random() - 0.5);

    setJuegoPares({ images: imgs, words });
  };

  // --- LÓGICA DE ARRASTRE ---
  const handlePointerDown = (e, item) => {
    if (paresEncontrados.includes(item.valor)) return;
    e.preventDefault();
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragging({ fromId: item.id, valor: item.valor });
    setTempLine({ x1: x, y1: y, x2: x, y2: y });
    setMensaje(`Une "${item.singular}" con su plural`);
  };

  const handlePointerMove = (e) => {
    if (!dragging || !tempLine) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    setTempLine((prev) => ({ ...prev, x2: e.clientX - rect.left, y2: e.clientY - rect.top }));
  };

  const handlePointerUp = (e) => {
    if (!dragging || !tempLine) return;
    
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const dropTarget = elements.find((el) => el.id?.startsWith("txt-"));
    
    if (!dropTarget) {
      resetDrag("");
      return;
    }

    const palabraObj = juegoPares.words.find((w) => w.id === dropTarget.id);
    
    if (!palabraObj || paresEncontrados.includes(palabraObj.valor)) {
      resetDrag("");
      return;
    }

    if (palabraObj.valor === dragging.valor) {
      // Crear línea permanente
      const fromEl = document.getElementById(dragging.fromId);
      const toEl = document.getElementById(palabraObj.id);
      
      if (fromEl && toEl) {
        const gr = gameAreaRef.current.getBoundingClientRect();
        const a = fromEl.getBoundingClientRect();
        const b = toEl.getBoundingClientRect();
        
        // Ajuste para que la flecha salga del borde derecho de la imagen al izquierdo del texto
        setPermanentLines((prev) => [...prev, {
          x1: (a.right - gr.left) - 5, 
          y1: a.top - gr.top + a.height / 2,
          x2: (b.left - gr.left) + 5,  
          y2: b.top - gr.top + b.height / 2
        }]);
      }
      
      setParesEncontrados((prev) => [...prev, palabraObj.valor]);
      setScore((s) => s + 10);
      setMensaje("¡Excelente! 🎉");
    } else {
      setErroresNivel((e) => e + 1);
      setMensaje("Ups, intenta de nuevo ❌");
    }
    
    resetDrag("");
  };

  const resetDrag = (msg) => {
    setTempLine(null);
    setDragging(null);
    if(msg) {
        setMensaje(msg);
        setTimeout(() => setMensaje(""), 1500);
    }
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging, tempLine]);

  // --- DIBUJO DE FLECHAS SVG ---
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = ""; 

    const createArrowHead = (x, y, angle, color) => {
      const size = 15;
      const p1x = x - Math.cos(angle - Math.PI / 7) * size;
      const p1y = y - Math.sin(angle - Math.PI / 7) * size;
      const p2x = x - Math.cos(angle + Math.PI / 7) * size;
      const p2y = y - Math.sin(angle + Math.PI / 7) * size;
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      poly.setAttribute("points", `${x},${y} ${p1x},${p1y} ${p2x},${p2y}`);
      poly.setAttribute("fill", color);
      return poly;
    };

    const createLine = (l, color, dashed = false) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", l.x1);
        line.setAttribute("y1", l.y1);
        line.setAttribute("x2", l.x2);
        line.setAttribute("y2", l.y2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "8");
        line.setAttribute("stroke-linecap", "round");
        if (dashed) line.setAttribute("stroke-dasharray", "15 15");
        line.setAttribute("filter", "drop-shadow(0px 3px 2px rgba(0,0,0,0.2))");
        return line;
    };

    permanentLines.forEach(l => {
        svg.appendChild(createLine(l, "#10b981")); 
        const angle = Math.atan2(l.y2 - l.y1, l.x2 - l.x1);
        svg.appendChild(createArrowHead(l.x2, l.y2, angle, "#10b981"));
    });

    if (tempLine) {
        svg.appendChild(createLine(tempLine, "#ec4899", true));
        const angle = Math.atan2(tempLine.y2 - tempLine.y1, tempLine.x2 - tempLine.x1);
        svg.appendChild(createArrowHead(tempLine.x2, tempLine.y2, angle, "#ec4899"));
    }

  }, [permanentLines, tempLine]);

  // Verificar Victoria
  useEffect(() => {
    if (juegoPares.images.length > 0 && paresEncontrados.length === juegoPares.images.length) {
      let estrellas = 3;
      if (erroresNivel === 1) estrellas = 2;
      if (erroresNivel >= 2) estrellas = 1;
      
      setEstrellasGanadas((prev) => {
        const copy = [...prev];
        copy[currentLevel - 1] = Math.max(copy[currentLevel - 1], estrellas);
        return copy;
      });
      
      setTimeout(() => {
          setGameState(currentLevel === TOTAL_NIVELES ? "FINAL" : "GANO");
      }, 500);
    }
  }, [paresEncontrados]);

  const ItemCard = ({ item, matched, isImage }) => (
    <div
      id={item.id}
      className={`itemCard ${matched ? "matched" : ""}`}
      style={{ touchAction: "none" }} 
      onPointerDown={(!matched && isImage) ? (e) => handlePointerDown(e, item) : undefined}
    >
      {isImage ? (
        <div className="colItem">
          <span className="emoji">{item.emoji}</span>
          <span className="singular">{item.singular}</span>
        </div>
      ) : (
        <div className="palabra">{item.valor}</div>
      )}
    </div>
  );

  return (
    <div className="juegoWrapper">
      
      {gameState === "INICIO" && (
        <div className="panelInicio">
          <h1 className="inicioTitulo">Relaciona Plurales</h1>
          <p className="inicioDesc">¡Conecta el dibujo con su nombre en plural!</p>
          <button onClick={() => { setCurrentLevel(1); iniciarNivel(1); }} className="btnPrincipal">Jugar</button>
          <button className="btnSec" onClick={() => setShowProgress(true)}>Ver Progreso</button>
          <button className="btnSec" onClick={() => setMuted(!muted)}>
            {muted ? "🔇 Sonido Off" : "🔊 Sonido On"}
          </button>
          
          {/* MENÚ DE NIVELES INTEGRADO */}
          {showProgress && (
             <div className="panelProgreso" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:20, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <h2 className="tituloProgreso">Niveles</h2>
                <div className="gridNiveles">
                    {NIVELES_CONFIG.map((n, i) => (
                        <div key={i} className="cardNivelProgreso" onClick={() => iniciarNivel(n.id)}>
                            <h4>{n.nombre}</h4>
                            <div className="estrellasNivel">
                                {estrellasGanadas[i] > 0 ? "⭐".repeat(estrellasGanadas[i]) : "☆ ☆ ☆"}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btnSec" onClick={() => setShowProgress(false)}>Cerrar</button>
             </div>
          )}
        </div>
      )}

      {gameState === "JUEGO" && (
        <div className="panelJuego" ref={gameAreaRef}>
          <svg ref={svgRef} className="svgLines" />
          
          <div className="juegoHeader">
            <span className="nivelTxt">{NIVELES_CONFIG[currentLevel-1].nombre}</span>
            <button className="btnSec" onClick={() => setGameState("INICIO")}>Salir</button>
          </div>
          
          <div className="mensajeTxt">{mensaje}</div>
          
          <div className="juegoGrid">
            <div>
              <h3 className="colTitulo">SINGULAR</h3>
              {juegoPares.images.map((img) => (
                <ItemCard key={img.id} item={img} matched={paresEncontrados.includes(img.valor)} isImage={true} />
              ))}
            </div>
            <div>
              <h3 className="colTitulo">PLURAL</h3>
              {juegoPares.words.map((w) => (
                <ItemCard key={w.id} item={w} matched={paresEncontrados.includes(w.valor)} isImage={false} />
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === "GANO" && (
        <div className="panelGano">
          <h1 className="tituloGano">¡Muy Bien! 🎉</h1>
          <div className="estrellasGano">
             {erroresNivel === 0 ? "⭐⭐⭐" : erroresNivel === 1 ? "⭐⭐" : "⭐"}
          </div>
          <p className="inicioDesc">¡Has encontrado todas las parejas!</p>
          <button className="btnPrincipal" onClick={() => {
              const next = currentLevel + 1;
              setCurrentLevel(next);
              iniciarNivel(next);
          }}>Siguiente Nivel ➡</button>
          <button className="btnSec" onClick={() => setGameState("INICIO")}>Menú</button>
        </div>
      )}

      {gameState === "FINAL" && (
        <div className="panelFinal">
          <h1 className="tituloGano">¡Felicidades! 🏆</h1>
          <p className="inicioDesc">¡Has completado todos los niveles!</p>
          <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#4338ca', marginBottom:'20px'}}>
             Total de Estrellas: {estrellasGanadas.reduce((a, b) => a + b, 0)} / {TOTAL_NIVELES * 3}
          </div>
          <button className="btnPrincipal" onClick={() => setGameState("INICIO")}>Volver al Menú</button>
        </div>
      )}

    </div>
  );
}