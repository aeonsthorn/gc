import { promises as fs } from "fs";
import path from "path";

export default async function removeImportFromGlobalStylesFile(
  dirName: string,
  componentName: string
) {
  const globalStylesFile = await fs.readFile("styles/globals.scss", {
    encoding: "utf-8",
  });

  const lineToRemove = `@use '../components/${dirName}/${componentName}.styles.scss';\n`;

  const newStylesFile = globalStylesFile.replace(lineToRemove, "");

  await fs.writeFile(
    path.join(process.cwd(), "styles/globals.scss"),
    newStylesFile
  );
}
