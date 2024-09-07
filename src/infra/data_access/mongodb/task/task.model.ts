import { Task } from "@core/task/task.entity";
import { TaskRepository } from "@core/task/task.repository";
import { MongoClient, ObjectId } from "mongodb";
import { BaseEntity, DataAccess } from "../data_access";

export class TaskModel
  extends DataAccess<Task & BaseEntity>
  implements TaskRepository
{
  constructor(client: MongoClient) {
    super(client, "task");
  }

  async createTask(data: Task): Promise<Task & BaseEntity> {
    const result = await this.collection.insertOne({
      ...data,
      user_id: new ObjectId(data.user_id) as unknown as string,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return {
      _id: result.insertedId?.toString(),
      ...data,
    };
  }
}
