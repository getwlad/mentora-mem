import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");

import Student from "./StudentModel";
import StudentHasInterestArea from "./StudentHasInterestAreaModel";
const sequelize = new Sequelize(databaseConfig);

class InterestArea extends Model {
  declare id: string;
  declare mentoring_area: string;
}

InterestArea.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mentoring_area: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "InterestArea",
  }
);

InterestArea.belongsToMany(Student, {
  through: StudentHasInterestArea,
  as: "students",
  foreignKey: "interest_area_id",
  otherKey: "student_id",
  constraints: true,
});

Student.belongsToMany(InterestArea, {
  through: StudentHasInterestArea,
  as: "interests",
  foreignKey: "student_id",
  otherKey: "interest_area_id",
  constraints: true,
});

export default InterestArea;
