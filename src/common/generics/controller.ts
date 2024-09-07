import { Request, Response } from "express";
import { Data } from "./data";
import { Service } from "./service";

export class Controller<T> {
  constructor(private service: Service<T>) {
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async get(req: Request, res: Response) {
    const data = await this.service.get(req.params.id);

    if (!data) {
      return res.status(404).json(new Data({}, "Not Found", 404));
    }

    res.json(new Data(data, "success.get", 200));
  }

  async getAll(req: Request, res: Response) {
    const data = await this.service.getAll({
      filter: req.query.filter as string,
      filter_by: req.query.filter_by as string,
      page: Number(req.query.page) as number,
      page_size: Number(req.query.page_size) as number,
      sort: req.query.sort as string,
      sort_by: req.query.sort_by as string,
    });
    res.json(
      new Data(data.data, "success.getAll", 200, {
        total: data.total,
        page_size: Number(req.query.page_size),
        page: Number(req.query.page),
      })
    );
  }

  async create(req: Request, res: Response) {
    const data = await this.service.create(req.body);

    if (!data) {
      return res.status(400).json(new Data({}, "Bad Request", 404));
    }
    return res.json(new Data(data, "success.create", 201));
  }

  async update(req: Request, res: Response) {
    const data = await this.service.update(req.params.id, req.body);
    if (!data) {
      return res.status(400).json(new Data({}, "Bad Request", 404));
    }
    res.json(new Data(data, "success.update", 200));
  }

  async delete(req: Request, res: Response) {
    const data = await this.service.delete(req.params.id);

    if (!data) {
      return res.status(400).json(new Data({}, "Bad Request", 404));
    }
    res.json(new Data(data, "success.delete", 200));
  }
}
