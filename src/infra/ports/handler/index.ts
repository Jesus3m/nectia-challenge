import "express-async-errors";
import "./alias";
// Imports
import { MongoConnection } from "@common/config/connections/mongodb";
import { HttpServer } from "@common/config/server/index";
import serverlessExpress from "@vendia/serverless-express";
import { type ConfigureResult } from "@vendia/serverless-express/src/configure";
import {
  type APIGatewayEvent,
  type APIGatewayProxyEvent,
  type Callback,
  type Context,
  type Handler,
} from "aws-lambda";
import { type Application } from "express";
import { MongoClient } from "mongodb";

let serverless: Handler<APIGatewayProxyEvent, any> &
  ConfigureResult<APIGatewayProxyEvent, any>;

const app: Application = new HttpServer().get();
let conn: MongoClient = null as any;

async function asyncTask() {
  if (conn) return;
  await new MongoConnection().get().connect();
  conn = new MongoConnection().get();
}

async function setup(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  await asyncTask();
  serverless = serverlessExpress({ app });
  return await serverless(event, context, callback);
}

async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  if (serverless !== undefined) {
    return await serverless(event, context, callback);
  }

  return await setup(event, context, callback);
}

exports.handler = handler;
