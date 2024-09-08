import { Dto, DTO } from "@common/decorators/dto";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Task } from "../task.entity";

@Dto()
export class CreateTask extends DTO implements Task {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  status: string;

  @IsDateString()
  dueDate?: Date;

  user_id: string;
}
