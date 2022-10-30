import User, { UserType } from "../../models/UserModel";
import Mentor from "../../models/MentorModel";
import CreateMentorService from "../../services/mentor/CreateMentorService";
import ListInterestService from "../../services/interest/ListInterestService";
import { Request, Response } from 'express';
import InterestArea from "../../models/InterestAreaModel";
class CreateMentorController {
  constructor() { }
  async create(req: Request, res: Response) {
    try {
      const { name, phone, chavePix, publicEmail, cnpj, mentoringArea } =
        req.body;
      const userId: string = req.user;
      const cnpjCadastrado: Mentor | null = await Mentor.findOne({ where: { cnpj: cnpj } });
      const userCadastrado: Mentor | null = await Mentor.findOne({
        where: { user_id: userId },
      });
      const userExist: User | null = await User.findByPk(userId);

      if (userExist?.user_type !== UserType.MENTOR) {
        return res.status(400).json({ error: "Tipo de usuário incorreto." });
      }

      if (cnpjCadastrado) {
        return res.status(400).json({ error: "CNPJ já cadastrado." });
      }

      if (userCadastrado) {
        return res.status(400).json({ error: "Mentor(a) já cadastrado(a)." });
      }
      const areas: InterestArea[] | null = await ListInterestService.list();
      let interestAreaId;
      //Percorre o array de areas de mentoria e se encontrar uma igual a adicionada ele adiciona ao mentor
      areas.map((area) => {
        if (area.mentoring_area === mentoringArea) {
          interestAreaId = area.id;
        }
      });
      if (!interestAreaId) {
        return res
          .status(404)
          .json({ error: "Área de Mentoria não encontrada." });
      }

      const mentor: Mentor | null = await CreateMentorService.createMentor(
        name,
        phone,
        chavePix,
        publicEmail,
        cnpj,
        userId,
        interestAreaId
      );

      return res.status(201).json(mentor);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateMentorController();
