import { Order } from 'sequelize';
import ListMentorService from "../../services/mentor/ListMentorService";
import { Request, Response } from 'express';
import Mentor from '../../models/MentorModel';
class ListMentorController {
  async list(req: Request, res: Response) {
    try {

      const name: string = req.query.name as string;
      const phone: string = req.query.phone as string;
      const chavePix: string = req.query.chavePix as string;
      const publicEmail: string = req.query.publicEmail as string;
      const cnpj: string = req.query.cnpj as string;
      const createdBefore: string = req.query.createdBefore as string;
      const createdAfter: string = req.query.createdAfter as string;
      const updatedBefore: string = req.query.updatedBefore as string;
      const updatedAfter: string = req.query.updatedAfter as string;
      const sort: string = req.query.sort as string;

      const page: number = Number(req.query.page) || 1;
      const limit: number = Number(req.query.limit) || 25;
      let where = {};
      let order: Order = [];
      const data: Mentor[] = await ListMentorService.list(
        name,
        phone,
        chavePix,
        publicEmail,
        cnpj,
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

export default new ListMentorController();
