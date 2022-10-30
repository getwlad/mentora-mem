import jwt, { JwtPayload } from "jsonwebtoken";

import authConfig from "../config/auth";
import "dotenv/config";
import User from "../app/models/UserModel";
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token inválido." });
  }
  const [, token] = authHeader.split(" ");
  if (!authConfig.secret) {
    return res.status(404).json({ error: "Há um problema no servidor." });
  }
  try {
    const decoded: JwtPayload = jwt.verify(token, authConfig.secret) as JwtPayload;
    req.user = decoded.id;

    const user = await User.findByPk(req.user, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
