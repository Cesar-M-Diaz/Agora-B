const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    pay_method : {
        type: String,
        required: true
    },
    student_id : {
        type: String,
        required: true
    },
    tutorship_id :{
        type: String,
        required: true
    },
    comment: String
})

const Payment = mongoose.model("Payment", paymentSchema)
module.exports = Payment