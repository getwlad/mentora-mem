import Mentor from "../../models/MentorModel";
import { Request, Response } from 'express';
class DeleteMentorController {
  async delete(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const mentor: Mentor | null = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });

      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não encontrado(a)." });
      }
      await mentor.destroy();
      return res
        .status(200)
        .json({ msg: "Mentor(a) deletado(a) com sucesso!" });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteMentorController();
