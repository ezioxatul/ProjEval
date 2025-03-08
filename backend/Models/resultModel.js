const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const resultModel = sequelize.define('resultModel', {
  
    answerSheet: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      result: {
        type: DataTypes.JSON,
        allowNull: false,
        required: true
      },
      

}, {
  freezeTableName: true
},
  {
    timestamps: true
  });


  resultModel.sync({ force: false }).then((res) => {
  console.log("Result Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating Result Table");
})
module.exports = resultModel;
