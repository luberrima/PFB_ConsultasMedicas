import path from 'path';
import { getPool } from './getPool.js';
import { MYSQL_DATABASE,ADMIN_USER,ADMIN_EMAIL,ADMIN_PASSWORD} from '../../env.js';
import { registerUserService } from '../services/users/registerUserService.js';
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
			'DROP TABLE IF EXISTS replys, documents, consultations, doctors,users,skill;'
		);
		console.log('Tablas borradas ✅ 📑');

		// Crear las tablas
		console.log('Creando tablas de nuevo 📑');


    await pool.query(`
      CREATE TABLE skill (
      id INT AUTO_INCREMENT,
      Name VARCHAR(45) NOT NULL,
      PRIMARY KEY (id)
  );
`);

/*Aqui tenemos un problemita con la tabla skill o mas bien el problema es que usuario admin no deberia poder borrar 
ninguna skill si esta esta siendo usada por algun medico o consulta activa o archivada ya que en la informacion creara que el valor no sea devuelto
y no se podra selecionar Se deberia evaluar que en el caso de endpoint de borrado de una skill este forzado a seleccionar otra para que todos los datos sean pasado a la nueva skill*/




		/* Crear tabla users la tabla user engloba usuarios doctores y administradores
    El campo Active es para activar un usuario  y activar entre "" a un doctor pero hasta que en el campo validate de la tabla 
    doctors no lo valide un admin no tendra poder para coger casos ni aparecera como doctor en el listado
    */
		await pool.query(`
        CREATE TABLE users (
        id CHAR(36) PRIMARY KEY NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(90) NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password CHAR(60) NOT NULL,
        role ENUM("paciente", "doctor", "admin"),
        avatar CHAR(40) DEFAULT NULL,
	      bio VARCHAR(250) NULL DEFAULT NULL,
        active BOOLEAN DEFAULT FALSE,
        registrationCode CHAR(15) DEFAULT NULL,
        recoveryPassCode CHAR(15) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `);



	/* Crear tabla doctors datos extra necesarios para los doctores el campo validate es necesario para que el administrador sea quien haga la validacion final de que 
  la comprobacion de datos, este pueda validad al doctor.
  */
	await pool.query(`
        CREATE TABLE doctors (
        id CHAR(36) PRIMARY KEY NOT NULL,
        userid CHAR(36) NOT NULL,
	      skillId INT NOT NULL,
        collegeNumber CHAR(40) DEFAULT NULL,
        dateOfCollege TIMESTAMP DEFAULT NULL,
	      validate BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (skillId) REFERENCES skill(id)
        
      );
    `);


    /* Crear tabla consultations el campo diagnostico es el campo para finalizar la consulta y 
    sera el recipiente del diagnostico final, una vez dado el diagnostico se bloquearan las replys y se podra valorar
  */

		await pool.query(`
      CREATE TABLE consultations (
        id CHAR(36) PRIMARY KEY NOT NULL,
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        userId CHAR(36) NOT NULL,
        skillId INT NOT NULL,
        gravedad ENUM("Leve", "Normal", "Moderada","Grave","Urgente"),
	      doctorId CHAR(36) DEFAULT NULL,
	      diagnostic TEXT NULL,  
	      vote CHAR(1) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE, 
        FOREIGN KEY (skillId) REFERENCES skill(id)
      );
    `);

		// Crear tabla replys
		await pool.query(`
      CREATE TABLE replys (
        id CHAR(36) PRIMARY KEY NOT NULL,
        reply TEXT NOT NULL,
	      consultationsId CHAR(36) NOT NULL,
        userId CHAR(36) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	      FOREIGN KEY (consultationsId) REFERENCES consultations(id) ON DELETE CASCADE
      );
    `);

      /* la tabla de documentos que guardara toda la informacion relacionada con las consultas
      He desactivado el borrado en cascada ya que un problema grave es que si se borra la referencia de los archivos 
      podria pasar que se queden huerfanos por el servidor ocupando espacio inecesario entonces hasta.
      
      */



      await pool.query(`
      CREATE TABLE documents (
        id CHAR(36) PRIMARY KEY NOT NULL,
        name VARCHAR(40) NOT NULL,
        consultationsId CHAR(36),
        replyid CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (replyid) REFERENCES replys(id),
        FOREIGN KEY (consultationsId) REFERENCES consultations(id) 
  
      );
    `);

    // Insert usuarios admin (datos de admin en .env)

    const user = await registerUserService(ADMIN_USER, ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("usuario creado con Nombre ",ADMIN_USER);
    await pool.query(
      `UPDATE users SET role = ?, active = ?, registrationCode = '' WHERE id = ?`,
      ['admin', 1, user.id]
    );
    console.log(`usuario con Nombre ${ADMIN_USER} ha sido convertido a Administrador`);

    


    




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
