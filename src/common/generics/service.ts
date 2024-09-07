import { Filter } from "@common/interfaces/filter";
import { Repository } from "./repository";

export class Service<T> {
  constructor(private repository: Repository<T>) {}

  async get(id: string) {
    return await this.repository.get(id);
  }

  async getAll(filter?: Filter) {
    const total = await this.repository.getTotal(filter);
    const data = await this.repository.getAll(filter);
    return {
      total,
      data,
    };
  }

  async create(data: T) {
    return await this.repository.create(data);
  }

  async update(id: string, data: T) {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
