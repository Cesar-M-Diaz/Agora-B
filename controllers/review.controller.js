const Review = require('../models/review.model');
const Tutorship = require('../models/tutorship.model');

const postReview = async (req, res) => {
    try {
        const { rating, tutor, student, review, tutorship } = req.body
        const currentTutorship = await Tutorship.findOne({"_id": tutorship});
        if(currentTutorship.isRated) {
            const Email = async() => {
                console.log('hola')
                const gettutorship = await Tutorship.find({_id: tutorship})
                .populate('tutor_id',['name', 'email', 'focus'])
                .populate('student_id',['name', 'email']);
                console.log(gettutorship)
    
                sendEmail({
                    user: gettutorship[0].tutor_id,
                    template: 'd-3ca474384866493e9596950eefed11ec',
                    template_data: {
                        "student": gettutorship[0].student_id.name,
                        "tutor": gettutorship[0].tutor_id.name,
                        "date": new Date(gettutorship[0].date).toDateString(),
                        "review": review,
                        "stars": rating,
                    }
                });
    
            Email();
            }
            res.status(200).send('Review already sent')}
        const newReview = await Review.create({comment: review, rating: rating, student_id: student, tutor_id: tutor, tutorship_id: tutorship})
        await newReview.save()
        await Tutorship.updateOne({"_id": tutorship}, {$set: { isRated: true }})
        res.status(200).json(newReview);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = postReview;