const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const studentDetailModel = sequelize.define('studentDetailModel', {
  
  rollNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    required: true
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },

}, {
  freezeTableName: true
},
  {
    timestamps: true
  });


  studentDetailModel.sync({ force: false}).then((res) => {
  console.log("Student Detail Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating Student Detail Table");
})
module.exports = studentDetailModel;
