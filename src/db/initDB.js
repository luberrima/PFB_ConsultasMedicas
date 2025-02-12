import path from 'path';
import { getPool } from './getPool.js';
import { MYSQL_DATABASE} from '../../env.js';
/*import { createPathUtil, deletePathUtil } from '../utils/foldersUtils.js';*/

export const initDb = async () => {
	try {
		// Obtener el pool de conexiones
		const pool = await getPool();

		// Poner la DDBB en uso
		console.log('Poniendo en uso la base de datos 📑');
		await pool.query(`USE ${MYSQL_DATABASE}`);
		console.log('Base de datos en uso ✅ 📑');

		// Borrar las tablas si existen
		console.log('Borrando tablas existentes 🗑 📑');
		await pool.query(
			'DROP TABLE IF EXISTS replys, documents, consultations, doctors,users;'
		);
		console.log('Tablas borradas ✅ 📑');

		// Crear las tablas
		console.log('Creando tablas de nuevo 📑');
		// Crear tabla users
		await pool.query(`
 CREATE TABLE users (
        id CHAR(36) PRIMARY KEY NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(90) NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password CHAR(60) NOT NULL,
        avatar CHAR(40) DEFAULT NULL,
	    bio VARCHAR(250) NULL DEFAULT NULL,
        active BOOLEAN DEFAULT FALSE,
        registrationCode CHAR(15) DEFAULT NULL,
        recoveryPassCode CHAR(15) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `);

	// Crear tabla doctors
	await pool.query(`
        CREATE TABLE doctors (
        id CHAR(36) PRIMARY KEY NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(90) NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password CHAR(60) NOT NULL,
        avatar CHAR(40) DEFAULT NULL,
	    bio VARCHAR(250) NULL DEFAULT NULL,
	    skills VARCHAR(50) DEFAULT NULL,
        collegeNumber CHAR(40) DEFAULT NULL,
        dateOfCollege TIMESTAMP DEFAULT NULL,
        active BOOLEAN DEFAULT FALSE,
	    validate BOOLEAN DEFAULT FALSE,
        registrationCode CHAR(15) DEFAULT NULL,
        recoveryPassCode CHAR(15) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `);

     // Crear tabla consultations
		await pool.query(`
      CREATE TABLE consultations (
        id CHAR(36) PRIMARY KEY NOT NULL,
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        userId CHAR(36) NOT NULL,
	    doctorId CHAR(36) DEFAULT NULL,
	    diagnostic TEXT NULL,
	    vote CHAR(1) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	    FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE SET NULL
      );
    `);

		// Crear tabla replys
		await pool.query(`
      CREATE TABLE replys (
        id CHAR(36) PRIMARY KEY NOT NULL,
        reply TEXT NOT NULL,
	    consultationsId CHAR(36) NOT NULL,
        userId CHAR(36) DEFAULT NULL,
	    doctorId CHAR(36) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	    FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
	    FOREIGN KEY (consultationsId) REFERENCES consultations(id) ON DELETE CASCADE
      );
    `);


      await pool.query(`
      CREATE TABLE documents (
        id CHAR(36) PRIMARY KEY NOT NULL,
        name VARCHAR(40) NOT NULL,
        consultationsId CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (consultationsId) REFERENCES consultations(id) ON DELETE CASCADE
      );
    `);



		console.log('Tablas creadas ✅ 📑');

		/*const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
		// Borramos el directorio uploads y todo su contenido
		console.log('Borrando directorio de subida 🗑 📂');
		await deletePathUtil(uploadsDir);
		console.log('Directorio de subida borrado ✅ 📂');

		// Crear el directorio uploads y sus subdirectorios users y tweets
		console.log('Creando directorios de subida 📂');
		await createPathUtil(uploadsDir);
		const avatarsDir = path.join(uploadsDir, 'avatars');
		await createPathUtil(avatarsDir);
		const entriesDir = path.join(uploadsDir, 'entries');
		await createPathUtil(entriesDir);
		console.log('Directorios de subida creados ✅ 📂');*/

		console.log('Todo ha ido bien 🚀');

		process.exit(0);
	} catch (error) {
		console.error('Error al inicializar la base de datos');
        console.log(error);
		process.exit(1);
	}
};

initDb();
