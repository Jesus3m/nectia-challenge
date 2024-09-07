import { BaseError } from "@common/errors";
import { Repository } from "@common/generics/repository";
import { Filter as FilterQuery } from "@common/interfaces/filter";
import {
  Collection,
  Filter,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
} from "mongodb";

export interface BaseEntity {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class DataAccess<T extends BaseEntity> implements Repository<T> {
  collection!: Collection<T>;

  constructor(public client: MongoClient, public coll: string) {
    this.collection = client.db("nectia").collection<T>(coll);
  }

  async get(id: string): Promise<T | null> {
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) throw new BaseError("Invalid ID", 404);
    const data = await this.collection.findOne({
      _id: new ObjectId(id),
      deletedAt: null,
    } as Filter<T>);
    if (!data) throw new BaseError("Not Found");

    return data as T;
  }

  async getAll(filter?: FilterQuery): Promise<T[]> {
    const aggregation: Array<Record<string, any>> = [
      {
        $match: {
          deletedAt: null,
          user_id: new ObjectId(filter!.owner),
        },
      },
    ];

    if (filter?.filter_by) {
      aggregation.push({
        $match: {
          [filter.filter_by]: { $regex: filter.filter, $options: "i" },
          deletedAt: null,
          user_id: new ObjectId(filter.owner),
        },
      });
    }

    if (filter?.sort_by) {
      aggregation.push({
        $sort: {
          [filter.sort_by]: filter.sort === "asc" ? 1 : -1,
        },
      });
    }

    if (filter?.page && filter?.page_size) {
      aggregation.push({
        $skip: (filter.page - 1) * filter.page_size,
      });

      aggregation.push({
        $limit: filter.page_size,
      });
    }

    const data = await this.collection.aggregate(aggregation).toArray();
    if (!data) throw new BaseError("Not Found", 404);
    return data as T[];
  }

  getTotal(filter: FilterQuery): Promise<number> {
    let match: Record<string, any> = {
      user_id: new ObjectId(filter.owner),
      deletedAt: null,
    };

    if (filter?.filter_by) {
      match[filter.filter_by] = { $regex: filter.filter, $options: "i" };
    }
    return this.collection.countDocuments(match as Filter<T>);
  }

  async create<R>(data: R): Promise<T> {
    const result = await this.collection.insertOne({
      ...data,
      createdAt: new Date(),
    } as OptionalUnlessRequiredId<T>);

    return {
      _id: result.insertedId?.toString(),
    } as T;
  }

  async update(id: string, data: T): Promise<T> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) } as Filter<T>,
      { $set: { ...data, updatedAt: new Date() } }
    );
    if (result.modifiedCount === 0) throw new BaseError("Not Found");
    return data;
  }

  async delete(id: string): Promise<T> {
    const result = await this.collection.updateOne(
      {
        _id: new ObjectId(id),
      } as Filter<T>,
      {
        $set: { deletedAt: new Date() } as any,
      }
    );
    if (result.modifiedCount === 0) throw new BaseError("Not Found");
    return {} as T;
  }
}
