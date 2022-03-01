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

import destroy from "../src/core/destroy/destroy";

describe("destroy command should destroy a component", () => {
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
    await fs.rm("components", { recursive: true, force: true });
    return fs.rmdir("styles");
  });

  it("should destroy all the files and remove the import in the globals.scss file", async () => {
    await create("yoyo", { quiet: true });

    await destroy("yoyo");

    expect(existsSync("yoyo/Yoyo.tsx")).toBe(false);

    expect(existsSync("yoyo/Yoyo.stories.tsx")).toBe(false);

    expect(existsSync("yoyo/Yoyo.test.tsx")).toBe(false);

    expect(existsSync("yoyo/index.ts")).toBe(false);

    expect(existsSync("yoyo/Yoyo.styles.scss")).toBe(false);

    const scssGlobalFileContent = await fs.readFile("styles/globals.scss", {
      encoding: "utf-8",
    });

    expect(scssGlobalFileContent).not.toContain(
      "@use '../components/yoyo/Yoyo.styles.scss';"
    );
  });

  it("should not remove other files in the component directory", async () => {
    await create("coco", { quiet: true });
    await create("kiki", { quiet: true });

    await destroy("coco");

    expect(existsSync("koko/Kiki.tsx")).toBe(true);
    expect(existsSync("koko/Kiki.stories.tsx")).toBe(true);
    expect(existsSync("koko/Kiki.test.tsx")).toBe(true);
    expect(existsSync("koko/index.ts")).toBe(true);
    expect(existsSync("koko/Kiki.styles.scss")).toBe(true);
  });
});
