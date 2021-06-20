import { Platform } from "esbuild";

const esbuildDefaults = {
  target: "es2015",
  platform: "browser" as Platform,
  entryPoints: ["src/index.tsx"],
  outdir: "build",
  bundle: true,
};

export default esbuildDefaults;
