const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');
const jwt = require('jsonwebtoken');

const logger = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const student = await Student.authenticate(email, password);
        if (student) {
            const token = jwt.sign({ userId: student._id, type: "student", userData: student }, 'secret key');
            res.json({ token, userData: student });
            next()
        } else {
            const tutor = await Tutor.authenticate(email, password);
            if(tutor) {
                const token = jwt.sign({ userId: tutor._id, type: "tutor", userData: tutor }, 'secret key');
                res.json({ token, userData: tutor });
                next()
            } else {
                res.status(404).send('Not found');
                console.log('Not found');
            }
        }
    } catch (error) {
        res.status(500).send('server error');
        next(error);
    }
}

module.exports = logger;