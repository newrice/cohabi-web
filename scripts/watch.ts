import { build } from "esbuild";
import { copySync, removeSync } from "fs-extra";
import defaults from "./esbuild";

// prepare
removeSync("build");
copySync("public", "build");

build({
  define: { "process.env.NODE_ENV": '"development"' },
  ...defaults,
  sourcemap: true,
  watch: {
    onRebuild(err, result) {
      if (err) {
        console.log(JSON.stringify(err.errors));
      } else {
        console.log(new Date().toLocaleString() + ": updated...");
      }
      if (result && result.warnings.length) {
        console.log(JSON.stringify(result.warnings));
      }
    },
  },
})
  .then(() => {
    console.log(new Date().toLocaleString() + ": watching...");
  })
  .catch((err: any) => console.log("Error:" + JSON.stringify(err)));
