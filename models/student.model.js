const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    match: /.+\@.+\..+/,
    required: [true, "El email es requerido"],
    validate: {
      validator: async function(value) {
        const student = await Student.findOne({ email: value })
        return student === null
      },
      message: "Email duplicado"
    }
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  profile_photo: String
})

// middlewares

// Encrypts password before saving
studentSchema.pre("save", async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (err) {
    next(err)
  }
})

// métodos estáticos

// Bcrypt auth method
studentSchema.statics.authenticate = async (email, password) => {
  const student = await Student.findOne({ email })
  if (student) {
    const result = await bcrypt.compare(password, student.password)
    return result === true ? student : null
  }

  return null
}

const Student = mongoose.model("students", studentSchema)

module.exports = Student