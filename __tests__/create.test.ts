import create from "../src/create";
import { promises as fs, existsSync } from "fs";
import * as path from "path";

describe("create command should create a component", () => {
  beforeEach(async () => {});

  afterEach(async () => {
    return fs.rm("coco", { recursive: true, force: true });
  });

  afterAll(async () => {});

  it("should create the files based on the template", async () => {
    await create("coco", {});

    expect(existsSync("coco/Coco.tsx")).toBe(true);
  });
});
