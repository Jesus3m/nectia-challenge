import { Controller } from "@common/generics/controller";
import { Data } from "@common/generics/data";
import { Task } from "@core/task/task.entity";
import { TaskService } from "@core/task/task.service";
import { Request, Response } from "express";

export class TaskController extends Controller<Task> {
  constructor(private taskService: TaskService) {
    super(taskService);
  }

  async create(req: Request, res: Response) {
    const result = await this.taskService.createTask(req.body, req.user);
    return res.json(new Data(result, "task.created", 201));
  }
}
