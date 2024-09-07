import { MongoConnection } from "@common/config/connections/mongodb";
import { TaskModel } from "@infra/data_access/mongodb/task/task.model";
import { TaskService } from "./task.service";

const client = new MongoConnection().get();

const model = new TaskModel(client);

export const service = new TaskService(model);
