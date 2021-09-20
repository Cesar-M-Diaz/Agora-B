const mongoose = require('mongoose')

const tutorshipSchema = mongoose.Schema({
    tutor_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorship",
        required: true,
    },   
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
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