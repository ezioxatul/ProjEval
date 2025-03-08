const valuatorModel = require("../Models/valuatorModel");
const sequelize = require("../databaseConnection");

const createValuatorController = async (req, res) => {

  try {

    let title = req.body.title;
    let questionPaper = req.body.questionPaper;
    let answerKey = req.body.answerKey;
    let classId = req.body.classId;


   await valuatorModel.create({
      title:title,
      questionPaper:questionPaper,
      answerKey:answerKey,
      classId:classId
    });

    res.json({
        message: "Valuator Added Successfully",
        response: true
    })
  } catch (error) {
    console.log(error)
    res.json({
        message: "Something went Wrong !!",
        response: false
    })
  }
};

const getValuatorController = async (req, res) => {
  try{
    const valuatorDetails = await valuatorModel.findAll();
    res.json({
        message: "Valuator Details",
        response: true,
        data: valuatorDetails
    })
  }
  catch(error){
    console.log(error)
    res.json({
        message: "Something went Wrong !!",
        response: false
    })
  }
}

module.exports = { createValuatorController, getValuatorController };
