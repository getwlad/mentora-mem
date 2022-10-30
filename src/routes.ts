import { Router, Request, Response } from "express";

import studentValidator from "./middlewares/studentValidator";
import mentorValidator from "./middlewares/mentorValidator";
import userValidator from "./middlewares/userValidator";
import interestAreaValidator from "./middlewares/interestAreaValidator";
import mentorshipValidator from "./middlewares/mentorshipValidator";
import particularsValidator from "./middlewares/particularsValidator";

import CreateUserController from "./app/controllers/user/CreateUserController";
import DeleteUserController from "./app/controllers/user/DeleteUserController";
import ListUserController from "./app/controllers/user/ListUserController";
import ShowUserController from "./app/controllers/user/ShowUserController";
import UpdateUserController from "./app/controllers/user/UpdateUserController";

import CreateMentorController from "./app/controllers/mentor/CreateMentorController";
import ListMentorController from "./app/controllers/mentor/ListMentorController";
import ShowMentorController from "./app/controllers/mentor/ShowMentorController";
import UpdateMentorController from "./app/controllers/mentor/UpdateMentorController";
import DeleteMentorController from "./app/controllers/mentor/DeleteMentorController";

import CreateStudentController from "./app/controllers/student/CreateStudentController";
import ListStudentController from "./app/controllers/student/ListStudentController";
import ShowStudentController from "./app/controllers/student/ShowStudentController";
import UpdateStudentController from "./app/controllers/student/UpdateStudentController";
import DeleteStudentController from "./app/controllers/student/DeleteStudentController";
import MatchController from "./app/controllers/match/MatchController";
import AddInterestController from "./app/controllers/student/Interest/AddInterestController";
import ShowInterestController from "./app/controllers/student/Interest/ShowInterestController";
import ListInterestAreaController from "./app/controllers/interest/ListInterestAreaController";
import CreateInterestAreaController from "./app/controllers/interest/CreateInterestAreaController";

import CreateMentorshipController from "./app/controllers/mentor/mentorship/CreateMentorshipController";
import CreateStudentParticularsController from "./app/controllers/student/particulars/CreateStudentParticularsController";
import ShowStudentParticularsController from "./app/controllers/student/particulars/ShowStudentParticularsController";
import ShowMentorParticularsController from "./app/controllers/mentor/particulars/ShowMentorParticularsController";
import CreateMentorParticularsController from "./app/controllers/mentor/particulars/CreateMentorParticularsController";
import DeleteInterestController from "./app/controllers/student/Interest/DeleteInterestController";
import UpdateStudentParticularsController from "./app/controllers/student/particulars/UpdateStudentParticularsController";
import UpdateMentorParticularsController from "./app/controllers/mentor/particulars/UpdateMentorParticularsController";
import UpdateMentorshipController from "./app/controllers/mentor/mentorship/UpdateMentorshipController";
import ListMentorshipController from "./app/controllers/mentor/mentorship/ListMentorshipController";
import ShowMentorshipController from "./app/controllers/mentor/mentorship/ShowMentorshipController";
import DeleteMentorshipController from "./app/controllers/mentor/mentorship/DeleteMentorshipController";
import BuyMentorshipController from "./app/controllers/student/mentorship/BuyMentorshipController";
import ListBuyedMentorshipController from "./app/controllers/student/mentorship/ListBuyedMentorshipController";
import ListAllMentorshipController from "./app/controllers/mentorship/ListAllMentorshipController";
import SessionsController from "./app/controllers/sessions/SessionsController";
import AddBalanceController from "./app/controllers/wallet/balance/AddBalanceController";
import ListBalanceController from "./app/controllers/wallet/balance/ListBalanceController";

import authUser from "./middlewares/authUser";
import DeleteInterestAreaController from "./app/controllers/interest/DeleteInterestAreaController";

import balanceValidator from "./middlewares/balanceValidator";

const routes = Router();

//Rotas get
//User
routes.get("/user/", (req: Request, res: Response) => {
  ListUserController.list(req, res);
  //#swagger.tags = ["User"]
});

routes.post("/user/login/", (req: Request, res: Response) => {
  SessionsController.create(req, res);
  //#swagger.tags = ["User"]
});
routes.post(
  "/user/",
  userValidator,
  (req: Request, res: Response) => CreateUserController.create(req, res)
  //#swagger.tags = ["User"]
);
//Student
routes.get("/student", (req: Request, res: Response) => ListStudentController.list(req, res));

//Mentor
routes.get("/mentor", (req: Request, res: Response) => ListMentorController.list(req, res));

