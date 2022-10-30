import Wallet from "../../../models/WalletModel";
import { Request, Response } from 'express'
class ListBalanceController {
  async list(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const wallet: Wallet | null = await Wallet.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!wallet) {
        return res.status(404).json({ error: "Carteira não encontrada." });
      }
      const walletBalance = parseFloat(wallet.balance);
      return res.status(200).json({ saldo: walletBalance });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListBalanceController();
