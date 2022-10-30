import CreateUserService from "../../services/user/CreateUserService";
import CreateWalletController from "../wallet/CreateWalletController";
import { Request, Response } from 'express'

class CreateUserController {
  constructor() { }
  async create(req: Request, res: Response) {
    const { email, password, user_type } = req.body;

    const user = await CreateUserService.createUser(email, password, user_type);

    if (!user) {
      return res.status(401).json({ error: "Email já cadastrado." });
    }

    const { id } = user;

    await CreateWalletController.create(id);

    return res.status(201).json(user);
  }
}

export default new CreateUserController();
