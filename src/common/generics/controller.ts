import { Request, Response } from "express";
import { Data } from "./data";

export class Controller {
  constructor(private service: any) {
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async get(req: Request, res: Response) {
    const data = await this.service.get(req.params.id);

    res.json(new Data(data, "Success Get", 200));
  }

  async getAll(req: Request, res: Response) {
    const data = await this.service.getAll(req.query);
    res.json(new Data(data, "Success Get All", 200));
  }

  async create(req: Request, res: Response) {
    const data = await this.service.create(req.body);
    res.json(new Data(data, "Success Create", 201));
  }

  async update(req: Request, res: Response) {
    const data = await this.service.update(req.params.id, req.body);
    res.json(new Data(data, "Success Update", 200));
  }

  async delete(req: Request, res: Response) {
    const data = await this.service.delete(req.params.id);
    res.json(new Data(data, "Success Delete", 200));
  }
}
