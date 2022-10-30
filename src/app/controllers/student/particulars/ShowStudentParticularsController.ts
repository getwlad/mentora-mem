import Particulars from "../../../models/ParticularsModel";
import Student from "../../../models/StudentModel";
import { Request, Response } from 'express'
class ShowStudentParticularsController {
  async show(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const student: Student | null = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado(a)." });
      }
      const { id } = student;
      const particulars: Particulars | null = await Particulars.findOne({
        where: { student_id: id },
      });
      if (!particulars) {
        return res
          .status(404)
          .json({ error: "Características não cadastradas." });
      }
      return res.status(200).json(particulars);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowStudentParticularsController();
