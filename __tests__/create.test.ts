import create from "../src/create";
import { promises as fs, existsSync } from "fs";

describe("create command should create a component", () => {
  beforeAll(async () => {
    await fs.mkdir("styles");
    return fs.writeFile("styles/globals.scss", "body { color: red; }");
  });

  afterEach(async () => {
    return fs.rm("coco", { recursive: true, force: true });
  });

  afterAll(async () => {
    await fs.unlink("styles/globals.scss");
    return fs.rmdir("styles");
  });

  it("should create the files based on the template", async () => {
    await create("coco", {
      quiet: true,
    });

    expect(existsSync("coco/Coco.tsx")).toBe(true);

    expect(existsSync("coco/Coco.stories.tsx")).toBe(true);

    expect(existsSync("coco/Coco.test.tsx")).toBe(true);

    expect(existsSync("coco/index.ts")).toBe(true);

    expect(existsSync("coco/Coco.styles.scss")).toBe(true);

    const scssGlobalFileContent = await fs.readFile("styles/globals.scss", {
      encoding: "utf-8",
    });

    expect(scssGlobalFileContent).toContain(
      "@use '../components/coco/Coco.styles.scss';"
    );
  });
});
