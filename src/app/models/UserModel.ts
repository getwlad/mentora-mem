
import bcrypt from "bcrypt";

import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes } from "sequelize";
const databaseConfig = require("../../config/database");
import Mentor from "./MentorModel";
import Student from "./StudentModel";
import Wallet from "./WalletModel";
const sequelize = new Sequelize(databaseConfig);
export enum UserType {
  STUDENT = 'STUDENT', MENTOR = 'MENTOR'
}
class User extends Model {
  public id!: string;
  public email!: string;
  public password_hash!: string;
  public user_type!: UserType;
  public is_admin!: boolean;
  public password!: string;
  public createdAt!: string;
  public updatedAt!: string;

  checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }

}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    user_type: DataTypes.ENUM("STUDENT", "MENTOR"),
    password: DataTypes.VIRTUAL(DataTypes.STRING),
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.addHook("beforeSave", async (user: User) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

User.hasOne(Wallet, {
  foreignKey: "user_id",
});
User.hasOne(Mentor, {
  foreignKey: "user_id",
});
User.hasOne(Student, {
  foreignKey: "user_id",
});

export default User;
