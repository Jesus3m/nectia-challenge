import { JsonWebTokenAdapter } from "@common/adapters/jwt/json_web_token.adapter";
import { JWTAdapter } from "@common/adapters/jwt/jwt.adapter";
import { Unauthorized } from "@common/errors/unauthorized.error";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  constructor(private jwtAdapter: JsonWebTokenAdapter) {
    this.execute = this.execute.bind(this);
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Unauthorized("Unauthorized");
    }

    const data = await this.jwtAdapter.verify(token);
    if (!data) {
      throw new Unauthorized("Unauthorized");
    }

    req.user = data;

    next();
  }
}

export default new AuthMiddleware(new JWTAdapter());
