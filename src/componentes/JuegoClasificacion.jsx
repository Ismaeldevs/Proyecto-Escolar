import React, { useState, useEffect, useCallback, useRef } from "react";
import "../style/JuegoClasificacion.css";

// --- DATOS AMPLIADOS ---
const DATOS_CATEGORIAS = {
  ANIMALES: { nombre: "ANIMALES", color: "#4ade80" },   // Verde
  FRUTAS: { nombre: "FRUTAS", color: "#f87171" },       // Rojo
  ROPA: { nombre: "ROPA", color: "#60a5fa" },           // Azul
  VEHICULOS: { nombre: "VEHÍCULOS", color: "#fbbf24" }, // Amarillo
  JUGUETES: { nombre: "JUGUETES", color: "#a78bfa" },   // Violeta
  COMIDA: { nombre: "COMIDA", color: "#f472b6" },       // Rosa
};

const ITEMS_BASE = [
  // ANIMALES
  { nombre: "Perro", categoria: "ANIMALES", emoji: "🐶" },
  { nombre: "Gato", categoria: "ANIMALES", emoji: "🐱" },
  { nombre: "Vaca", categoria: "ANIMALES", emoji: "🐮" },
  { nombre: "León", categoria: "ANIMALES", emoji: "🦁" },
  { nombre: "Cerdo", categoria: "ANIMALES", emoji: "🐷" },
  { nombre: "Pollito", categoria: "ANIMALES", emoji: "🐥" },
  // FRUTAS
  { nombre: "Manzana", categoria: "FRUTAS", emoji: "🍎" },
  { nombre: "Banana", categoria: "FRUTAS", emoji: "🍌" },
  { nombre: "Pera", categoria: "FRUTAS", emoji: "🍐" },
  { nombre: "Uva", categoria: "FRUTAS", emoji: "🍇" },
  { nombre: "Naranja", categoria: "FRUTAS", emoji: "🍊" },
  { nombre: "Sandía", categoria: "FRUTAS", emoji: "🍉" },
  // ROPA
  { nombre: "Camisa", categoria: "ROPA", emoji: "👕" },
  { nombre: "Pantalón", categoria: "ROPA", emoji: "👖" },
  { nombre: "Zapato", categoria: "ROPA", emoji: "👟" },
  { nombre: "Vestido", categoria: "ROPA", emoji: "👗" },
  { nombre: "Gorra", categoria: "ROPA", emoji: "🧢" },
  { nombre: "Calcetín", categoria: "ROPA", emoji: "🧦" },
  // VEHICULOS (NUEVO)
  { nombre: "Auto", categoria: "VEHICULOS", emoji: "🚗" },
  { nombre: "Policía", categoria: "VEHICULOS", emoji: "🚓" },
  { nombre: "Ambulancia", categoria: "VEHICULOS", emoji: "🚑" },
  { nombre: "Bicicleta", categoria: "VEHICULOS", emoji: "🚲" },
  { nombre: "Avión", categoria: "VEHICULOS", emoji: "✈️" },
  { nombre: "Barco", categoria: "VEHICULOS", emoji: "🚢" },
  // JUGUETES (NUEVO)
  { nombre: "Pelota", categoria: "JUGUETES", emoji: "⚽" },
  { nombre: "Oso", categoria: "JUGUETES", emoji: "🧸" },
  { nombre: "Robot", categoria: "JUGUETES", emoji: "🤖" },
  { nombre: "Cometa", categoria: "JUGUETES", emoji: "🪁" },
  { nombre: "Dado", categoria: "JUGUETES", emoji: "🎲" },
  { nombre: "Yoyo", categoria: "JUGUETES", emoji: "🪀" },
  // COMIDA (NUEVO)
  { nombre: "Pizza", categoria: "COMIDA", emoji: "🍕" },
  { nombre: "Hamburguesa", categoria: "COMIDA", emoji: "🍔" },
  { nombre: "Papas", categoria: "COMIDA", emoji: "🍟" },
  { nombre: "Helado", categoria: "COMIDA", emoji: "🍦" },
  { nombre: "Dona", categoria: "COMIDA", emoji: "🍩" },
  { nombre: "Galleta", categoria: "COMIDA", emoji: "🍪" },
];

