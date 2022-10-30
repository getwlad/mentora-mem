import ListInterestService from "../../services/interest/ListInterestService";
import { Request, Response } from 'express'
import InterestArea from "../../models/InterestAreaModel";
class ListInterestAreaController {
  async list(req: Request, res: Response) {
    try {
      const areas: InterestArea[] | null = await ListInterestService.list();
      return res.status(200).json(areas);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListInterestAreaController();
