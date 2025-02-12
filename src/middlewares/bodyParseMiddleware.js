import express from 'express';

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    const {} = req.body;

    res.send();
});
