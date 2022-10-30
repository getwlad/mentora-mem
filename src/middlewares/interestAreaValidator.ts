import * as yup from "yup";
import { Request, Response, NextFunction } from 'express'

async function interestAreaValidator(req: Request, res: Response, next: NextFunction) {
  const schema = yup.object().shape({
    mentoringArea: yup.string().required("Nome obrigatório."),
  });

  await schema
    .validate(req.body)
    .then(() => next())
    .catch((err) => {
      return res.status(400).json({
        error: err.errors,
      });
    });
}

export default interestAreaValidator;
