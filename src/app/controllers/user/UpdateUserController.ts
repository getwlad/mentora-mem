import User from "../../models/UserModel";
import { Request, Response } from 'express'
class UpdateUserController {
  async update(req: Request, res: Response) {
    try {
      const id: string = req.user;
      const { email } = req.body;
      const user: User | null = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
      });
      if (email) {
        if (user?.email != email) {
          const userEmail: User | null = await User.findOne({
            where: { email: email },
            attributes: { exclude: ["password_hash"] },
          });

          if (userEmail) {
            return res.status(400).json({ error: "Email já cadastrado." });
          }
        }
      }

      const updatedUser: User | undefined = await user?.update(req.body);
      const user_type = updatedUser?.user_type;
      const createdAt = updatedUser?.createdAt;
      const updatedAt = updatedUser?.updatedAt;
      return res
        .status(200)
        .json({ id, email, user_type, createdAt, updatedAt });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateUserController();
