import { existsSync, promises as fs } from "fs";
import * as path from "path";

export default async function create(name: string, options: any) {
  const dirName = name.charAt(0).toLowerCase() + name.slice(1);
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  await fs.mkdir(path.join(process.cwd(), dirName));

  const globalStylesFileExists = existsSync("styles/globals.scss");

  if (globalStylesFileExists) {
    await appendImportToGlobalStylesFile(dirName, componentName);
  }

  return Promise.all([
    createComponentFile(dirName, componentName),
    createStoryFile(dirName, componentName),
    createTestFile(dirName, componentName),
    createIndexFile(dirName, componentName),
    createScssFile(dirName, componentName),
  ]);
}

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

async function createComponentFile(dirName: string, componentName: string) {
  return createFileFromTemplate(dirName, componentName, ".tsx");
}

async function createStoryFile(dirName: string, componentName: string) {
  return createFileFromTemplate(dirName, componentName, ".stories.tsx");
}

async function createTestFile(dirName: string, componentName: string) {
  return createFileFromTemplate(dirName, componentName, ".test.tsx");
}

async function createScssFile(dirName: string, componentName: string) {
  return createFileFromTemplate(dirName, componentName, ".styles.scss");
}

async function createFileFromTemplate(
  dirName: string,
  componentName: string,
  fileSuffix: string
) {
  const templateFileContent = await fs.readFile(
    path.join(process.cwd(), `template/typescript/__Component__${fileSuffix}`),
    { encoding: "utf-8" }
  );

  return fs.writeFile(
    path.join(process.cwd(), dirName, `${componentName}${fileSuffix}`),
    templateFileContent.replace(/__Component__/g, componentName)
  );
}

async function createIndexFile(dirName: string, componentName: string) {
  const indexFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/index.ts"),
    { encoding: "utf-8" }
  );

  return fs.writeFile(
    path.join(process.cwd(), dirName, "index.ts"),
    indexFileContent.replace(/__Component__/g, componentName)
  );
}
