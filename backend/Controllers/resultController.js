const resultModel = require("../Models/resultModel");
const sequelize = require("../databaseConnection");
const valuatorModel = require("../Models/valuatorModel");
const classDetailModel = require("../Models/classDetailModel");
const studentDetailModel = require("../Models/studentDetailModel");
const aiPrompt = require("../Util/aiPrompt");
const OpenAI = require("openai");
const openai = new OpenAI();

const getResultsController = async (req, res) => {
    const valuatorId = req.params.valuatorId;

    try {
        // Fetch valuator details
        const valuator = await valuatorModel.findOne({ where: { id: valuatorId } });
        if (!valuator) {
            return res.status(404).json({ message: "Valuator not found" });
        }

        // Fetch class details
        const classDetails = await classDetailModel.findOne({ where: { id: valuator.classId } });
        if (!classDetails) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Fetch students in the class
        const students = await studentDetailModel.findAll({ where: { classId: valuator.classId } });
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found in this class" });
        }

        // Fetch results for each student
        const results = await Promise.all(students.map(async (student) => {
            const studentResults = await resultModel.findAll({ where: { studentId: student.id } });
            return {
                student,
                results: studentResults
            };
        }));

        // Combine data and send response
        res.json({
            valuator,
            classDetails,
            students: results
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
        

    const evaluateAnswerSheet = async (req, res) => {
    let answerSheetData = req.body.answerSheet;
    let studentId = answerSheetData.studentId;
    let answerSheet = answerSheetData.answerSheetUrl;
    
    try {
        let student = await studentDetailModel.findOne({ where: { id: studentId } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        console.log(`Student found: ${JSON.stringify(student)}`);

        let classId = student.classId;


        let valuator = await valuatorModel.findOne({ where: { classId:classId} });
        if (!valuator) {
            return res.status(404).json({ message: "Valuator not found" });
        }

        console.log(`Valuator found: ${JSON.stringify(valuator)}`);

        let answerKey = valuator.answerKey;
        let questionPaper = valuator.questionPaper;
        let valuatorId = valuator.id;


    

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: aiPrompt,
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Question Paper:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": questionPaper,
                            },
                        },
                    ],
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Keys:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": answerKey,
                            },
                        },
                    ]
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Sheet:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": answerSheet,
                            },
                        },
                    ]
                }
            ],
            "max_tokens": 1000,
        });
        
        const resp = response.choices[0].message.content;

        const result = JSON.parse(resp.split("```json")[1].split("```")[0]);

        await resultModel.create({
            answerSheet: answerSheet,
            result: result,
            valuatorId: valuatorId,
            studentId: studentId,
            classId: classId

        });
        res.json({
            message: `Answer sheet evaluated for Successfully for student ${student.studentName}`,
            response: true,
        })


    }
    catch(error){
        console.log(error)
    }
}




module.exports = { getResultsController, evaluateAnswerSheet};