const NIVELES = [
  { id: 1, nombre: "Nivel 1", itemsPorNivel: 5, categorias: ['ANIMALES', 'FRUTAS', 'ROPA'] },
  { id: 2, nombre: "Nivel 2", itemsPorNivel: 8, categorias: ['ANIMALES', 'FRUTAS', 'ROPA'] },
  { id: 3, nombre: "Nivel 3", itemsPorNivel: 10, categorias: ['ANIMALES', 'FRUTAS', 'ROPA'] },
  { id: 4, nombre: "Nivel 4", itemsPorNivel: 6, categorias: ['VEHICULOS', 'JUGUETES', 'COMIDA'] },
  { id: 5, nombre: "Nivel 5", itemsPorNivel: 9, categorias: ['VEHICULOS', 'JUGUETES', 'COMIDA'] },
  { id: 6, nombre: "Nivel 6", itemsPorNivel: 12, categorias: ['VEHICULOS', 'JUGUETES', 'COMIDA'] },
];

const barajar = (array) => [...array].sort(() => Math.random() - 0.5);

const generarItemsNivel = (nivel) => {
  const itemsValidos = ITEMS_BASE.filter(item => nivel.categorias.includes(item.categoria));
  let items = barajar(itemsValidos);
  while (items.length < nivel.itemsPorNivel) {
    items = [...items, ...itemsValidos];
  }
  return items
    .slice(0, nivel.itemsPorNivel)
    .map((i) => ({ ...i, id: Math.random().toString(36).substring(2, 9) }));
};

// --- COMPONENTE INTERNO PARA LA LÓGICA TÁCTIL (Igual que DraggableLetter) ---
const ItemArrastrable = ({ item, onDrop, onDragStart }) => {
  const elementRef = useRef(null);

  // Manejo de eventos táctiles
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const element = elementRef.current;
    
    // Guardar posición inicial visual para evitar saltos bruscos
    element.style.position = 'fixed';
    element.style.zIndex = '1000';
    element.style.width = '60px';
    element.style.height = '60px';
    element.style.transition = 'none'; // Sin transición mientras arrastramos
    
    // Centrar en el dedo
    element.style.left = `${touch.clientX - 30}px`;
    element.style.top = `${touch.clientY - 30}px`;
    
    // Bloquear scroll
    document.body.style.overflow = 'hidden';
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const element = elementRef.current;
    
    if (element) {
      element.style.left = `${touch.clientX - 30}px`;
      element.style.top = `${touch.clientY - 30}px`;
    }
  };

  const handleTouchEnd = (e) => {
    const element = elementRef.current;
    const touch = e.changedTouches[0];

    // 1. Ocultar el elemento para poder ver qué hay debajo
    element.style.display = 'none';
    
    // 2. Detectar el elemento que está debajo del dedo (la caja)
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // 3. Volver a mostrar el elemento inmediatamente
    element.style.display = 'flex';
    
    // 4. Buscar si caímos en una caja válida (que tenga data-category)
    const droppableBelow = elementBelow?.closest('[data-category]');

    if (droppableBelow) {
      const categoriaDestino = droppableBelow.dataset.category;
      onDrop(item, categoriaDestino);
    } 

    // Resetear estilos visuales (React se encargará de removerlo si fue exitoso)
    element.style.position = '';
    element.style.zIndex = '';
    element.style.left = '';
    element.style.top = '';
    element.style.width = '';
    element.style.height = '';
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      ref={elementRef}
      className="jcc-item-emoji"
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      {item.emoji}
    </div>
  );
};

