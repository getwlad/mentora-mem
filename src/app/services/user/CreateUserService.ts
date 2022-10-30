import User from "../../models/UserModel";
import { UserType } from "../../models/UserModel";
class CreateUserService {
  async createUser(email: string, password: string, user_type: UserType) {
    const chkMail: User | null = await User.findOne({ where: { email } });
    if (chkMail) {
      return;
    }
    const { id } = await User.create<User>({ email, password, user_type });

    return { id, email };
  }
}

export default new CreateUserService();
