import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { socket } from '../../socket/socket';
import IndicadorConexion from '../../componentes/IndicadorConexion';
import Swal from 'sweetalert2'; 
import './ListaTareas.css';

const EstudianteListaTareas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const datosSala = location.state?.room;
    const nombreAlumno = location.state?.studentName;
    const avatarAlumno = location.state?.studentAvatar;
    
    const [salaActualizada, setSalaActualizada] = useState(datosSala);

    useEffect(() => {
        if (!datosSala || !nombreAlumno) {
            navigate('/estudiante/sala');
            return;
        }
        
        setSalaActualizada(datosSala);
        
        // Unirse al canal de la sala en tiempo real
        socket.emit('estudiante:unirseASala', { salaId: datosSala.id, nombreAlumno });
        
        // Escuchar si el profesor agrega nuevas tareas/juegos
        socket.on('sala:tareaAgregada', async (data) => {
            if (data.salaId === datosSala.id) {
                if (data.tasks) {
                    setSalaActualizada(prev => ({
                        ...prev,
                        tasks: data.tasks
                    }));
                }
            }
        });
        
        return () => {
            socket.emit('estudiante:salirDeSala', { salaId: datosSala.id, nombreAlumno });
            socket.off('sala:tareaAgregada');
        };
    }, [datosSala, nombreAlumno, navigate]);

    if (!salaActualizada) return null;

    // Función para ir a hacer la tarea normal (asíncrona)
    const manejarElegirTarea = (tarea) => {
        // Verificar fecha límite si existe
        if (tarea.submissionDeadline) {
            if (new Date() > new Date(tarea.submissionDeadline)) {
                Swal.fire({
                    icon: "error",
                    title: "⛔ Tiempo finalizado",
                    text: "El tiempo para realizar esta actividad ha terminado.",
                    confirmButtonText: "Aceptar"
                });
                return;
            }
        }

        navigate('/estudiante/tarea', {
            state: {
                room: salaActualizada,
                task: tarea,
                studentName: nombreAlumno,
                studentAvatar: avatarAlumno
            }
        });
    };

    // Función para ir al modo en vivo (multijugador)
    const manejarModoVivo = (e, tarea) => {
        e.stopPropagation(); // Evita conflictos con otros clics
        navigate('/juego-vivo/estudiante', { 
            state: { 
                task: tarea, 
                studentName: nombreAlumno, 
                salaId: salaActualizada.id 
            } 
        });
    };

    return (

        <div className="pagina-cuaderno">
        <div className="contenedor-lista-tareas">
            <div className="encabezado-alumno">
                <span className="avatar-grande">{avatarAlumno}</span>
                <h1>Hola, {nombreAlumno}</h1>
                <p>Sala: <strong>{salaActualizada.schoolName} - {salaActualizada.grade}</strong></p>
            </div>

            <h3 className="titulo-seccion">Selecciona una actividad:</h3>

            <div className="grid-tareas-alumno">
                {salaActualizada?.tasks?.map((tarea, index) => (
                    <div 
                        key={tarea.id} 
                        className="tarjeta-tarea-alumno"
                        style={{ borderLeft: `6px solid ${tarea.style.primaryColor}` }}
                    >
                        <div className="info-tarea-alumno">
                            <span className="numero-tarea">Actividad #{index + 1}</span>
                            <span className="titulo-tarea">
                                {tarea.tipo === 'juego' ? '🎮 Juego Interactivo' : `📝 Examen de ${tarea.questions.length} Preguntas`}
                            </span>
                            <span className="tiempo-tarea">⏱️ Tiempo: {Math.floor(tarea.timeLimit / 60)} minutos</span>
                        </div>
                        
                        
                        <div className="acciones-tarea">
                            
                            {/* 1. Botón estándar (SOLO aparece si NO es juego) */}
                            {tarea.tipo !== 'juego' && (
                                <button 
                                    onClick={() => manejarElegirTarea(tarea)}
                                    className="btn-tarea"
                                    style={{ backgroundColor: tarea.style.primaryColor }}
                                >
                                    Hacer Tarea
                                </button>
                            )}

                            {/* 2. Botón Modo Vivo (SOLO aparece si ES juego) */}
                            {tarea.tipo === 'juego' && (
                                <button 
                                    onClick={(e) => manejarModoVivo(e, tarea)}
                                    className="btn-vivo"
                                >
                                    📡 Modo en Vivo
                                </button>
                            )}
                            
                        </div>
                    </div>
                ))}
            </div>
            
            <button onClick={() => navigate('/')} className="boton-salir">Salir</button>
            <IndicadorConexion />
        </div>
        </div>
    );
};

export default EstudianteListaTareas;