const Review = require('../models/review.model');
const Tutorship = require('../models/tutorship.model');
const Tutor = require('../models/tutor.model');

const postReview = async (req, res) => {
    try {
        console.log('Entre al controller')
        const { rating, tutor, student, review, tutorship } = req.body
        const currentTutorship = await Tutorship.findOne({"_id": tutorship});
        if(currentTutorship.isRated) return res.status(200).send('Review already sent')
        const newReview = await Review.create({comment: review, rating: rating, student_id: student, tutor_id: tutor, tutorship_id: tutorship})
        await newReview.save()
        await Tutorship.updateOne({"_id": tutorship}, {$set: { isRated: true }})
        const reviews = await Review.find({tutor_id: tutor});
        const avg = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
        await Tutor.updateOne({"_id": tutor}, {$set: { rating: avg }});
        res.status(200).json(newReview);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = postReview;