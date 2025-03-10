import React, { useState } from "react";
import ayudaImg from "../assets/ayuda.svg"; 

export const ContactPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>
        Contacto
      </h2>

     
      <p style={styles.commonText}>
        En <strong>Good Doctor</strong>, estamos aquí para ayudarte en lo que necesites. 
        Nuestro equipo está comprometido con tu bienestar y queremos ofrecerte la mejor experiencia posible.
      </p>

      <p style={styles.commonText}>
        Si tienes dudas sobre cómo usar la plataforma, revisa nuestras preguntas frecuentes o contáctanos.
      </p>

      
      <div style={styles.contactInfo}>
        <h3 style={styles.sectionTitle}>Información de Contacto</h3>
        <p><strong>Dirección:</strong> Calle Falsa 123, A Coruña, España</p>
        <p><strong>Email:</strong> <a href="mailto:contacto@gooddoctor.com" style={styles.link}>contacto@gooddoctor.com</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+34912345678" style={styles.link}>+34 912 345 678</a></p>
        <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00</p>
      </div>

      
      <div style={styles.faq}>
        <h3 style={styles.sectionTitle}>Preguntas Frecuentes</h3>

        {faqData.map((item, index) => (
          <div key={index} style={styles.questionContainer}>
            <button 
              onClick={() => toggleQuestion(index)} 
              style={styles.questionButton} 
              aria-expanded={openQuestion === index}
            >
              {item.question}
              <span>{openQuestion === index ? "▲" : "▼"}</span>
            </button>
            <div style={{ 
              ...styles.answer, 
              maxHeight: openQuestion === index ? "200px" : "0px", 
              opacity: openQuestion === index ? 1 : 0 
            }}>
              {openQuestion === index && <p>{item.answer}</p>}
            </div>
          </div>
        ))}
      </div>

      
      <img 
        src={ayudaImg} 
        alt="Estamos aquí para ayudarte" 
        style={styles.finalImage} 
      />
    </div>
  );
};


const faqData = [
  { question: "¿Cómo puedo realizar una consulta médica en línea?", answer: "Para hacer una consulta, inicia sesión, ve a la sección 'Hacer una consulta', describe tu problema y publícala para que los doctores la vean." },
  { question: "¿Cuánto tiempo tardan los doctores en responder?", answer: "Depende de la disponibilidad de los doctores. Normalmente, recibirás una respuesta en menos de 24 horas." },
  { question: "¿Cómo puedo valorar la respuesta de un doctor?", answer: "Después de recibir una respuesta, puedes calificarla con estrellas." },
  { question: "¿Puedo subir imágenes o documentos en mi consulta?", answer: "Sí, puedes adjuntar imágenes, análisis médicos o documentos relevantes para que el doctor tenga más información." },
  { question: "¿Cómo puedo convertirme en doctor en la plataforma?", answer: "Si eres médico titulado, puedes registrarte en la sección 'Médico', enviar tu información y ser verificado por nuestro equipo." },
];

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
  contactInfo: {
    backgroundColor: "#f8f9fa",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    textAlign: "left",
    fontSize: "16px",
    lineHeight: "1.8",
    borderLeft: "6px solid #002F6C",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)"
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#D71E28",
    fontWeight: "bold",
  },
  questionButton: {
    width: "100%",
    padding: "14px",
    textAlign: "left",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s",
    fontWeight: "bold",
    color: "#002F6C",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  answer: {
    overflow: "hidden",
    transition: "max-height 0.4s ease, opacity 0.4s ease",
    fontSize: "15px",
    padding: "10px",
    color: "#444",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    marginTop: "5px",
  },
  finalImage: {
    width: "100%",
    maxWidth: "400px",
    marginTop: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }
};


