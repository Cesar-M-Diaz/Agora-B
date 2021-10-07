const mongoose = require('mongoose');

const tutorshipSchema = mongoose.Schema(
  {
    tutor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorship',
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    date: {
      type: Date,
      required: true,
    },
    isRated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Tutorship = mongoose.model('Tutorship', tutorshipSchema);
module.exports = Tutorship;
