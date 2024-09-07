import { Repository } from "@common/generics/repository";
import { Task } from "./task.entity";

export interface TaskRepository extends Repository<Task> {
  createTask(data: Task): Promise<Task>;
  getTaskByOwner(id: string, userId: string): Promise<Task>;
}
