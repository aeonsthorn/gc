require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/bundle.js",
    platform: "node",
  })
  .catch(() => process.exit(1));
