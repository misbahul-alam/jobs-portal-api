import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  clean: true,
  minify: true,
  target: "node24",
  sourcemap: true,
  outDir: "dist",

  dts: false,
  bundle: false,
});
