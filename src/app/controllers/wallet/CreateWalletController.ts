import Wallet from "../../models/WalletModel";
class CreateWalletController {
  constructor() { }
  async create(id: string) {
    await Wallet.create({ user_id: id });
    return;
  }
}

export default new CreateWalletController();
