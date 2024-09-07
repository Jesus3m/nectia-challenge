import { Repository } from "@common/generics/repository";
import { User } from "./user.entity";

export interface UserRepository extends Repository<User> {
  findBy(filter: any): Promise<User | null>;
}
