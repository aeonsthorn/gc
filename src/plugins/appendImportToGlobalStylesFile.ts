import { promises as fs } from "fs";
import path from "path";

async function appendImportToGlobalStylesFile(
  dirName: string,
  componentName: string
) {
  const globalStylesFile = await fs.readFile("styles/globals.scss", {
    encoding: "utf-8",
  });

  await fs.writeFile(
    path.join(process.cwd(), "styles/globals.scss"),
    `@use '../components/${dirName}/${componentName}.styles.scss';\n${globalStylesFile}`
  );
}

export default appendImportToGlobalStylesFile;
