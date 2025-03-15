# Good Doctor

> **🩺 Consultas Médicas 🩺**  
> Proyecto de Fin de Bootcamp (Desarrollo Web)

## 📌 Descripción del Proyecto

Consultas Médicas Online es una plataforma diseñada para conectar pacientes y doctores de manera rápida y eficiente a través de Internet. Los pacientes pueden buscar médicos por especialidad y programar consultas, mientras que los médicos pueden gestionar y responder a las consultas de los pacientes, que pueden ser valoradas por los mismos. La plataforma permite la interacción segura entre ambos tipos de usuarios, facilitando la atención médica en línea.

## 💻 Wireframe

- [🔗 Ver Wireframe en Figma](https://www.figma.com/design/8KbufN3pFNyJ7peSqSUaCg/good-doctor?node-id=0-1&t=xfwRB8WJGqWMy5Gz-1)

## 🚀 Características Principales

- 👤 **Usuario No Registrado:**
  Los usuarios no registrados pueden visualizar la landing page, registrarse con validación por correo electrónico e iniciar sesión con recuperación de contraseña.

- 🏥 **Usuarios Pacientes:**
  Los pacientes pueden ver y gestionar sus consultas, acceder a detalles de consultas y médicos, gestionar su perfil, crear y eliminar consultas sin respuestas, responder sus propias consultas y valorar respuestas médicas.

- 👨‍⚕️ **Usuarios Médicos:**
  Los médicos pueden ver la lista de consultas disponibles, acceder a detalles de consultas, gestionar su perfil profesional, consultar su histórico de consultas, responder consultas dentro de su especialidad o asignadas, eliminar respuestas propias sin valoración y visualizar la lista de médicos con su media de valoraciones.

## 🛠 Tecnologías Utilizadas

### **Backend:** Node.js con Express.js

- **Base de datos:** MySQL con mysql2

- **Autenticación:** JSON Web Token (jsonwebtoken), bcrypt para hash de contraseñas

- **Validaciones:** Joi

- **Manejo de archivos:** express-fileupload

- **Configuración y seguridad:** dotenv, cors, crypto, randomstring

- **Utilidades:** path

- **Desarrollo:** Morgan y Nodemon (solo en desarrollo)

### **Frontend:** React con Vite

- **Librerías Principales:** React y ReactDOM

- **Enrutamiento:** React Router Dom

- **Manejo de formularios y validación:** React Hook Form y Joi

- **Manejo de Fechas:** Day.js

- **Autenticación:** JWT Decode

- **Notificaciones y feedback al usuario:** React Toastify

- **Manejo de errores:** React Error Boundary

- **Iconos:** React Icons y Google Icons

- **Configuración y herramientas de desarrollo:** Vite y ESLint con plugins para React y Hooks

## 🧰 Requisitos previos a la instalación

Antes de instalar y ejecutar la aplicación, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js** (versión recomendada: 18+).

- **npm**

- **MySQL** para la base de datos

## 📥 Instalación y Configuración

### **Clonar el repositorio:**

```
git clone git@github.com:luberrima/PFB_ConsultasMedicas.git
```

### 🗄️ Instalación y Configuración del BackEnd

**Instalar las dependencias en la carpeta server:**

```
npm install
```

**Configurar las variables de entorno:**

- Copiar el archivo `.env.example` y renombrarlo a `.env`.
- Completar los valores según la configuración del entorno.

**Ejecutar la base de datos:**

```
npm run initDb
```

**Iniciar el servidor:**

```
npm start
```

### 🖥️ Instalación y Configuración del Front End

**Instalar las dependencias en la carpeta client:**

```
npm install
```

**Configurar las variables de entorno:**

- Copiar el archivo `.env.example` y renombrarlo a `.env`.
- Completar los valores según la configuración del entorno.

**Construir la aplicación para producción :**

```
npm run build
```

- Este comando crea el directorio `dist` con los archivos optimizados para producción.
- Todos los documentos de la app pasan por un proceso de empaquetado y optimización.
- El código escrito en JSX se compila a código compatible con el navegador.
- Los archivos CSS se combinan en un solo archivo.
- Las imágenes y otros recursos se comprimen(minificación) y se copian en el directorio de salida.

## 👩🏼‍💻 Uso de la Aplicación

1. **Registro e inicio de sesión:**

   - Accede a la página principal y regístrate con tu correo electrónico.
   - Confirma tu cuenta a través del enlace enviado por correo.
   - Inicia sesión con tus credenciales.

2. **Pacientes:**

   - Explora los diferentes especialistas.
   - Crea una nueva consulta.
   - Visualiza y gestiona tus consultas.
   - Gestiona tu propio perfil.

3. **Doctores:**

   - Explora consultas disponibles.
   - Responde consultas dentro de tu especialidad.
   - Gestiona tu perfil profesional.

4. **Admin:**
   - Explora los diferentes usuarios.
   - Valida a los especialistas si sus datos son correctos.
   - Elimina usuarios si es debido.

## ⚙️ Futuras Implementaciones

- **Chat en las consultas:**
  - Socket: para hacer que la comunicación sea instantánea
  - Dayjs: para obtener más info sobre la fecha de envío de los mensajes
- **Especialidad de las consultas:** Permitir que un doctor asignado a una consulta, o que comparte la misma especialidad, tenga la capacidad de modificarla en caso de considerar que otro especialista es más adecuado. Esto podría darse tras evaluar al paciente y determinar que la consulta corresponde a una especialidad diferente.
- **Integración de video consultas:** Uso de WebRTC o integración con plataformas externas para permitir consultas médicas en tiempo real por videollamada.
- **Chat de asistencia en tiempo real:**
  - Integración con Tawk.to para ofrecer soporte en vivo.
  - Posibilidad de añadir un asistente con IA para responder consultas frecuentes.
- **Sistema de notificaciones en tiempo real:**
  - Notificaciones para recordar consultas programadas.
  - Alertas para nuevas respuestas o mensajes dentro de una consulta.
- **Beneficio económico:**
  - Hacer la app de pago y enviar parte de los beneficios a los médicos.
  - Anuncios en la pagina para ganar beneficios.
- **Registro** con Google, Facebook, X, etc ...

## 👩🏻‍🎓👨🏼‍🎓 Equipo del Proyecto

- **Lucía Beatriz Franco** _(Facilitadora)_
  - [LinkedIn](https://www.linkedin.com/in/luberrima?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)
  - [GitHub](https://github.com/luberrima)
- **Javi Navarro**
  - [LinkedIn](https://www.linkedin.com/in/javier-navarro-robles-948990ab/)
  - [GitHub](https://github.com/JavierNavarroRobles)
- **Rafa López**
  - [GitHub](hhttps://github.com/RafVianney)
- **Alejandro Andrés**
  - [LinkedIn](https://www.linkedin.com/in/alejandro-andres-sorribas-436868152?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
  - [GitHub](https://github.com/Vikingracer89)
- **Dámaris Mercado**
  - [LinkedIn](https://www.linkedin.com/in/damariscontilde/)
  - [GitHub](https://github.com/Damarisconweb)
- **Fran Bejarano**
  - [LinkedIn](https://www.linkedin.com/in/fran-bejarano-02793a333/)
  - [GitHub](https://github.com/Franollie)

##
