const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tutorSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, 'Email is required'],
      validate: {
        validator: async function (value) {
          const tutor = await Tutor.findOne({ email: value });
          return tutor === null;
        },
        message: 'Duplicated Email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    profile_photo: String,
    description: String,
    profession: String,
    focus: String,
    schedule: String,
    rating: Number,
  },
  {
    timestamps: true,
  },
);

tutorSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

tutorSchema.statics.authenticate = async (email, password) => {
  const tutor = await Tutor.findOne({ email });
  if (tutor) {
    const result = await bcrypt.compare(password, tutor.password);
    return result === true ? tutor : null;
  }

  return null;
};

const Tutor = mongoose.model('tutors', tutorSchema);

module.exports = Tutor;
