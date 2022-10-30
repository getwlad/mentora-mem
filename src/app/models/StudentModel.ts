import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
const sequelize = new Sequelize(databaseConfig);
import Particulars from "./ParticularsModel";
class Student extends Model {
  [x: string]: any;
  declare interests: any[];
  declare mentorships: any[];
  declare id: string;
  declare cpf: string;


}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    points: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Student",
  }
);

Student.hasOne(Particulars, {
  foreignKey: "student_id",
});
Particulars.belongsTo(Student, {
  foreignKey: "student_id",
});

export default Student;
