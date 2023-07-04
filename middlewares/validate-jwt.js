const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {
    try {
        const token = req.header('x-token');
        
        if(!token) {
            return res.status(401).json({
                ok: false,
                msg: 'There is no token in the request'
            });
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
}

module.exports = {
    validateJWT
}