import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
import { Request, Response } from 'express'
class ListMentorShipController {
  async list(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const mentor: Mentor | null = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não cadastrado(a)." });
      }
      const id: string = mentor.id;

      const mentorships: Mentorship[] | null = await Mentorship.findAll({
        where: {
          mentor_id: id,
        },
      });
      return res.status(200).json(mentorships);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListMentorShipController();
