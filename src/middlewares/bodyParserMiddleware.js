export const bodyParserMiddleware = (req, res) => {
    let data = req.body;

    res.send({
        message: `Petición recibida`,
        data: data,
    });
};
