import User from "../../models/UserModel";
import { Request, Response } from 'express'
class ShowUserController {
  async show(req: Request, res: Response) {
    try {
      const id: string = req.user;
      const user: User | null = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowUserController();
