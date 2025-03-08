const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const valuatorModel = sequelize.define('valuatorModel', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  questionPaper: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  answerKey: {
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


  valuatorModel.sync({ force: false  }).then((res) => {
  console.log("Valuator Detail Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating Valuator Detail Table");
})
module.exports = valuatorModel;
