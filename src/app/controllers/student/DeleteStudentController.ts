import Student from "../../models/StudentModel";
import { Request, Response } from 'express'
class DeleteStudentController {
  async delete(req: Request, res: Response) {
    try {
      const userId: string = req.user;

      const student: Student | null = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não encontrado(a)." });
      }
      await student.destroy();
      return res
        .status(200)
        .json({ msg: "Estudante deletado(a) com sucesso!" });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteStudentController();
