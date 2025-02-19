///import 'dotenv/config';

import { server } from './src/server.js';

import { PORT } from './env.js';

//console.log(process.env);

const puerto = PORT || 3001;

server.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto: ${puerto}`);
});
