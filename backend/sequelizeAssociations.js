const sequelize = require("./databaseConnection");
const valuatorModel = require("./Models/valuatorModel");
const studentDetailModel = require("./Models/studentDetailModel");
const classDetailModel = require("./Models/classDetailModel");
const resultModel = require("./Models/resultModel");

const sequelizeAssociations = () => {
  classDetailModel.hasMany(studentDetailModel, {
    foreignKey: "classId",
    onDelete: "CASCADE",
  });
  studentDetailModel.belongsTo(classDetailModel, {
    foreignKey: "classId",
    onDelete: "CASCADE",
  });

  valuatorModel.hasMany(resultModel, {
    foreignKey: "valuatorId",
    onDelete: "CASCADE",
  });
  resultModel.belongsTo(valuatorModel, {
    foreignKey: "valuatorId",
    onDelete: "CASCADE",
  });

  studentDetailModel.hasMany(resultModel, { foreignKey: "studentId" });
  resultModel.belongsTo(studentDetailModel, { foreignKey: "studentId" });

  classDetailModel.hasMany(resultModel, { foreignKey: "classId" });
  resultModel.belongsTo(classDetailModel, { foreignKey: "classId" });

  classDetailModel.hasMany(valuatorModel, { foreignKey: "classId" });
  valuatorModel.belongsTo(classDetailModel, { foreignKey: "classId" });

  sequelize
    .sync({ alter: false })
    .then((res) => {
      console.log("Associations created successfully");
    })
    .catch((err) => {
      console.log(err);
      console.log("Some error has been occur while creating relation");
    });
};

module.exports = sequelizeAssociations;
