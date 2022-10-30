import jwt from "jsonwebtoken";
import User from "../../models/UserModel";
import authConfig from "../../../config/auth";
import { Request, Response } from 'express'
class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Insira seu email e senha." });
    }
    const user: User | null = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: "Usuário não autorizado." });
    }
    if (!authConfig.secret) {
      return res.status(404).json({ error: "Há um problema no servidor." });
    }
    const { id, user_type } = user;
    return res.status(200).json({
      auth: true,
      user: { id, email, user_type },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionsController();
