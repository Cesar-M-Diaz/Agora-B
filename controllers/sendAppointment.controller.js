const sendEmail = require('../utils/sendEmail')

const sendAppointment = (req,res) => {
  const {tutor, inputs, student} =req.body 
  sendEmail({
    user: tutor,
    template: 'd-c54f8b0df89b48c29688ca8d6c476188',
    template_data: {
      "tutor": tutor.name,
      "student": student.name,
      "subject": inputs.subject,
      "message": inputs.description,
      "date": inputs.date,
      "time": inputs.time,
      "email": student.email,
      "url": `https://project-agora.vercel.app/profile/create-tutorship/?email=${student.email}&date=${inputs.date}&time=${inputs.time}`
    }
  })
    
  res.status(201).json(tutor);
}

module.exports = {sendAppointment}