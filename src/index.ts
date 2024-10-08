import "express-async-errors";
import "./alias";
// Imports
import { HttpServer } from "@common/config/server";
import router from "@infra/ports/rest";
import { MongoConnection } from "./common/config/connections/mongodb";

const server = new HttpServer();
HttpServer.setRouter(router);
const client = new MongoConnection();

server.listen(Number(process.env.PORT) || 3005);
