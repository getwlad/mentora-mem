import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");

const sequelize = new Sequelize(databaseConfig);

class Particulars extends Model {
  declare theory: string;
  declare practice: string;
  declare mentoring_in_group: string;
  declare mentoring_individual: string;
  declare libras: string;
  declare minority_groups: string;
  declare score: number;
  declare mentor_id: string;
  declare user_id: string;
}

Particulars.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    theory: DataTypes.ENUM("1", "2", "3"),
    practice: DataTypes.ENUM("1", "2", "3"),
    mentoring_in_group: DataTypes.ENUM("1", "2", "3"),
    mentoring_individual: DataTypes.ENUM("1", "2", "3"),
    libras: DataTypes.ENUM("1", "2", "3"),
    minority_groups: DataTypes.ENUM("1", "2", "3"),
  },
  {
    sequelize,
    modelName: "Particulars",
  }
);

export default Particulars;
