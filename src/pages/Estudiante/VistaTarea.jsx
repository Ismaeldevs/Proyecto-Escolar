import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDatos } from '../../Contextos/DatosContext';
import { obtenerUrlEmbed } from '../../Logica/utilidades';
import './VistaTarea.css';

const EstudianteVistaTarea = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enviarRespuestasAlumno } = useDatos();
    
    const datosTarea = location.state?.task;
    const datosSala = location.state?.room;
    const nombreAlumno = location.state?.studentName;
    const avatarAlumno = location.state?.studentAvatar;
    
    useEffect(() => {
        if (!datosTarea || !datosSala || !nombreAlumno) {
            navigate('/estudiante/sala');
        }
    }, [datosTarea, datosSala, nombreAlumno, navigate]);

    const [indicePreguntaActual, setIndicePreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const [tiempoRestante, setTiempoRestante] = useState(datosTarea?.timeLimit || 0); 
    const [tareaFinalizada, setTareaFinalizada] = useState(false);
    
    // Timer
    useEffect(() => {
        if (tareaFinalizada || !datosTarea) return; 
        if (tiempoRestante <= 0) {
            setTareaFinalizada(true);
            return;
        }
        const timer = setTimeout(() => setTiempoRestante(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [tiempoRestante, tareaFinalizada, datosTarea]);
    
    if (!datosTarea || !datosTarea.questions || !Array.isArray(datosTarea.questions)) {
        return <div className="evt-cargando">Cargando examen...</div>;
    }

    const { theme, primaryColor } = datosTarea.style || { theme: 'default', primaryColor: '#4f46e5' };
    const preguntas = datosTarea.questions; 
    const preguntaActual = preguntas[indicePreguntaActual];

    if (!preguntaActual) return <div className="evt-error">Error al cargar la pregunta.</div>;

    const respuestaActual = respuestas.find(a => a.qId === preguntaActual.id)?.selectedOptionIndex;

    const manejarSeleccionRespuesta = (indiceOpcion) => {
        const nuevaRespuesta = { 
            qId: preguntaActual.id, 
            selectedOptionIndex: indiceOpcion, 
            isCorrect: indiceOpcion === preguntaActual.correctOptionIndex,
        };
        setRespuestas(prev => {
            const filtradas = prev.filter(a => a.qId !== preguntaActual.id);
            return [...filtradas, nuevaRespuesta];
        });
    };
    
    const manejarSiguiente = () => {
        if (indicePreguntaActual === preguntas.length - 1) {
            setTareaFinalizada(true);
        } else {
            setIndicePreguntaActual(prev => prev + 1);
        }
    };

    const manejarEnvioTarea = async () => {
        await enviarRespuestasAlumno( 
            datosSala.id,
            datosTarea.id,
            nombreAlumno,
            avatarAlumno,
            respuestas
        );

        navigate('/estudiante/seleccion-tarea', { 
            state: {
                room: datosSala,
                studentName: nombreAlumno,
                studentAvatar: avatarAlumno,
            }
        });
    };
    
    // --- VISTA TAREA FINALIZADA ---
    if (tareaFinalizada) {
        return (
            <div className={`evt-contenedor evt-fondo-${theme}`}>
                <div className={`evt-tarjeta-finalizado evt-tarjeta-${theme}`}>
                    <h2 className="evt-titulo-final">¡Tarea Finalizada! 🚀</h2>
                    <div className="evt-info-final">
                        <span className="evt-avatar-final">{avatarAlumno}</span>
                        <p>Gracias, <strong>{nombreAlumno}</strong>.</p>
                        <p>¡Tus resultados se están enviando!</p>
                    </div>
                    <button 
                        onClick={manejarEnvioTarea} 
                        className="evt-boton-final"
                        style={{ backgroundColor: primaryColor }}
                    >
                        Regresar a la Lista de Tareas
                    </button>
                </div>
            </div>
        );
    }

    // --- VISTA PREGUNTA ---
    return (
        <div className={`evt-contenedor evt-fondo-${theme}`}>
            {/* Barra Superior con Info */}
            <div className={`evt-barra-superior evt-tarjeta-${theme}`}>
                <div className="evt-info-alumno">
                    <span className="evt-avatar-barra">{avatarAlumno}</span>
                    <span className="evt-nombre-barra">{nombreAlumno}</span>
                </div>
                <div className={`evt-timer ${tiempoRestante < 60 ? 'evt-timer-alerta' : 'evt-timer-normal'}`}>
                    ⏰ {Math.floor(tiempoRestante/60)}:{String(tiempoRestante%60).padStart(2,'0')}
                </div>
            </div>

            {/* Tarjeta Central de Pregunta */}
            <div className={`evt-tarjeta-pregunta evt-tarjeta-${theme}`}>
                
                {/* Multimedia */}
                {preguntaActual.media?.type === 'image' && (
                    <div className="evt-media-wrapper">
                        <img src={preguntaActual.media.url} className="evt-imagen" alt="Apoyo visual" />
                    </div>
                )}
                {preguntaActual.media?.type === 'video' && (
                    <div className="evt-media-wrapper">
                        <iframe src={obtenerUrlEmbed(preguntaActual.media.url)} className="evt-iframe" title="Video"></iframe>
                    </div>
                )}

                {/* Texto Pregunta */}
                <h3 className={`evt-texto-pregunta evt-texto-${theme}`}>{preguntaActual.question}</h3>
                
                {/* Opciones */}
                <div className="evt-grid-opciones">
                    {preguntaActual.options && preguntaActual.options.map((opcion, index) => (
                        <button
                            key={index}
                            onClick={() => manejarSeleccionRespuesta(index)}
                            className={`evt-boton-opcion ${respuestaActual === index ? 'seleccionada' : ''}`}
                            style={{
                                borderColor: respuestaActual === index ? primaryColor : 'transparent',
                                backgroundColor: respuestaActual === index ? `${primaryColor}20` : undefined,
                                outline: respuestaActual === index ? `2px solid ${primaryColor}` : 'none'
                            }}
                        >
                            <span className={`evt-prefijo-opcion evt-prefijo-${theme}`}>{String.fromCharCode(65 + index)}</span>
                            {opcion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botón Navegación */}
            <div className="evt-navegacion">
                <button 
                    onClick={manejarSiguiente} 
                    disabled={typeof respuestaActual === 'undefined'} 
                    className="evt-boton-siguiente"
                    style={{ backgroundColor: typeof respuestaActual === 'undefined' ? '#ccc' : primaryColor }}
                >
                    {indicePreguntaActual === preguntas.length - 1 ? 'Finalizar Tarea' : 'Siguiente Pregunta ➜'}
                </button>
            </div>
        </div>
    );
};

export default EstudianteVistaTarea;