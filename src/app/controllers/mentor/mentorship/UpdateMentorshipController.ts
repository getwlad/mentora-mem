import Mentorship from "../../../models/MentorshipModel";
import { Op } from "sequelize";
import Mentor from "../../../models/MentorModel";
import { Request, Response } from 'express';
class UpdateMentorshipController {
  async update(req: Request, res: Response) {
    try {
      const mentorshipId: string = req.params.mentorshipId;
      const userId: string = req.user;
      const mentor = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não cadastrado(a)." });
      }
      const id: string = mentor.id;
      const { name, price } = req.body;
      const mentorship: Mentorship | null = await Mentorship.findOne({
        where: {
          [Op.and]: [{ id: mentorshipId }, { mentor_id: id }],
        },
      });
      if (!mentorship) {
        return res.status(404).json({ error: "Mentoria não encontrada." });
      }
      await mentorship.update({
        name,
        price,
      });

      return res.status(200).json(mentorship);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateMentorshipController();
