const studentDetailModel = require("../Models/studentDetailModel");
const classDetailModel = require("../Models/classDetailModel");
const sequelize = require("../databaseConnection");

const addStudentController = async (req, res) => {

    let classId = req.body.classId;

    try{
        let rollNumber = req.body.rollNumber;
        let studentName = req.body.studentName;
        await studentDetailModel.create({
            rollNumber: rollNumber,
            studentName: studentName,
            classId: classId,
        });
        res.json({
            message: "Student Added Successfully",
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

const getStudentController = async (req, res) => {
    try{
        let studentDetails = await studentDetailModel.findAll();
        res.json({
            message: "Student Details",
            response: true,
            data: studentDetails
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




module.exports = { addStudentController, getStudentController };