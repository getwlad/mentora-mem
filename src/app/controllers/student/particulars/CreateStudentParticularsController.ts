import Particulars from "../../../models/ParticularsModel";
import Student from "../../../models/StudentModel";
import { Request, Response } from 'express'
class CreateStudentParticularsController {
  async create(req: Request, res: Response) {
    try {
      const userId: string = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado(a)." });
      }
      const { id } = student;
      const {
        theory,
        practice,
        mentoringInGroup,
        mentoringIndividual,
        libras,
        minorityGroups,
      } = req.body;
      const particulars: Particulars | null = await Particulars.create({
        student_id: id,
        theory,
        practice,
        mentoring_in_group: mentoringInGroup,
        mentoring_individual: mentoringIndividual,
        libras,
        minority_groups: minorityGroups,
      });
      return res.status(201).json(particulars);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new CreateStudentParticularsController();
