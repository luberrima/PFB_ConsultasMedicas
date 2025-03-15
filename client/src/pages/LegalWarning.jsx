import React from "react";
import appleIcon from "../assets/favicon/favicon.svg"; 


export const LegalWarning = () => {
  return (
    <div className="legal-container">
      
      <h2 className="legal-title">Aviso Legal</h2>

      <p className="legal-text">
        En <strong>Good Doctor</strong>, nos comprometemos a ofrecer un servicio seguro y transparente.  
        Queremos que tengas claro cómo funciona esta plataforma y cuáles son tus derechos y responsabilidades.  
        Este documento no es solo una formalidad, sino una garantía de confianza y compromiso.  
      </p>

      {/* Identificación del Responsable */}
      <div className="legal-section">
        <h3 className="legal-section-title">1. Identificación del Responsable</h3>
        <p><strong>Nombre:</strong> Good Doctor S.L</p>
        <p><strong>Dirección:</strong> Calle Falsa 123, A Coruña, España</p>
        <p><strong>Email:</strong> <a href="mailto:contacto@gooddoctor.com" className="legal-link">contacto@gooddoctor.com</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+34912345678" className="legal-link">+34 912 345 678</a></p>
      </div>

      {/* Condiciones de Uso */}
      <div className="legal-section">
        <h3 className="legal-section-title">2. Condiciones de Uso</h3>
        <p>
          Puedes usar esta web con total libertad, pero con responsabilidad.  
          No aceptamos trolls, spammers ni consultas médicas basadas en horóscopos.  
        </p>
      </div>

      {/* Protección de Datos */}
      <div className="legal-section">
        <h3 className="legal-section-title">3. Protección de Datos</h3>
        <p>
          Cumplimos con el Reglamento General de Protección de Datos (RGPD).  
          No venderemos tus datos, ni siquiera por una pizza.   
          No te enviaremos spam, a menos que quieras recibir memes médicos.  
          Si tienes dudas, contáctanos en <a href="/contacto" className="legal-link">nuestra página de contacto</a>.
        </p>
      </div>

      {/* Propiedad Intelectual */}
      <div className="legal-section">
        <h3 className="legal-section-title">4. Propiedad Intelectual</h3>
        <p>  
          Todos los contenidos de esta web (textos, imágenes, logotipos) están protegidos por derechos de autor. 
          No se permite su uso sin autorización.
        </p>
      </div>

      {/* Exclusión de Responsabilidad */}
      <div className="legal-section">
        <h3 className="legal-section-title">5. Exclusión de Responsabilidad</h3>
        <p>
          Good Doctor S.L no se hace responsable por el mal uso de la información publicada ni por problemas derivados del uso de la plataforma.
        </p>
      </div>

      {/* Legislación Aplicable */}
      <div className="legal-section">
        <h3 className="legal-section-title">6. Legislación Aplicable</h3>
        <p>
          Este Aviso Legal se rige por la legislación española y europea vigente.  
          Si quieres demandarnos, mejor tráenos chocolate y lo hablamos con calma.  
        </p>
      </div>

      {/* Mensaje Final */}
      <div className="legal-final-message">
        <p>
          Wow... Has llegado hasta el final del texto.  
          Ahora puedes decir con orgullo que has leído un Aviso Legal entero, algo que ni siquiera nuestros programadores hacen sin café en mano.  
          Recuerda, cuida tu salud, ríete mucho y come muchas manzanas.  
          <strong>¡Toma, te la mereces!</strong>  
          <img src={appleIcon} alt="Good Doctor" className="legal-inline-icon" />
        </p>
      </div>

    </div>
  );
};


