## 📌 Descripción del Proyecto

Consultas Médicas Online es una plataforma diseñada para conectar pacientes y doctores de manera rápida y eficiente a través de Internet. Los pacientes pueden buscar médicos por especialidad y programar consultas, mientras que los médicos pueden gestionar y responder a las consultas de los pacientes. La plataforma permite la interacción segura entre ambos tipos de usuarios, facilitando la atención médica en línea.

## 💻 Enlace a Wireframe

https://www.figma.com/design/8KbufN3pFNyJ7peSqSUaCg/good-doctor?node-id=0-1&t=xfwRB8WJGqWMy5Gz-1

## 🚀 Características Principales

- 👤 **Usuario No Registrado:**
  Los usuarios no registrados pueden visualizar la landing page, registrarse con validación por correo electrónico e iniciar sesión con recuperación de contraseña.

- 🏥 **Usuarios Pacientes:**
  Los pacientes pueden ver y gestionar sus consultas, realizar búsquedas por palabra clave, especialidad o gravedad, ordenar resultados, acceder a detalles de consultas y médicos, gestionar su perfil, crear y eliminar consultas sin respuestas, responder sus propias consultas y valorar respuestas médicas.

- 👨‍⚕️ **Usuarios Médicos:**
  Los médicos pueden ver la lista de consultas disponibles, filtrar y ordenar como los pacientes, acceder a detalles de consultas, gestionar su perfil profesional, consultar su histórico de consultas, responder consultas dentro de su especialidad o asignadas, eliminar respuestas propias sin valoración y visualizar la lista de médicos con su media de valoraciones.

## 🛠 Tecnologías Utilizadas

- **Backend:** Node.js con Express.js

  - **Base de datos:** MySQL con mysql2

  - **Autenticación:** JSON Web Token (jsonwebtoken), bcrypt para hash de contraseñas

  - **Validaciones:** Joi

  - **Manejo de archivos:** express-fileupload

  - **Configuración y seguridad:** dotenv, cors, crypto, randomstring

  - **Utilidades:** path

  - **Desarrollo:** Morgan y Nodemon (solo en desarrollo)

- **Frontend:** React

## 📌 Instalación y Configuración (Back End)

**Clonar el repositorio:**

> git clone git@github.com:luberrima/PFB_ConsultasMedicas.git

**Instalar las dependencias:**

> npm install

**Configurar las variables de entorno:**

> Copiar el archivo .env.example y renombrarlo a .env. Completar los valores según la configuración del entorno.

**Ejecutar la base de datos:**

> npm run initDb

**Iniciar el servidor:**

> npm start

## 📌 Instalación y Configuración (Front End)

**Clonar el repositorio:**

> git clone git@github.com:luberrima/PFB_ConsultasMedicas_Front.git

**Instalar las dependencias:**

> npm install

**Construir la aplicación para producción :**

> npm run build

- Este comando crea el directorio `dist` con los archivos optimizados para producción.
- Todos los documentos de la app pasan por un proceso de empaquetado y optimización.
- El código escrito en JSX se compila a código compatible con el navegador.
- Los archivos CSS se combinan en un solo archivo.
- Las imágenes y otros recursos se comprimen(minificación) y se copian en el directorio de salida.

##
