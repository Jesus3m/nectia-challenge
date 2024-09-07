import { Unauthorized } from "@common/errors/unauthorized.error";
import { UserRepository } from "@core/users/user.repository";
import { UserCredentials } from "./dto/user_credentials.dto";
import { UserRegister } from "./dto/user_register.dto";
import { LoginUserUseCase } from "./use_cases/login_user.usecase";
import { RegisterUserUseCase } from "./use_cases/register_user.usecase";

export class AuthService {
  constructor(
    private repository: UserRepository,
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}
  async login(userCredentials: UserCredentials) {
    const user = await this.repository.findBy(userCredentials.user);
    if (!user) throw new Unauthorized("User not found");

    const result = await this.loginUserUseCase.execute(userCredentials);

    return result;
  }

  async me(token: string) {
    if (!token) throw new Unauthorized("User not found");
    const user = await this.repository.findBy(token);
    if (!user) throw new Unauthorized("User not found");
    delete user.password;
    return user;
  }

  async register(user: UserRegister) {
    const dto = new UserRegister(user);
    await dto.validate();
    const created = await this.registerUserUseCase.execute(user);
    return created;
  }
}
