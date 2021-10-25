const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const Tutorship = require('../models/tutorship.model');
const sendEmail = require('../utils/sendEmail')

const createTutorship = async (req, res, next) => {
  try {
    const { email, tutor_id, date, time } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      const newDate = `${date}T${time}:00.000z`;
      const tutorship = await Tutorship.create({ student_id: student._id, date: newDate, tutor_id });
      const tutor = await Tutor.findOne({_id: tutor_id })
      res.status(200).json(tutorship);
      // Send Email Student
      sendEmail({
        user: student,
        template: 'd-c81fed9ad95d4740a44b1f7760976fe9',
        template_data: {
          "student": student.name,
          "tutor": tutor.name,
          "subject":tutor.focus,
          "date": newDate.slice(0,10),
          "status": "created but is pending for payment",
     
        }
      })
      // Send Email Tutor
      sendEmail({
        user: tutor,
        template: 'd-4347de2b9f6c4d129c7c53f5a29d99dd',
        template_data: {
          "student": student.name,
          "tutor": tutor.name,
          "date": newDate.slice(0,10),
          "status": "created but is pending for payment",
        }
      })
      next();
    } else {
      res.status(400).json({ message: 'Student email not found' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTutorships = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user =
      (await Student.findOne({ _id: id })) ||
      (await Tutor.findOne({ _id: id }));
    const userType = user.focus ? "tutor_id" : "student_id";
    const tutorships = await Tutorship.find({ [userType]: user.id }).sort({ date: 1 }).populate('tutor_id').populate('student_id').exec();
    res.status(200).json(tutorships);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const cancelTutorship = async (req, res) => {
  try {
    const { tutorship } = req.body;
    const { currentUser } = req;
    const currentTutorship = await Tutorship.findOne({ "_id": tutorship })
    if(currentTutorship.status !== "pending"){
      return res.status(400).send("Invalid request")
    }
    let userHasPermissions = false;
    if(currentUser.type === "student"){
      userHasPermissions = (currentTutorship.student_id.toString() === currentUser.userId)
    } else {
      userHasPermissions = (currentTutorship.tutor_id.toString() === currentUser.userId)
    }
    if(userHasPermissions){
      await Tutorship.updateOne({"_id": tutorship}, { $set: { status: "canceled" }})
      return res.status(200).send("Tutorship canceled successfully")
    }
    res.status(403).send("Forbidden")
  } catch (error) {
    res.status(500).send(error)
  }
}

const completeTutorship = async (req, res) => {
  try {
    const { tutorship } = req.body;
    const { currentUser } = req;
    const currentTutorship = await Tutorship.findOne({ "_id": tutorship })
    if(currentTutorship.status !== "accepted"){
      return res.status(400).send("Invalid request")
    }
    let userHasPermissions = false;
    if(currentUser.type === "student"){
      userHasPermissions = (currentTutorship.student_id.toString() === currentUser.userId)
    } else {
      userHasPermissions = (currentTutorship.tutor_id.toString() === currentUser.userId)
    }
    if(userHasPermissions){
      await Tutorship.updateOne({"_id": tutorship}, { $set: { status: "completed" }})
      return res.status(200).send("Tutorship completed successfully")
    }
    res.status(403).send("Forbidden")
  } catch (error) {
    res.status(500).send(error)
  }
}


const getTutorship = async (req, res) => {
  try {
    const {id} = req.params
    const tutorship = await Tutorship.find({_id: id})
    .populate('tutor_id',['name', 'email', 'focus'])
    .populate('student_id',['name', 'email']);
    res.send({tutorship});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



module.exports = { createTutorship, getTutorships, cancelTutorship, getTutorship, completeTutorship };
