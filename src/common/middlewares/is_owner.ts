import { Unauthorized } from "@common/errors/unauthorized.error";
import { TaskRepository } from "@core/task/task.repository";

export class IsOwnerMiddleware {
  constructor(private taskRepository: TaskRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(req: any, res: any, next: any) {
    const user = req.user;
    const taskId = req.params.id;

    const task = await this.taskRepository.getTaskByOwner(taskId, user._id);
    if (!task) {
      throw new Unauthorized("User not owner of this task");
    }

    next();
  }
}
