const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    epaycoCustomerId: {
      type: String,
      required: true,
    },
    ref_payco: {
      type: String,
      unique: true,
      required: true,
    },
    factura: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    valor: {
      type: Number,
      required: true,
    },
    iva: {
      type: Number,
    },
    valorneto: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;
