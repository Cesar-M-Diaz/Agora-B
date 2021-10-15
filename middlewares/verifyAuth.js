const jwt = require('jsonwebtoken')

const verifyAuth = (req, res, next) => {
    try {
        const { token } = req.body;
        req.currentUser = jwt.verify(token, 'secret key');
        next()
    } catch (error) {
        res.status(500).send('Error de verificacion', error)
    }    
}

module.exports = verifyAuth; 