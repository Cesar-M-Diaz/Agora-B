const epayco = require('epayco-sdk-node')({
  apiKey: 'a4aa69c0913124a45aaf2ff8dd0e031d',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

const Student = require('../models/student.model');
const Payment = require('../models/payment.model');

async function addCard(req, res) {
  // first creates card using card info
  // then uses to add the card to new user
  // token_card
  // customer_id
  const { cardInfo, epayco_customer_id: customer_id } = req.body;
  try {
    const token = await epayco.token.create(cardInfo);
    console.log(token);
    const { id: token_card } = token;
    const add_customer_info = { customer_id, token_card };
    const updatedCustomer = await epayco.customers.addNewToken(add_customer_info);
    console.log(updatedCustomer);
    res.status(201).json({ updatedCustomer });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
}

async function deleteCard(req, res) {
  // uses franchise, mask, and customerid
  //franchise : "visa",
  //mask : "457562******0326",
  //customer_id:"id_customer"
  const { epayco_customer_id: customer_id, franchise, mask } = req.body;
  const delete_customer_info = { customer_id, franchise, mask };
  try {
    const customer = await epayco.customers.delete(delete_customer_info);
    res.status(201).json({ customer });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
}

async function getCustomer(req, res) {
  const { epayco_customer_id: customerId } = req.body;
  try {
    const customer = await epayco.customers.get(customerId);
    res.status(201).json({ customer });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
}

async function payment(req, res) {
  const { cardInfo, customerInfo, user_id, paymentInfo, currentPaymentData } = req.body;
  try {
    if (!currentPaymentData) {
      // get card token
      const token = await epayco.token.create(cardInfo);
      const { id: token_card } = token;
      // get created customer
      const customer = await epayco.customers.create({ ...customerInfo, token_card });
      const {
        data: { customerId: customer_id },
      } = customer;
      const filter = { _id: user_id };
      const update = { epaycoCustomerId: customer_id };
      // add the epayco Customer id
      await Student.findOneAndUpdate(filter, update);

      // make payment
      const { data: charge } = await epayco.charge.create({ ...paymentInfo, ...customerInfo, customer_id, token_card });

      // save payment schema
      const newPayment = new Payment({
        ...charge,
        student_id: user_id,
        epayco_customer_id: customer_id,
      });
      const payment = await newPayment.save();
      res.status(201).json({ payment });
    } else {
      // make payment
      const { data: charge } = await epayco.charge.create(currentPaymentData);

      // save payment schema
      const newPayment = new Payment({
        ...charge,
        student_id: user_id,
        epayco_customer_id: currentPaymentData.customer_id,
      });
      const payment = await newPayment.save();
      res.status(201).json({ payment });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error.message);
  }
}

module.exports = { payment, addCard, getCustomer, deleteCard };
