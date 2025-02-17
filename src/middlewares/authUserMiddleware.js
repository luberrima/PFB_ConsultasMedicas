//Este es solo un middleleware falso para las pruebas.

export const  authUserMiddleware = (req, res,next) => {
    let data = req.body;
    next();

};