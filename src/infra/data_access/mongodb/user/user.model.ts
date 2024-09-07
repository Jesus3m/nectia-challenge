import { User } from "@core/users/user.entity";
import { UserRepository } from "@core/users/user.repository";
import { MongoClient, ObjectId } from "mongodb";
import { BaseEntity, DataAccess } from "../data_access";

export class UserModel
  extends DataAccess<User & BaseEntity>
  implements UserRepository
{
  constructor(client: MongoClient) {
    super(client, "users");
  }

  async findBy(filter: any): Promise<User | null> {
    const isObjectId = ObjectId.isValid(filter);

    const or: Array<Record<string, any>> = [
      {
        email: filter,
      },
      {
        user: filter,
      },
      {
        token: filter,
      },
      {
        phone: filter,
      },
    ];

    if (isObjectId) {
      or.push({
        _id: new ObjectId(filter),
      });
    }

    const result = await this.collection.findOne(
      {
        $or: or,
        deletedAt: null,
      } as any,
      {
        projection: {
          _id: 1,
          email: 1,
          user: 1,
          token: 1,
          name: 1,
          phone: 1,
          lastName: 1,
          createdAt: 1,
          password: 1,
          updatedAt: 1,
        },
      }
    );

    return result;
  }
}
