import { build } from "esbuild";
import { copySync, removeSync } from "fs-extra";
import defaults from "./esbuild";

// prepare
removeSync("build");
copySync("public", "build");

build({
  define: { "process.env.NODE_ENV": '"production"' },
  ...defaults,
  minify: true,
}).catch((err: any) => console.log("Error:" + JSON.stringify(err)));
