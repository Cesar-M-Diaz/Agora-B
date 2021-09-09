const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const tutorSchema = mongoose.Schema({
  email: {
    type: String,
    match: /.+\@.+\..+/,
    required: [true, "El email es requerido"],
    validate: {
      validator: async function(value) {
        const tutor = await Tutor.findOne({ email: value })
        return tutor === null
      },
      message: "Email duplicado"
    }
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  profile_photo: String,
  description: String,
  profession: {
      type: String,
      required: true
  },
  focus: String,
  rating: Number
})

// middlewares - Chain of Responsability - no se puede utilizar arrow function
tutorSchema.pre("save", async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (err) {
    next(err)
  }
})

// métodos estáticos
tutorSchema.statics.authenticate = async (email, password) => {
  const tutor = await Tutor.findOne({ email })
  if (tutor) {
    const result = await bcrypt.compare(password, tutor.password)
    return result === true ? tutor : null
  }

  return null
}

const Tutor = mongoose.model("tutors", tutorSchema)

module.exports = Tutor