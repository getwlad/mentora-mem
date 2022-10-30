import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
import StudentHasCourse from "./StudentHasCourseModel";
import Student from "./StudentModel";
const sequelize = new Sequelize(databaseConfig);

class Mentorship extends Model {
  declare price: string;
  declare mentor_id: string | undefined;
}

Mentorship.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    modelName: "Mentorship",
  }
);

// Mentorship.belongsToMany(Student, {
//   through: {
//     model: StudentHasCourse,
//   },
//   foreignKey: "student_id",
//   constraint: true,
// });

Mentorship.belongsToMany(Student, {
  through: StudentHasCourse,
  as: "students",
  foreignKey: "mentorship_id",
  otherKey: "student_id",
  constraints: true,
});

Student.belongsToMany(Mentorship, {
  through: StudentHasCourse,
  as: "mentorships",
  foreignKey: "student_id",
  otherKey: "mentorship_id",
  constraints: true,
});

export default Mentorship;
