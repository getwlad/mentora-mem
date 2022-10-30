import Student from "../../../models/StudentModel";
import ListInterestService from "../../../services/interest/ListInterestService";
import { Request, Response } from 'express'
import InterestArea from "../../../models/InterestAreaModel";
class AddInterestController {
  async add(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const mentoringArea: string = req.body.mentoringArea;
      const student: Student | null = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado(a)." });
      }

      const areas: InterestArea[] = await ListInterestService.list();

      let interestArea;

      //Percorre o array de areas de mentoria e se encontrar uma igual a adicionada ele adiciona ao estudante
      for (let area of areas) {
        if (area.mentoring_area === mentoringArea) {
          console.log(area.id)
          await student.addInterest(area.id);
          interestArea = area.mentoring_area;
        }
      }

      if (!interestArea) {
        return res
          .status(404)
          .json({ error: "Área de mentoria não encontrada." });
      }

      return res.status(201).json({ mentoringArea: interestArea });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new AddInterestController();
