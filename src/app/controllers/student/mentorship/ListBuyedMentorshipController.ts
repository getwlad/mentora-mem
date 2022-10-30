import Mentorship from "../../../models/MentorshipModel";
import Student from "../../../models/StudentModel";
import { Request, Response } from 'express'
class ListBuyedMentorshipController {
  async list(req: Request, res: Response) {
    try {
      const userId: string = req.user;

      const student: Student | null = await Student.findOne({
        where: {
          user_id: userId,
        },
        attributes: [],
        include: [{ model: Mentorship, as: "mentorships" }],
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado(a)." });
      }
      if (!(student.mentorships.length > 0)) {
        return res.status(404).json({
          error:
            "Você ainda não comprou nenhuma mentoria, que tal buscar um match?",
        });
      }

      return res.status(200).json(student);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListBuyedMentorshipController();
