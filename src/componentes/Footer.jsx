import React from 'react';

const Footer = () => (
  <footer className="main-footer">
    <style>{`
      .main-footer {
        background: linear-gradient(135deg, #243B55 0%, #1488CC 50%, #6BCB77 100%);
        color: white;
        padding: 50px 20px 20px;
        margin-top: auto;
        font-family: 'Quicksand', 'Varela Round', sans-serif;
        /* IMPORTANTE: Evita que el padding agrande el ancho total */
        box-sizing: border-box; 
      }
      
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap; /* Permite que bajen si no hay espacio */
        gap: 40px;
        margin-bottom: 30px;
      }

      /* CONFIGURACIÓN DE COLUMNAS */
      .col-left, .col-center, .col-right {
        flex: 1; /* Todos intentan ocupar el mismo espacio */
        min-width: 260px; /* Ancho mínimo antes de bajar a la siguiente línea */
      }

      .col-left { text-align: left; }
      .col-center { text-align: center; }
      .col-right { text-align: right; }

      /* TÍTULOS */
      h4 {
        margin-bottom: 20px;
        color: #FFD93D; 
        font-size: 1.4rem;
        font-weight: 800;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2); 
      }

      p {
        font-size: 0.95rem;
        line-height: 1.6;
        color: #f0f0f0;
      }

      /* LISTAS */
      .info-list {
        list-style: none; 
        padding: 0;
        margin: 0;
      }
      
      .info-list li {
        margin-bottom: 12px;
        color: #e0e0e0;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* CREADORAS */
      .creator-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        /* En escritorio alinea a la derecha, en móvil cambiaremos esto */
        align-items: flex-end; 
      }
      
      .creator-item {
        display: flex;
        flex-direction: column;
      }

      .creator-item strong {
        display: block;
        font-size: 1rem;
        color: #fff;
        margin-bottom: 4px;
      }
      
      .creator-email {
        color: #dff9fb; 
        text-decoration: none;
        font-size: 0.9rem;
        
        /* MAGIA RESPONSIVA PARA CORREOS LARGOS: */
        word-break: break-word; 
        overflow-wrap: break-word;
        max-width: 100%;
      }
      
      .creator-email:hover {
        color: #FFD93D;
        text-decoration: underline;
      }

      .footer-bottom {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid rgba(255,255,255,0.2);
        font-size: 0.85rem;
        opacity: 0.8;
      }

      /* --- RESPONSIVIDAD (MÓVIL) --- */
      @media (max-width: 850px) {
        .footer-content {
          flex-direction: column; /* Apila todo verticalmente */
          align-items: center; /* Centra los bloques */
          gap: 50px; /* Más espacio entre bloques apilados */
        }

        .col-left, .col-center, .col-right {
          text-align: center; /* Todo el texto centrado */
          width: 100%; /* Ocupar todo el ancho disponible */
          min-width: auto;
          padding: 0 10px; /* Un poco de aire a los costados */
        }

        /* Centrar la lista de la izquierda */
        .info-list li {
          justify-content: center;
        }

        /* Centrar la lista de creadoras */
        .creator-list {
          align-items: center; /* Fuerza a centrarse en móvil */
        }
      }
    `}</style>

    <div className="footer-content">
  
      <div className="col-left">
        <h4>Ofrecemos</h4>
        <ul className="info-list">
          <li>🎮 Juegos Didácticos</li>
          <li>📖 Cuentos Infantiles</li>
          <li>🎨 Dibujos para Colorear</li>
          <li>🧩 Adivinanzas</li>
          <li style={{ marginTop: '10px', fontWeight: 'bold', color: '#fff' }}>
            ✨ ¡Y muchas sorpresas más! ✨
          </li>
        </ul>
      </div>

      <div className="col-center">
        <h4>Saltamontes 🦗</h4>
        <p style={{maxWidth: '400px', margin: '0 auto'}}>
          ¡Dando grandes saltos en el aprendizaje! <br/>
          Un espacio digital creado con amor para despertar 
          la curiosidad y la imaginación.
        </p>
      </div>

      <div className="col-right">
        <h4>Contáctanos</h4>
        <div className="creator-list">
          
          <div className="creator-item">
            <strong>Almirón Camila</strong>
            {/* Corregido el .co a .com */}
            <a href="mailto:almironcamila848@gmail.com" className="creator-email">almironcamila848@gmail.com</a>
          </div>

          <div className="creator-item">
            <strong>Hernandez Solana</strong>
            <a href="mailto:hernandezsolana08@gmail.com" className="creator-email">hernandezsolana08@gmail.com</a>
          </div>

          <div className="creator-item">
            <strong>Pérez Gimena</strong>
            <a href="mailto:perezgimena295@gmail.com" className="creator-email">perezgimena295@gmail.com</a>
          </div>

        </div>
      </div>

    </div>

    <div className="footer-bottom">
      <p>© 2025 Saltamontes, Plataforma Educativa. Todos los derechos reservados</p>
    </div>
  </footer>
);

export default Footer;