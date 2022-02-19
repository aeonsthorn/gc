import { promises as fs } from "fs";

import { describe, it, expect } from "@jest/globals";

import loadConfig from "../src/core/loadConfig";

describe("readConfig should work as expected", () => {
  it("should read the config file from the cwd", async () => {
    await fs.writeFile("gc-react.config.json", "{}");

    expect(await loadConfig()).toEqual({});

    await fs.unlink("gc-react.config.json");
  });

  it("should not throw an error if there is no config file", async () => {
    expect(await loadConfig()).toEqual({});
  });
});
