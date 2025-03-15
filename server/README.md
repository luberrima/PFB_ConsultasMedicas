# 🚀 Backend - Consultas Médicas Online

Este es el backend de la plataforma **Consultas Médicas Online**, desarrollado con **Node.js** y **Express.js**.

## 🛠 Tecnologías Utilizadas

-   **Base de datos:** MySQL con mysql2
-   **Autenticación:** JSON Web Token (jsonwebtoken), bcrypt para hash de contraseñas
-   **Validaciones:** Joi
-   **Manejo de archivos:** express-fileupload
-   **Configuración y seguridad:** dotenv, cors, crypto, randomstring
-   **Utilidades:** path
-   **Desarrollo:** Morgan y Nodemon (solo en desarrollo)

## 📥 Instalación y Configuración

### **Clonar el repositorio**

```
git clone git@github.com:luberrima/PFB_ConsultasMedicas.git
```

### **Instalar dependencias**

```
cd server
npm install
```

### **Configurar las variables de entorno**

-   Copia el archivo `.env.example` y renómbralo a `.env`.
-   Completa los valores según la configuración de tu entorno.

### **Iniciar la base de datos**

```
npm run initDb
```

### **Ejecutar el servidor**

```
npm start
```
