import ListStudentService from "../../services/student/ListStudentService";
import { Request, Response } from 'express'
import { Order } from "sequelize";
class ListStudentController {
  async list(req: Request, res: Response) {
    try {
      const name: string = req.query.name as string;
      const phone: string = req.query.phone as string;
      const cpf: string = req.query.cpf as string;
      const points: number = Number(req.query.points as string);
      const createdBefore: string = req.query.createdBefore as string;
      const createdAfter: string = req.query.createdAfter as string;
      const updatedBefore: string = req.query.updatedBefore as string;
      const updatedAfter: string = req.query.updatedAfter as string;
      const sort: string = req.query.sort as string;

      const page = Number(req.query.page as string) || 1;
      const limit = Number(req.query.limit as string) || 25;
      let where = {};
      let order: Order = [];
      const data = await ListStudentService.list(
        name,
        phone,
        cpf,
        points,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort,
        page,
        limit,
        where,
        order
      );

      return res.json(data);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListStudentController();
