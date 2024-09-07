import { Controller } from "@common/generics/controller";
import { User } from "@core/users/user.entity";
import { UserService } from "@core/users/user.service";

export class UserController extends Controller<User> {
  constructor(service: UserService) {
    super(service);
  }
}
