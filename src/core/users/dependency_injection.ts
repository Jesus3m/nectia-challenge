import { MongoConnection } from "@common/config/connections/mongodb";
import { UserModel } from "@infra/data_access/mongodb/user/user.model";
import { UserService } from "./user.service";

const client = new MongoConnection().get();

const model = new UserModel(client);

export const service = new UserService(model);
