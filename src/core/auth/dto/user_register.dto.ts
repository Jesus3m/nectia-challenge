import { DTO, Dto } from "@common/decorators/dto";
import { IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator";

@Dto()
export class UserRegister extends DTO {
  @IsString({ message: "User must be a string" })
  user: string;
  @IsString({ message: "Name must be a string" })
  name: string;
  @IsString({ message: "Last name must be a string" })
  lastName: string;
  @IsString({ message: "Name must be a string" })
  @IsEmail()
  email: string;

  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;

  @IsString({ message: "Phone must be a string" })
  @IsPhoneNumber("CL")
  phone: string;
}
