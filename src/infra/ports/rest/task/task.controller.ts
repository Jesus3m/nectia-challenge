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

  async getAll(req: Request, res: Response) {
    const data = await this.taskService.getAll({
      filter: req.query.filter as string,
      filter_by: req.query.filter_by as string,
      page: Number(req.query.page) as number,
      page_size: Number(req.query.page_size) as number,
      sort: req.query.sort as string,
      sort_by: req.query.sort_by as string,
      owner: req.user?._id as string,
    });
    res.json(
      new Data(data.data, "success.getAll", 200, {
        total: data.total,
        page_size: Number(req.query.page_size),
        page: Number(req.query.page),
      })
    );
  }
}
