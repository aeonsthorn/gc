import path from "path";
import { promises as fs, existsSync } from "fs";

export default async function loadConfig() {
  const configFilePath = path.join(process.cwd(), "gc-react.config.json");

  if (!existsSync(configFilePath)) return {};

  const jsonConfig = await fs.readFile(configFilePath, { encoding: "utf-8" });

  return JSON.parse(jsonConfig);
}
