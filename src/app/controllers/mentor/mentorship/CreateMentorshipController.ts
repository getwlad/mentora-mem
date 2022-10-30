import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
import { Request, Response } from 'express'
class CreateMentorshipController {
  async create(req: Request, res: Response) {
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
      const { name, price } = req.body;

      const mentorship: Mentorship | null = await Mentorship.create({
        name,
        price,
        mentor_id: id,
      });

      return res.status(201).json(mentorship);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateMentorshipController();
