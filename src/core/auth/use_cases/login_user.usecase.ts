import { EncryptAdapter } from "@common/adapters/encrypt/encrypt.adapter";
import { JsonWebTokenAdapter } from "@common/adapters/jwt/json_web_token.adapter";
import { Unauthorized } from "@common/errors/unauthorized.error";
import { UserRepository } from "@core/users/user.repository";
import { UserCredentials } from "../dto/user_credentials.dto";

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository,
    private encrypt: EncryptAdapter,
    private jwt: JsonWebTokenAdapter
  ) {}

  async execute(user: UserCredentials) {
    const userLogged = await this.repository.findBy(user.user);

    if (!userLogged) {
      throw new Unauthorized("User Credentials Invalids");
    }
    const passwordMatch = await this.encrypt.compare(
      user.password,
      userLogged?.password!
    );
    if (!passwordMatch) {
      throw new Unauthorized("User Credentials Invalids");
    }

    delete userLogged.password;
    delete userLogged.token;

    const jwt = await this.jwt.sign(userLogged);

    this.repository.update(userLogged._id!, { token: jwt });

    return {
      ...userLogged,
      token: jwt,
    };
  }
}
