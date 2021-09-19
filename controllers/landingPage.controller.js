const mongoose = require('mongoose')
const Categories = require("../models/categories.model");
const Tutor = require("../models/tutor.model");


const tutorsCardInfo = async (req, res) => {
  try {
    const getCategories = await Categories.find();
    const categories = [];
    getCategories.map((e) => categories.push(e.subject));
    
    const tutors=[]
    for (let i=0; i<categories.length; i++){
      tutors[i]={
        category : categories[i],
        tutors : await Tutor.find({focus: categories[i]}, ['name', 'profile_photo', 'profession', 'focus', 'rating']).sort({rating : -1}).limit(4)
      }
    }
    

  res.send({categories,tutors});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



module.exports =  {tutorsCardInfo};
