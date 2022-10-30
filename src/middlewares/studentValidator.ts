import * as yup from "yup";
import regex from "../libs/regexValidators";
import { Request, Response, NextFunction } from 'express'

async function studentValidator(req: Request, res: Response, next: NextFunction) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex.name, "Nome inválido."),
    cpf: yup
      .string()
      .required("Seu CPF é obrigatório.")
      .matches(regex.validCPF, "CPF inválido."),
    phone: yup
      .string()
      .required("Seu telefone é obrigatório.")
      .matches(regex.phoneNumber, "Telefone inválido."),
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

export default studentValidator;
