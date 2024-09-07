import cors from "cors";
import express, { Application, Router } from "express";
export class HttpServer {
  static app: Application;

  constructor() {
    if (!HttpServer.app) {
      HttpServer.app = express();
      this.init();
    }
  }

  get() {
    return HttpServer.app;
  }

  init() {
    HttpServer.app.use(express.json());
    HttpServer.app.use(cors());
  }

  listen(port: number) {
    HttpServer.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  static setRouter(router: Router) {
    HttpServer.app.use("/v1", router);
  }
}
