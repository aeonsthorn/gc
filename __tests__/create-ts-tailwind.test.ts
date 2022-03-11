import { promises as fs, existsSync } from "fs";
import { describe, afterEach, it, expect } from "@jest/globals";
import create from "../src/core/create";

describe("create command should create a component", () => {
  afterEach(async () => fs.rm("components", { recursive: true, force: true }));

  it("should create the files based on the template", async () => {
    await create("coco", {
      quiet: true,
      template: "ts-tailwind",
    });

    expect(existsSync("components/coco/Coco.tsx")).toBe(true);

    expect(existsSync("components/coco/Coco.stories.tsx")).toBe(true);

    expect(existsSync("components/coco/Coco.test.tsx")).toBe(true);

    expect(existsSync("components/coco/index.ts")).toBe(true);
  });
});
