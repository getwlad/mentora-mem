import Mentorship from "../../models/MentorshipModel";
import { Op } from "sequelize";
import { Request, Response } from 'express'
class ListAllMentorshipController {
  async list(req: Request, res: Response) {
    try {
      const mentorships: Mentorship[] | null = await Mentorship.findAll({
        where: {
          mentor_id: { [Op.ne]: null },
        },
      });
      return res.status(200).json(mentorships);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListAllMentorshipController();
