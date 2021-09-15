const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    comment : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        required : true
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

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review