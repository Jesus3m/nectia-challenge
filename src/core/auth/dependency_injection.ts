import { BcryptAdapter } from "@common/adapters/encrypt/bcrypt.adapter";
import { JWTAdapter } from "@common/adapters/jwt/jwt.adapter";
import { MongoConnection } from "@common/config/connections/mongodb";
import { UserModel } from "@infra/data_access/mongodb/user/user.model";
import { AuthService } from "./auth.service";
import { LoginUserUseCase } from "./use_cases/login_user.usecase";
import { RegisterUserUseCase } from "./use_cases/register_user.usecase";

const client = new MongoConnection().get();

// models
const userModel = new UserModel(client);

// Adapters
const encrypt = new BcryptAdapter();
const jwt = new JWTAdapter();

// Use Cases
const registerUserUseCase = new RegisterUserUseCase(userModel, encrypt, jwt);
const loginUserUseCase = new LoginUserUseCase(userModel, encrypt, jwt);

export const authService = new AuthService(
  userModel,
  registerUserUseCase,
  loginUserUseCase
);
