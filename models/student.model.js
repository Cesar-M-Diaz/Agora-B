const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, 'Email is required'],
      validate: {
        validator: async function (value) {
          const student = await Student.findOne({ email: value });
          return student === null;
        },
        message: 'Duplicated Email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    profile_photo: String,
  },
  {
    timestamps: true,
  },
);

studentSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

studentSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    return result === true ? user : null;
  }

  return null;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
