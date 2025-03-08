const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const classDetailModel = sequelize.define('classDetailModel', {
  
    className: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      subject: {
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


  classDetailModel.sync({ force: false }).then((res) => {
  console.log("Class Detail Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating Class Detail Table");
})
module.exports = classDetailModel;
