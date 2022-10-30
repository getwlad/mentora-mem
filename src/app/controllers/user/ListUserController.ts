import ListUserService from "../../services/user/ListUserService";
import { Request, Response } from 'express'
import { Order } from "sequelize";
class ListUserController {
  async list(req: Request, res: Response) {
    try {

      const {
        email,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort,
      } = req.query as any;
      const page = req.query.page as any || 1;
      const limit = req.query.limit as any || 25;
      let where = {};
      let order: Order = [];
      const data = await ListUserService.list(
        email,
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

export default new ListUserController();