export default function JuegoClasificacion() {
  const [estado, setEstado] = useState("CARGANDO");
  const [nivelIndex, setNivelIndex] = useState(0);
  const [itemsPendientes, setItemsPendientes] = useState([]);
  
  const [categoriasActivas, setCategoriasActivas] = useState([]);
  const [clasificados, setClasificados] = useState({});
  
  const [errores, setErrores] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [estrellasGanadas, setEstrellasGanadas] = useState({});

  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const clickRef = useRef(null);

  const nivel = NIVELES[nivelIndex];

  useEffect(() => {
    if (estado === "CARGANDO") {
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setEstado("MENU"), 500);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [estado]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    if (!isMuted) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isMuted, estado]);

  const playClick = () => {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  };

  const iniciarNivel = useCallback((index) => {
    playClick();
    const nivelConfig = NIVELES[index];
    
    setCategoriasActivas(nivelConfig.categorias);
    
    const clasificadosInit = {};
    nivelConfig.categorias.forEach(cat => clasificadosInit[cat] = []);
    setClasificados(clasificadosInit);

    setNivelIndex(index);
    setItemsPendientes(generarItemsNivel(nivelConfig));
    
    setTiempo(0);
    setErrores(0);
    setMensaje("");
    setEstado("JUEGO");
  }, []);

  useEffect(() => {
    if (estado === "JUEGO") {
      timerRef.current = setInterval(() => {
        setTiempo((t) => {
          if (t >= 120) { 
            clearInterval(timerRef.current);
            setEstado("PERDIO");
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [estado]);

  useEffect(() => {
    if (!nivel) return;
    const total = nivel.itemsPorNivel;
    const clasificadosTotal = Object.values(clasificados).flat().length;
    
    if (clasificadosTotal === total && total > 0) {
      clearInterval(timerRef.current);
      
      let estrellasActuales = 1;
      if (errores === 0) estrellasActuales = 3;
      else if (errores <= 2) estrellasActuales = 2;

      setEstrellasGanadas(prev => {
        const recordAnterior = prev[nivelIndex] || 0;
        return { 
            ...prev, 
            [nivelIndex]: Math.max(recordAnterior, estrellasActuales) 
        };
      });

      setEstado("GANO");
    }
  }, [clasificados, nivelIndex, nivel, errores]);

  // Lógica de validación unificada (sirve para mouse y touch)
  const validarDrop = (item, categoriaDestino) => {
    if (!item) return;

    if (item.categoria === categoriaDestino) {
      setClasificados((prev) => ({
        ...prev,
        [categoriaDestino]: [...prev[categoriaDestino], item],
      }));
      setItemsPendientes((prev) => prev.filter((i) => i.id !== item.id));
      setMensaje(`✅ ¡Muy bien!`);
    } else {
      setErrores((prev) => prev + 1);
      setMensaje(`❌ Ups, eso no va ahí`);
    }
    setTimeout(() => setMensaje(""), 1500);
  };

  const handleDragStart = (e, itemId) => {
      e.dataTransfer.setData("itemId", itemId);
  };

  const handleDropMouse = (e, categoriaDestino) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const item = itemsPendientes.find((i) => i.id === itemId);
    validarDrop(item, categoriaDestino);
  };

  const handleDragOver = (e) => e.preventDefault();

  const volverMenu = () => {
    playClick();
    clearInterval(timerRef.current);
    setEstado("MENU");
  };

  const renderEstrellas = (cantidad) => {
      if (!cantidad) return "☆ ☆ ☆";
      return "⭐".repeat(cantidad);
  };

  if (estado === "CARGANDO")
    return (
      <div className="jcc-container">
        <div className="jcc-cardCarga">
          <h1 style={{color:'#ec4899'}}>Cargando...</h1>
          <div style={{width:'80%', background:'#ffd1dc', height:'20px', borderRadius:'10px'}}>
             <div style={{width:`${progress}%`, background:'#ec4899', height:'100%', borderRadius:'10px', transition:'width 0.2s'}}></div>
          </div>
        </div>
        <audio ref={audioRef} src="/audio/musicaparajuego2.mp3" />
        <audio ref={clickRef} src="/audio/boton.mp3" />
      </div>
    );

  return (
    <div className="jcc-container">
      
      {estado === "MENU" && (
        <div className="jcc-cardNivel">
          <div>
             <h1 style={{fontSize:'3rem', color:'#ec4899', marginBottom:'10px'}}>Clasificación</h1>
             <p style={{color:'#666'}}>¡Arrastra los objetos a su caja correcta!</p>
          </div>
          
          <div className="jcc-nivelesGrid">
            {NIVELES.map((n, i) => (
              <button key={n.id} onClick={() => iniciarNivel(i)} className="jcc-btn-nivel">
                <div style={{marginBottom: '5px'}}>{n.nombre}</div>
                <div className="jcc-nivel-estrellas">
                    {renderEstrellas(estrellasGanadas[i])}
                </div>
              </button>
            ))}
          </div>
          
          <button className="jcc-btn-sonido" onClick={() => setIsMuted(!isMuted)}>
             {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}

      {estado === "JUEGO" && (
        <div className="jcc-cardNivel">
          <div className="jcc-header">
             <button className="jcc-btn-volver-mini" onClick={volverMenu}>⬅ Salir</button>
             <h2 className="jcc-titulo">{nivel.nombre}</h2>
             <div className="jcc-stats">
                <span>⏱ {tiempo}s</span>
                <span style={{color: errores > 0 ? 'red' : 'inherit'}}>❌ {errores}</span>
             </div>
             <button className="jcc-btn-sonido" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? "🔇" : "🔊"}
             </button>
          </div>

          <div className="jcc-gridCategorias">
            {categoriasActivas.map((cat) => (
              <div
                key={cat}
                data-category={cat} // ESTO ES CLAVE PARA EL TOUCH
                className="jcc-categoria-card"
                style={{ backgroundColor: DATOS_CATEGORIAS[cat].color + "33", borderColor: DATOS_CATEGORIAS[cat].color }}
                onDrop={(e) => handleDropMouse(e, cat)}
                onDragOver={handleDragOver}
              >
                <h3 style={{ color: DATOS_CATEGORIAS[cat].color }}>{DATOS_CATEGORIAS[cat].nombre}</h3>
                <div className="jcc-categoria-items">
                  {clasificados[cat].map((i) => (
                    <div key={i.id} className="jcc-item-emoji">
                      {i.emoji}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="jcc-mensaje">{mensaje}</div>

          <div className="jcc-itemsPendientes">
            {itemsPendientes.map((i) => (
              // Usamos el componente personalizado aquí
              <ItemArrastrable 
                key={i.id} 
                item={i} 
                onDragStart={handleDragStart} 
                onDrop={validarDrop} 
              />
            ))}
          </div>
        </div>
      )}

      {estado === "GANO" && (
        <div className="jcc-cardNivel">
          <div>
             <h1 style={{color:'#4caf50', fontSize:'3rem'}}>¡Felicidades!</h1>
             <p style={{fontSize:'1.5rem'}}>Completaste el nivel</p>
          </div>
          
          <div className="estrellas-container">
             {errores === 0 ? "⭐⭐⭐" : errores <= 2 ? "⭐⭐" : "⭐"}
          </div>
          
          <div style={{fontSize:'1.2rem', marginBottom:'20px'}}>
             Errores cometidos: <strong>{errores}</strong>
          </div>

          <div>
             {nivelIndex < NIVELES.length - 1 ? (
                 <button onClick={() => iniciarNivel(nivelIndex + 1)} className="jcc-btn-siguiente">
                   Siguiente Nivel ➡
                 </button>
             ) : (
                 <p style={{color:'#ec4899', fontWeight:'bold', fontSize:'1.5rem'}}>¡Juego Completado! 🏆</p>
             )}
             
             <button onClick={volverMenu} className="jcc-btn-volver">
                Menú Principal
             </button>
          </div>
        </div>
      )}

      {estado === "PERDIO" && (
        <div className="jcc-cardNivel">
          <h1 style={{color:'#f44336'}}>¡Tiempo Agotado!</h1>
          <p style={{fontSize:'4rem'}}>😢</p>
          <button onClick={volverMenu} className="jcc-btn-volver">
            Intentar de nuevo
          </button>
        </div>
      )}

      <audio ref={audioRef} src="/audio/musicaparajuego2.mp3" />
      <audio ref={clickRef} src="/audio/boton.mp3" />
    </div>
  );
}