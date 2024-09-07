import { Data } from "@common/generics/data";
import { Request, Response } from "express";

export class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response) {
    res.json(new Data({}, "Inicio de session", 200));
  }

  async me(req: Request, res: Response) {
    res.json(new Data({}, "Obtener usuario logueado", 200));
  }

  async register(req: Request, res: Response) {
    res.json(new Data({}, "Registro de usuario", 200));
  }
}
