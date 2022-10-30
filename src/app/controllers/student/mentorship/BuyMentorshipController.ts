import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
import Student from "../../../models/StudentModel";
import Wallet from "../../../models/WalletModel";
import { Request, Response } from 'express'
class BuyMentorshipController {
  async buy(req: Request, res: Response) {
    try {
      const userId: string = req.user;

      const mentoringId: string = req.body.mentoringId;
      const student: Student | null = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      const mentorship: Mentorship | null = await Mentorship.findByPk(mentoringId);
      const studentWallet: Wallet | null = await Wallet.findOne({
        where: {
          user_id: userId,
        },
      });

      if (!mentorship) {
        return res.status(404).json({ error: "Mentoria não encontrada." });
      }

      const mentor: Mentor | null = await Mentor.findByPk(mentorship.mentor_id);

      const mentorWallet: Wallet | null = await Wallet.findOne({
        where: {
          user_id: mentor?.user_id,
        },
      });

      let mentorshipPrice: number = parseFloat(mentorship.price);
      let studentBalance: number = 0;
      if (studentWallet !== null) studentBalance = parseFloat(studentWallet.balance);
      let mentorBalance: number = 0;
      if (mentorWallet !== null) { mentorBalance = parseFloat(mentorWallet.balance) };

      if (studentBalance < mentorshipPrice) {
        return res.status(401).json({
          error:
            "Saldo insuficiente para esta compra, recarregue sua carteira.",
        });
      }

      studentBalance -= mentorshipPrice;
      mentorBalance += mentorshipPrice;

      await studentWallet?.update({ balance: studentBalance });
      await mentorWallet?.update({ balance: mentorBalance });

      await student?.addMentorship(mentoringId);

      return res.status(200).json(mentorship);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new BuyMentorshipController();
