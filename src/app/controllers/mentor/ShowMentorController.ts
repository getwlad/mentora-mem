import InterestArea from "../../models/InterestAreaModel";
import Mentor from "../../models/MentorModel";
import { Request, Response } from 'express';
class ShowMentorController {
  async show(req: Request, res: Response) {
    try {
      const id: string = req.params.id;

      const mentor: Mentor | null = await Mentor.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["interest_area_id"],
        },
        include: {
          model: InterestArea,
          attributes: ["mentoring_area"],
        },
      });
      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não encontrado(a)." });
      }
      return res.status(200).json(mentor);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowMentorController();
