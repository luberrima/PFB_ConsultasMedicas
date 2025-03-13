import React from "react";
import appleIcon from "../assets/favicon/favicon.svg"; // Ruta correcta de la manzanitay

export const LegalWarning = () => {
  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>
         Aviso Legal 
      </h2>

      <p style={styles.commonText}>
        En <strong>Good Doctor</strong>, nos comprometemos a ofrecer un servicio seguro y transparente.  
        Queremos que tengas claro cómo funciona esta plataforma y cuáles son tus derechos y responsabilidades.  
        Este documento no es solo una formalidad, sino una garantía de confianza y compromiso.  
      </p>

      {/* Identificación del Responsable */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>1. Identificación del Responsable</h3>
        <p><strong>Nombre:</strong> Good Doctor S.L</p>
        <p><strong>Dirección:</strong> Calle Falsa 123, A Coruña, España</p>
        <p><strong>Email:</strong> <a href="mailto:contacto@gooddoctor.com" style={styles.link}>contacto@gooddoctor.com</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+34912345678" style={styles.link}>+34 912 345 678</a></p>
      </div>

      {/* Condiciones de Uso */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>2. Condiciones de Uso</h3>
        <p>
          Puedes usar esta web con total libertad, pero con responsabilidad.  
           No aceptamos trolls, spammers ni consultas médicas basadas en horóscopos.  
          
        </p>
      </div>

      {/* Protección de Datos */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>3. Protección de Datos</h3>
        <p>
          Cumplimos con el Reglamento General de Protección de Datos (RGPD).  
           No venderemos tus datos, ni siquiera por una pizza.   
           No te enviaremos spam, a menos que quieras recibir memes médicos.  
           Si tienes dudas, contáctanos en <a href="/contacto" style={styles.link}>Contacto</a>.
        </p>
      </div>

      {/* Propiedad Intelectual */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>4. Propiedad Intelectual</h3>
        <p>  
          Todos los contenidos de esta web (textos, imágenes, logotipos) están protegidos por derechos de autor. 
          No se permite su uso sin autorización.
        </p>
      </div>

      {/* Exclusión de Responsabilidad */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>5. Exclusión de Responsabilidad</h3>
        <p>
           Good Doctor S.L no se hace responsable por el mal uso de la información publicada ni por problemas derivados del uso de la plataforma.
        </p>
      </div>

      {/* Legislación Aplicable */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>6. Legislación Aplicable</h3>
        <p>
           Este Aviso Legal se rige por la legislación española y europea vigente.  
           Si quieres demandarnos, mejor tráenos chocolate y lo hablamos con calma.  
        </p>
      </div>

      {/* Mensaje Final */}
      <div style={styles.finalMessage}>
        <p>
        Wow...Has llegado hasta el final del texto.
         Ahora puedes decir con orgullo que has leído un Aviso Legal entero, algo que ni siquiera nuestros programadores hacen sin café en mano.
         Recuerda, cuida tu salud, ríete mucho y come muchas manzanas.

          <strong>  ¡Toma, te la mereces!</strong>  
          <img src={appleIcon} alt="Good Doctor" style={styles.inlineIcon} />
        </p>
      </div>

    </div>
  );
};

//**Estilos para lucía**
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "30px",
    color: "#002F6C",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  commonText: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "500",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  section: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "left",
    borderLeft: "6px solid #002F6C",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)"
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#D71E28",
    fontWeight: "bold",
  },
  link: {
    color: "#D71E28",
    textDecoration: "none",
    fontWeight: "bold",
  },
  finalMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#333",
    fontWeight: "500",
    marginTop: "40px",
    padding: "10px",
  },
  inlineIcon: {
    width: "20px",  
    marginLeft: "5px", 
    verticalAlign: "middle" 
  }
};
