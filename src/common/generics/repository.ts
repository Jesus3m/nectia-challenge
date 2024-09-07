import { Filter } from "@common/interfaces/filter";

export interface Repository<T> {
  get(id: string): Promise<T | null>;
  getAll(filter?: Filter): Promise<T[]>;
  getTotal(filter?: Filter): Promise<number>;
  create<R>(data: R): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}
