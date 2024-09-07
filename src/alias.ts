import moduleAlias from "module-alias";

const env = process.env.NODE_ENV !== "local" ? "dist" : "src";

moduleAlias.addAlias("@core", __dirname + `/core`);
moduleAlias.addAlias("@common", __dirname + `/common`);
moduleAlias.addAlias("@infra", __dirname + `/infra`);
