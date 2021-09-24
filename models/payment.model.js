const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    pay_method : {
        type: String,
        required: true
    },
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    tutorship_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorship",
        required: true,
    },
    comment: String
})

const Payment = mongoose.model("Payment", paymentSchema)
module.exports = Payment