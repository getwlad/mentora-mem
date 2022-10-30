import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
const sequelize = new Sequelize(databaseConfig);
import Student from "./StudentModel";
import InterestArea from "./InterestAreaModel";

class StudentHasInterestArea extends Model<InferAttributes<StudentHasInterestArea>, InferCreationAttributes<StudentHasInterestArea>>{ }

StudentHasInterestArea.init(
  {
    student_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: Student,
        key: "id",
      },
    },

    interest_area_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: InterestArea,
        key: "id",
      },
    },
  },

  {
    sequelize,
    modelName: "StudentHasInterestArea",
    timestamps: false,
  }
);

export default StudentHasInterestArea;
