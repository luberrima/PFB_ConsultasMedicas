import React, { useState } from "react";
import ayudaImg from "../assets/ayuda.svg"; 


export const ContactPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="contact-container">
      
      <h2 className="contact-title">Contacto</h2>

      <p className="contact-text">
        En <strong>Good Doctor</strong>, estamos aquí para ayudarte en lo que necesites. 
        Nuestro equipo está comprometido con tu bienestar y queremos ofrecerte la mejor experiencia posible.
      </p>

      <p className="contact-text">
        Si tienes dudas sobre cómo usar la plataforma, revisa nuestras preguntas frecuentes o contáctanos.
      </p>

      {/* Información de Contacto */}
      <div className="contact-info">
        <h3 className="contact-title">Información de Contacto</h3>
        <p><strong>Dirección:</strong> Calle Falsa 123, A Coruña, España</p>
        <p><strong>Email:</strong> <a href="mailto:contacto@gooddoctor.com">contacto@gooddoctor.com</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+34912345678">+34 912 345 678</a></p>
        <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00</p>
      </div>

      {/* Preguntas Frecuentes */}
      <div className="faq-section">
        <h3 className="contact-title">Preguntas Frecuentes</h3>

        {faqData.map((item, index) => (
          <div key={index}>
            <button 
              onClick={() => toggleQuestion(index)} 
              className="faq-question" 
              aria-expanded={openQuestion === index ? "true" : "false"}
            >
              {item.question}
              <span>{openQuestion === index ? "▲" : "▼"}</span>
            </button>
            <div className={`faq-answer ${openQuestion === index ? "show" : ""}`}>
              {openQuestion === index && <p>{item.answer}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Imagen final */}
      <img 
        src={ayudaImg} 
        alt="Estamos aquí para ayudarte" 
        className="contact-image" 
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

export default ContactPage;
