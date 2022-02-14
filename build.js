// eslint-disable-next-line
require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/bundle.js",
    platform: "node",
    minify: true,
  })

  .catch(() => process.exit(1));