routes.get("/mentorships", (req: Request, res: Response) => {
  ListAllMentorshipController.list(req, res);
});
//interest
routes.get("/interest", (req: Request, res: Response) => {
  ListInterestAreaController.list(req, res);
});
routes.get("/mentor/:id/show", (req: Request, res: Response) =>
  ShowMentorController.show(req, res)
);
//Autenticacao
routes.use(authUser);

//Rotas User
routes.put("/user/", userValidator, (req: Request, res: Response) =>
  UpdateUserController.update(req, res)
);
routes.delete("/user/", (req: Request, res: Response) => DeleteUserController.delete(req, res));
routes.get("/user/show/", (req: Request, res: Response) => {
  ShowUserController.show(req, res);
  //#swagger.tags = ["User"]
});

//Rotas Student

routes.post("/student/", studentValidator, (req: Request, res: Response) =>
  CreateStudentController.create(req, res)
);
routes.put("/student/", studentValidator, (req: Request, res: Response) =>
  UpdateStudentController.update(req, res)
);
routes.delete("/student/", (req: Request, res: Response) =>
  DeleteStudentController.delete(req, res)
);
routes.get("/student/interest", (req: Request, res: Response) => {
  ShowInterestController.show(req, res);
});
routes.get("/student/show", (req: Request, res: Response) => ShowStudentController.show(req, res));
routes.get("/student/particulars", (req: Request, res: Response) => {
  ShowStudentParticularsController.show(req, res);
});

routes.post("/student/interest", interestAreaValidator, (req: Request, res: Response) => {
  AddInterestController.add(req, res);
});
routes.delete("/student/interest", interestAreaValidator, (req: Request, res: Response) => {
  DeleteInterestController.delete(req, res);
});

routes.post("/student/particulars", particularsValidator, (req: Request, res: Response) => {
  CreateStudentParticularsController.create(req, res);
});

routes.put("/student/particulars", particularsValidator, (req: Request, res: Response) => {
  UpdateStudentParticularsController.update(req, res);
});

routes.post("/student/buymentorship", (req: Request, res: Response) => {
  BuyMentorshipController.buy(req, res);
});
routes.get("/student/mentorship", (req: Request, res: Response) => {
  ListBuyedMentorshipController.list(req, res);
});

//Rotas Mentor

routes.post("/mentor/", mentorValidator, (req: Request, res: Response) =>
  CreateMentorController.create(req, res)
);
routes.put("/mentor/", mentorValidator, (req: Request, res: Response) =>
  UpdateMentorController.update(req, res)
);
routes.delete("/mentor/", (req: Request, res: Response) =>
  DeleteMentorController.delete(req, res)
);
routes.get("/mentor/mentorship", (req: Request, res: Response) => {
  ListMentorshipController.list(req, res);
});
routes.get("/mentor/particulars", (req: Request, res: Response) => {
  ShowMentorParticularsController.show(req, res);
});
routes.post("/mentor/mentorship", mentorshipValidator, (req: Request, res: Response) => {
  CreateMentorshipController.create(req, res);
});
routes.get("/mentor/mentorship/:mentorshipId", (req: Request, res: Response) => {
  ShowMentorshipController.show(req, res);
});
routes.put(
  "/mentor/mentorship/:mentorshipId",
  mentorshipValidator,
  (req: Request, res: Response) => {
    UpdateMentorshipController.update(req, res);
  }
);
routes.delete("/mentor/mentorship/:mentorshipId", (req: Request, res: Response) => {
  DeleteMentorshipController.delete(req, res);
});

routes.post("/mentor/particulars", particularsValidator, (req: Request, res: Response) => {
  CreateMentorParticularsController.create(req, res);
});

routes.put("/mentor/particulars", particularsValidator, (req: Request, res: Response) => {
  UpdateMentorParticularsController.update(req, res);
});

//Rotas Interest
routes.post("/interest", interestAreaValidator, (req: Request, res: Response) => {
  CreateInterestAreaController.create(req, res);
});
routes.delete("/interest/:id", (req: Request, res: Response) => {
  DeleteInterestAreaController.delete(req, res);
});

//Wallet
routes.post("/balance", balanceValidator, (req: Request, res: Response) => {
  AddBalanceController.add(req, res);
});
routes.get("/balance", (req: Request, res: Response) => {
  ListBalanceController.list(req, res);
});
//Mentorships

//Rotas Match
routes.get("/student/match", (req: Request, res: Response) => {
  MatchController.match(req, res);
});

routes.get("*", (req: Request, res: Response) => {
  res.status(404).send("Rota não encontrada, verifique a url");
});
export default routes;
