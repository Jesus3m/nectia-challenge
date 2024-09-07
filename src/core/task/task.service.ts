import { Service } from "@common/generics/service";
import { User } from "@core/users/user.entity";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";

export class TaskService extends Service<Task> {
  constructor(private taskRepository: TaskRepository) {
    super(taskRepository);
  }

  createTask(data: Task, user?: User): Promise<Task> {
    return this.taskRepository.createTask({
      ...data,
      user_id: user?._id!,
      status: "pending",
      dueDate: new Date(data.dueDate!),
    });
  }
}
