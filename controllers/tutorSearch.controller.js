const mongoose = require('mongoose')
const Tutor = require("../models/tutor.model");

const findTutors = async (req, res) => {

  
  
  try {
    const query = req.params.query
    const page = req.params.page || 1
    const regEx = new RegExp(query,"i")
    const count = await Tutor.count({$or:[{"focus": regEx}, {"name":{"$in":regEx }}]})
    const data = await Tutor.find({$or:[{"focus": regEx}, {"name":{"$in":regEx }}]},
      ['name', 'profile_photo', 'profession', 'focus', 'rating', 'description','price'])
      .sort({rating: -1})
      .skip((page-1)*9)
      .limit(9)
 
    res.json({
      count,
      page,
      data
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


module.exports =  {findTutors};