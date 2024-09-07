/* eslint-disable no-console */
import { config } from "@common/config";
import { MongoClient } from "mongodb";

export class MongoConnection {
  static instance: MongoClient;

  constructor() {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoClient(config.DATABASE.URL as string);
      MongoConnection.instance.connect();
    }

    MongoConnection.instance.on("connectionReady", () => {
      console.log("Base de datos Lista");
    });
  }

  get() {
    return MongoConnection.instance;
  }
}
