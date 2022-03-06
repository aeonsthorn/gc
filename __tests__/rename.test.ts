import { promises as fs, existsSync } from "fs";
import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  it,
  expect,
} from "@jest/globals";
import create from "../src/core/create";

describe.skip("rename command should rename a component", () => {
  beforeAll(async () => {
    await fs.mkdir("styles");
    return fs.writeFile(
      "styles/globals.scss",
      "@use '../components/coco/Coco.styles.scss';body { color: red; }"
    );
  });

  afterEach(async () => {
    await fs.rm("coco", { recursive: true, force: true });
    return fs.rm("yoyo", { recursive: true, force: true });
  });

  afterAll(async () => {
    await fs.unlink("styles/globals.scss");
    return fs.rmdir("styles");
  });

  it.skip("should rename all the files and change the import in the globals.scss file", async () => {
    await create("yoyo", { quiet: true });

    // @ts-ignore
    await rename("yoyo", "popo");

    expect(existsSync("popo/Popo.tsx")).toBe(true);

    expect(existsSync("popo/Popo.stories.tsx")).toBe(true);

    expect(existsSync("popo/Popo.test.tsx")).toBe(true);

    expect(existsSync("popo/index.ts")).toBe(true);

    expect(existsSync("popo/Popo.styles.scss")).toBe(true);

    const scssGlobalFileContent = await fs.readFile("styles/globals.scss", {
      encoding: "utf-8",
    });

    expect(scssGlobalFileContent).toContain(
      "@use '../components/popo/Popo.styles.scss';"
    );
  });
});
