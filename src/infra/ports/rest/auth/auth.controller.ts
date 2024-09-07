import { Data } from "@common/generics/data";
import { AuthService } from "@core/auth/auth.service";
import { Request, Response } from "express";

export class AuthController {
  constructor(private service: AuthService) {
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response) {
    const data = await this.service.login(req.body);
    res.json(new Data(data, "session.success", 200));
  }

  async me(req: Request, res: Response) {
    const token = req.query.token || req.headers.authorization?.split(" ")[1];
    const data = await this.service.me(token as string);
    res.json(new Data(data, "session.me", 200));
  }

  async register(req: Request, res: Response) {
    const data = await this.service.register(req.body);
    res.json(new Data(data, "user.created", 200));
  }
}
