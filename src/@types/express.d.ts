import { User } from "@core/users/user.entity";
import "express";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
