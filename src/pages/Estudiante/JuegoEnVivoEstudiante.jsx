import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../../socket/socket';
import './JuegoEnVivoEstudiante.css';

const JuegoEnVivoEstudiante = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tarea = location.state?.task; 
    const nombreAlumno = location.state?.studentName;
    const yaConectado = useRef(false);
    
    const [estadoServer, setEstadoServer] = useState('lobby');
    const [indiceServer, setIndiceServer] = useState(0);
    const [respuestaEnviada, setRespuestaEnviada] = useState(false);
    const [puntajeAlumno, setPuntajeAlumno] = useState(0);
    const [ranking, setRanking] = useState([]);
    
    useEffect(() => { 
        if (!tarea || !nombreAlumno) navigate('/');
    }, [tarea, nombreAlumno, navigate]);

    useEffect(() => {
        if (!tarea || !nombreAlumno || yaConectado.current) return;
        
        yaConectado.current = true;
        socket.emit('estudiante:unirse', { tareaId: tarea.id, nombreAlumno });

        socket.on('juego:iniciar', (data) => {
            if (data.tareaId === tarea.id) {
                setEstadoServer('jugando');
                setIndiceServer(data.indice);
                setRespuestaEnviada(false);
                setPuntajeAlumno(0);
                setRanking([]);
            }
        });

        socket.on('juego:siguientePregunta', (data) => {
            if (data.tareaId === tarea.id) {
                setIndiceServer(data.indice);
                setRespuestaEnviada(false);
            }
        });

        socket.on('juego:terminar', (data) => {
            if (data.tareaId === tarea.id) setEstadoServer('final');
        });

        socket.on('juego:finalizado', (data) => {
            setRanking(data.ranking);
            setPuntajeAlumno(data.ranking.find(r => r.nombre === nombreAlumno)?.puntaje || 0);
            setEstadoServer('final');
        });

        return () => {
            socket.emit('estudiante:salir', { tareaId: tarea.id, nombreAlumno });
            socket.off('juego:iniciar');
            socket.off('juego:siguientePregunta');
            socket.off('juego:terminar');
            socket.off('juego:finalizado');
            yaConectado.current = false;
        };
    }, [tarea, nombreAlumno]);

    const responder = (indexOpcion) => {
        setRespuestaEnviada(true);
        const pregunta = tarea.questions[indiceServer];

        const correcta = indexOpcion === pregunta?.correctOptionIndex;
        if (correcta) setPuntajeAlumno(p => p + 1);

        socket.emit('estudiante:responder', {
            tareaId: tarea.id,
            nombreAlumno,
            indice: indiceServer,
            respuesta: indexOpcion,
            correcta
        });
    };

    if (!tarea) return null;


    /* === ESTADO LOBBY === */
    if (estadoServer === 'lobby') {
        return (
            <div className="estudiante-live-container estudiante-live-waiting">
                <div className="title-and-icon-wrapper"> 
                    <span className="icon-status">⏳</span>
                    <h1>Esperando al Maestro...</h1>
                </div>
                <p>Jugando como: <b>{nombreAlumno}</b></p>
            </div>
        );
    }

    /* === ESTADO FINAL === */
    if (estadoServer === 'final') {
        const pos = ranking.findIndex(r => r.nombre === nombreAlumno) + 1;
        const medalla = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : '🎖️';

        return (
            <div className="estudiante-live-container pantalla-final">
                <div className="tarjeta-puntaje-final">
                    <h1 style={{fontSize:'3rem'}}>{medalla}</h1>
                    <h2>Tu Puntaje</h2>
                    <p className="puntaje-numero">{puntajeAlumno}</p>
                    <p>de {tarea.questions.length}</p>
                    <p>Posición: <b>#{pos}</b></p>
                </div>

                <div className="ranking-lista">
                    <h3>🏆 Ranking</h3>
                    {ranking.map((e,i) => (
                        <div key={i} className={`ranking-item ${e.nombre === nombreAlumno ? 'alumno-actual':''}`}>
                            <span>{i+1}. {e.nombre}</span>
                            <span>{e.puntaje} pts</span>
                        </div>
                    ))}
                </div>

                <button onClick={()=>navigate('/')} className="btn-salir">Salir</button>
            </div>
        );
    }


    /* === JUGANDO === */
    const preguntaActual = tarea.questions[indiceServer];
    if (!preguntaActual) return <h2>Esperando pregunta...</h2>;

    if (respuestaEnviada) {
        return (
              <div className="estudiante-live-container estudiante-live-waiting">
    <div className="title-and-icon-wrapper"> 
        <span className="icon-status">✅</span>
        <h1>Respuesta Enviada</h1>
    </div>
    <p>Espera a que el maestro cambie la pregunta...</p>
</div>


        );
    }


    return (
        <div className="estudiante-live-container">

            <h2 style={{textAlign:'center'}}>{preguntaActual.question}</h2>

            
            {preguntaActual.media?.type === 'image' && (
                <img
                    src={preguntaActual.media.url} 
                    alt="pregunta"
                    className="pregunta-media" /* <-- CLASE CSS APLICADA */
                />
            )}

            <div className="estudiante-live-buttons-grid">
                {preguntaActual.options.map((op,i)=>(
                    <button key={i} className={`estudiante-live-answer-btn estudiante-live-color-${i}`} onClick={()=>responder(i)}>
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default JuegoEnVivoEstudiante;