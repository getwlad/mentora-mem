import InterestArea from "../../models/InterestAreaModel";
import User from "../../models/UserModel";
import { Request, Response } from 'express'

class CreateInterestArea {
  async create(req: Request, res: Response) {
    try {
      const { mentoringArea } = req.body;
      const areaCadastrada: InterestArea | null = await InterestArea.findOne({
        where: { mentoring_area: mentoringArea },
      });

      if (areaCadastrada) {
        return res
          .status(400)
          .json({ error: "Área de interesse já cadastrada." });
      }

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

      const area: InterestArea | null = await InterestArea.create({ mentoring_area: mentoringArea });
      return res.status(201).json(area);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateInterestArea();
