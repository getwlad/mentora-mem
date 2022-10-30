import User from "../../models/UserModel";
import { Request, Response } from 'express'
class DeleteUserController {
  async delete(req: Request, res: Response) {
    const id: string = req.user;
    const user: User | null = await User.findByPk(id);
    await user?.destroy();
    return res.status(200).json({ msg: "Usuário deletado com sucesso!" });
  }
}

export default new DeleteUserController();
