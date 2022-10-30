import InterestArea from "../../models/InterestAreaModel";
import User from "../../models/UserModel";
import { Request, Response } from 'express'

class DeleteInterestAreaController {
  async delete(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const admin: User | null = await User.findOne({
        where: {
          id: userId,
          is_admin: true,
        },
      });

      if (!admin) {
        return res
          .status(403)
          .json({ error: "Ação inválida para esse tipo de usuário" });
      }

      const id: string = req.params.id;
      const interestArea: InterestArea | null = await InterestArea.findOne({
        where: { id },
      });
      if (!interestArea) {
        return res
          .status(400)
          .json({ error: "Área de interesse não encontrada." });
      }

      await interestArea.destroy();
      return res
        .status(200)
        .json({ sucess: "Área de interesse deletada com sucesso!" });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteInterestAreaController();
