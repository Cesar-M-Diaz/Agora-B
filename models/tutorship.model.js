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
      default: 'Created',
    },
    description: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now(),
    },
    ccompleted_date: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

const Tutorship = mongoose.model('Tutorship', tutorshipSchema);
module.exports = Tutorship;
