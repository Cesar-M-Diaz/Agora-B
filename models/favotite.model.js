const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    student_id : {
        type: String,
        required: true
    },
    tutor_id :{
        type: String,
        required: true
    },

})

const Favorite = mongoose.model("Favorite", favoriteSchema)
module.exports = Favorite