import { EncryptAdapter } from "@common/adapters/encrypt/encrypt.adapter";
import { JsonWebTokenAdapter } from "@common/adapters/jwt/json_web_token.adapter";
import { Unauthorized } from "@common/errors/unauthorized.error";
import { UserRepository } from "@core/users/user.repository";
import { UserRegister } from "../dto/user_register.dto";

export class RegisterUserUseCase {
  constructor(
    private repository: UserRepository,
    private encrypt: EncryptAdapter,
    private jwt: JsonWebTokenAdapter
  ) {}

  async execute(user: UserRegister) {
    const emailUsed = await this.repository.findBy(user.email);
    const userUsed = await this.repository.findBy(user.user);

    if (emailUsed || userUsed) {
      throw new Unauthorized("User already exists");
    }

    const passwordHash = await this.encrypt.hash(user.password);
    user.password = passwordHash;

    const created = await this.repository.create<UserRegister>(user);

    if (!created) {
      throw new Error("Error creating user");
    }
    const jwt = await this.jwt.sign(created);

    this.repository.update(created._id!, { token: jwt });

    return {
      ...created,
      token: jwt,
    };
  }
}
