import * as yup from "yup";
import regex from "../libs/regexValidators";
import { Request, Response, NextFunction } from 'express'

async function mentorValidator(req: Request, res: Response, next: NextFunction) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome é obrigatório.")
      .matches(regex.name, "Nome inválido"),
    cnpj: yup
      .string()
      .required("Seu CNPJ é obrigatório.")
      .matches(regex.validCPF, "CNPJ inválido."),
    publicEmail: yup
      .string()
      .email("Email inválido.")
      .required("Um email público é obrigatório."),
    phone: yup
      .string()
      .required("Seu telefone é obrigatório.")
      .matches(regex.phoneNumber, "Telefone inválido."),
    chavePix: yup
      .string()
      .required("Uma chave Pix é obrigatória.")
      .test(
        "test-chave-pix",
        "Entre uma chave Pix válida: Telefone, Email, CPF, CNPJ ou EVP",
        (value: any): boolean => {
          const isValidEmail: boolean = regex.emailRegex.test(value);
          const isValidPhone: boolean = regex.phoneNumber.test(value);
          const isValidCPF: boolean = regex.validCPF.test(value);
          const isValidCNPJ: boolean = regex.validCNPJ.test(value);
          const isValidEVP: boolean = regex.validEVPPix.test(value);
          return (
            isValidEmail ||
            isValidPhone ||
            isValidCPF ||
            isValidCNPJ ||
            isValidEVP
          );
        }
      ),
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

export default mentorValidator;
