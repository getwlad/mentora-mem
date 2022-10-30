import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
import { string } from "yup";
const databaseConfig = require("../../config/database");
import InterestArea from "./InterestAreaModel";
import Mentorship from "./MentorshipModel";
import Particulars from "./ParticularsModel";
const sequelize = new Sequelize(databaseConfig);

class Mentor extends Model {
  declare user_id: string;
  declare id: string;
  declare name: string;
  declare phone: string;
  declare cnpj: string;
  declare publicEmail: string;
  declare chavePix: string;
}

Mentor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    publicEmail: DataTypes.STRING,
    chavePix: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Mentor",
  }
);
Mentor.hasMany(Mentorship, {
  sourceKey: "id",
  foreignKey: "mentor_id",
});

Mentorship.belongsTo(Mentor, {
  foreignKey: "mentor_id",
});

Mentor.hasOne(Particulars, {
  foreignKey: "mentor_id",
});
Particulars.belongsTo(Mentor, {
  foreignKey: "mentor_id",
});

InterestArea.hasMany(Mentor, {
  sourceKey: "id",
  foreignKey: "interest_area_id",
  as: "interests",
});
Mentor.belongsTo(InterestArea, {
  foreignKey: "interest_area_id",
});

export default Mentor;
