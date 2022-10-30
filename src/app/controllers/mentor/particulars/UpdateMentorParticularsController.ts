import Mentor from "../../../models/MentorModel";
import Particulars from "../../../models/ParticularsModel";
import { Request, Response } from 'express';
class UpdateMentorParticularsController {
  async update(req: Request, res: Response) {
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
      const {
        theory,
        practice,
        mentoringInGroup,
        mentoringIndividual,
        libras,
        minorityGroups,
      } = req.body;
      const particulars: Particulars | null = await Particulars.findOne({
        where: {
          mentor_id: id,
        },
      });
      if (!particulars) {
        return res.status(404).json({
          error: "Características não cadastradas.",
        });
      }
      await particulars.update({
        theory,
        practice,
        mentoring_in_group: mentoringInGroup,
        mentoring_individual: mentoringIndividual,
        libras,
        minority_groups: minorityGroups,
      });
      return res.status(200).json(particulars);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new UpdateMentorParticularsController();
