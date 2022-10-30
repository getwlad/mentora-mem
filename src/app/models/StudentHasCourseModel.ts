import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
const sequelize = new Sequelize(databaseConfig);

class StudentHasCourse extends Model<InferAttributes<StudentHasCourse>, InferCreationAttributes<StudentHasCourse>>{ }

StudentHasCourse.init(
  {
    student_id: {
      type: DataTypes.UUIDV4,
    },

    mentorship_id: {
      type: DataTypes.UUIDV4,
    },
  },

  {
    sequelize,
    modelName: "StudentHasCourse",
    timestamps: false,
  }
);

export default StudentHasCourse;
