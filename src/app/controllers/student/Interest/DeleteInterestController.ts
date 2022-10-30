import Student from "../../../models/StudentModel";
import ListInterestService from "../../../services/interest/ListInterestService";
import { Request, Response } from 'express'
import InterestArea from "../../../models/InterestAreaModel";
class DeleteInterestController {
  async delete(req: Request, res: Response) {
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
      const mentoringArea: string = req.body.mentoringArea;
      const areas: InterestArea[] = await ListInterestService.list();
      let interestArea;

      //Percorre o array de areas de mentoria e se encontrar uma igual a adicionada ele adiciona ao estudante
      for (let area of areas) {
        if (area.mentoring_area === mentoringArea) {
          await student.removeInterests(area.id);
          interestArea = area.mentoring_area;
        }
      }

      if (!interestArea) {
        return res
          .status(404)
          .json({ error: "Área de interesse não encontrada." });
      }
      return res
        .status(200)
        .json({ message: "Área de interesse deletada com sucesso!" });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteInterestController();
