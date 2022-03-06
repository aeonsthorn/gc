import { promises as fs, existsSync } from "fs";
import {
  describe,
  beforeEach,
  afterEach,
  afterAll,
  it,
  expect,
} from "@jest/globals";
import create from "../src/core/create";

import remove from "../src/core/remove";

describe("destroy command should destroy a component", () => {
  beforeEach(async () => {
    await fs.mkdir("styles");
    return fs.writeFile(
      "styles/globals.scss",
      "@use '../components/coco/Coco.styles.scss';body { color: red; }"
    );
  });

  afterEach(async () => {
    await fs.rm("styles", { recursive: true, force: true });
    await fs.rm("coco", { recursive: true, force: true });
    return fs.rm("yoyo", { recursive: true, force: true });
  });

  afterAll(async () => fs.rm("components", { recursive: true, force: true }));

  it("should destroy all the files and remove the import in the globals.scss file", async () => {
    await create("yoyo", { quiet: true });

    await remove("yoyo", { quiet: true });

    expect(existsSync("components/yoyo/Yoyo.tsx")).toBe(false);

    expect(existsSync("components/yoyo/Yoyo.stories.tsx")).toBe(false);

    expect(existsSync("components/yoyo/Yoyo.test.tsx")).toBe(false);

    expect(existsSync("components/yoyo/index.ts")).toBe(false);

    expect(existsSync("componentss/yoyo/Yoyo.styles.scss")).toBe(false);

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

    await remove("coco", { quiet: true });

    expect(existsSync("components/kiki/Kiki.tsx")).toBe(true);
    expect(existsSync("components/kiki/Kiki.stories.tsx")).toBe(true);
    expect(existsSync("components/kiki/Kiki.test.tsx")).toBe(true);
    expect(existsSync("components/kiki/index.ts")).toBe(true);
    expect(existsSync("components/kiki/Kiki.styles.scss")).toBe(true);
  });
});
