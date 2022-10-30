import CreateStudentService from "../../services/student/CreateStudentService";
import Student from "../../models/StudentModel";
import User from "../../models/UserModel";
import { Request, Response } from 'express'
import { UserType } from "../../models/UserModel";
class CreateStudentController {
  constructor() { }
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, phone } = req.body;
      const userId: string = req.user;
      const cpfCadastrado: Student | null = await Student.findOne({ where: { cpf: cpf } });
      const userCadastrado: Student | null = await Student.findOne({
        where: { user_id: userId },
      });
      const userExist: User | null = await User.findByPk(userId);

      if (userExist?.user_type !== UserType.STUDENT) {
        return res.status(401).json({ error: "Tipo de usuário incorreto." });
      }

      if (cpfCadastrado) {
        return res.status(400).json({ error: "CPF já cadastrado." });
      }
      if (userCadastrado) {
        return res.status(400).json({ error: "Usuário já cadastrado." });
      }

      const student: Student = await CreateStudentService.createStudent(
        name,
        cpf,
        phone,
        userId
      );

      return res.status(201).json(student);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateStudentController();
