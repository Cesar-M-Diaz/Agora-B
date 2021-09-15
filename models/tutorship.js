const mongoose = require('mongoose')

const tutorshipSchema = mongoose.Schema({
    tutor_id :{
        type: String,
        required: true
    },   
    student_id : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    }
    
})

const Tutorship = mongoose.model("Tutorship", tutorshipSchema)
module.exports = Tutorship