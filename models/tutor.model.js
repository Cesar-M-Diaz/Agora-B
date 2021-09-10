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
  const user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    return result === true ? user : null;
  }

  return null;
};

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
