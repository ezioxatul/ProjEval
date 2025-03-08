const classDetailModel = require("../Models/classDetailModel");
const sequelize = require("../databaseConnection");

const createClassController = async (req, res) => {

    try{
        let className = req.body.className;
        let section = req.body.section;
        let subject = req.body.subject;

        await classDetailModel.create({
            className: className,
            section: section,
            subject: subject
        });
        res.json({
            message: "Class Added Successfully",
            response: true
        })
    }
    catch(error){
        console.log(error)
        res.json({
            message: "Something went Wrong !!",
            response: false
        })
    }

};

const getClassController = async (req, res) => {
    try{
        let classDetails = await classDetailModel.findAll();
        res.json({
            message: "Class Details",
            response: true,
            data: classDetails
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

module.exports = { createClassController, getClassController };