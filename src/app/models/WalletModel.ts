import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
const sequelize = new Sequelize(databaseConfig);
class Wallet extends Model {

  declare balance: string;
}

Wallet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize,
    modelName: "Wallet",
  }
);

export default Wallet;
