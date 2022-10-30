import * as yup from "yup";
import regex from "../libs/regexValidators";
import { Request, Response, NextFunction } from 'express'

async function mentorshipValidator(req: Request, res: Response, next: NextFunction) {
  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório."),

    price: yup
      .string()
      .required("Preço obrigatório.")
      .matches(regex.validPrice, "Preço inválido."),
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

export default mentorshipValidator;
