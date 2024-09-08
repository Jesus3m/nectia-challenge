import { Service } from "@common/generics/service";
import { User } from "@core/users/user.entity";
import { CreateTask } from "./dto/create_task";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";

export class TaskService extends Service<Task> {
  constructor(private taskRepository: TaskRepository) {
    super(taskRepository);
  }

  async createTask(data: CreateTask, user?: User): Promise<Task> {
    const task = new CreateTask(data);

    const valid = await task.validate();

    return this.taskRepository.createTask({
      ...data,
      user_id: user?._id!,
      status: "pending",
      dueDate: new Date(data.dueDate!),
    });
  }
}
