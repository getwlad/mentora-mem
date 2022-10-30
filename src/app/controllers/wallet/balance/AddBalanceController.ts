import axios from "axios";
import Wallet from "../../../models/WalletModel";
import { Request, Response } from 'express'
class AddBalanceController {
  async add(req: Request, res: Response) {
    try {
      const userId: string = req.user;
      const wallet: Wallet | null = await Wallet.findOne({
        where: {
          user_id: userId,
        },
      });
      const { number, holderName, expMonth, expYear, cvv, amount } = req.body;
      if (!wallet) {
        return res.status(404).json({ error: "Carteira não encontrada." });
      }
      let walletBalance: number = parseFloat(wallet.balance);
      const data = {
        customer: {
          name: holderName,
          email: "avengerstark@ligadajustica.com.br",
          type: "individual",
        },
        items: [
          {
            amount,
            description: "Créditos Mentora-me",
            quantity: 1,
            code: 123,
          },
        ],
        payments: [
          {
            credit_card: {
              card: {
                number,
                holder_name: holderName,
                exp_month: expMonth,
                exp_year: expYear,
                cvv,
              },
              installments: 1,
              statement_descriptor: "MENTORA",
            },
            payment_method: "credit_card",
          },
        ],
      };
      const auth: any = {
        auth: {
          username: process.env.KEY_SECRET,
          password: "",
        },
      };
      const { data: resp }: any = await axios.post(
        "https://api.pagar.me/core/v5/orders",
        data,
        auth
      );
      if (resp.status === "paid") {
        walletBalance += amount;
        await wallet.update({
          balance: walletBalance,
        });
        return res.status(200).json({
          sucess: "Créditos adicionados com sucesso!",
          saldo: wallet.balance,
        });
      } else {
        return res.status(400).json({ error: "Pagamento não autorizado." });
      }
    } catch (err: any) {
      return res.status(400).json({ error: err.response.data });
    }
  }
}

export default new AddBalanceController();
