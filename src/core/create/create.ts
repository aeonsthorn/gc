import { existsSync, promises as fs } from "fs";
import * as path from "path";
import chalk from "chalk";

import loadConfig from "../loadConfig";

import appendImportToGlobalStylesFile from "../../plugins/appendImportToGlobalStylesFile";

if (process.env.JEST_WORKER_ID) {
  // eslint-disable-next-line no-global-assign
  __dirname = path.join(__dirname, "..", "..");
}

type Options = {
  dryRun?: boolean;
  quiet?: boolean;
  templateName?: string;
};

export default async function create(name: string, options: Options) {
  const configFileOptions = await loadConfig();

  const mergedOptions = { ...configFileOptions, ...options };

  if (!mergedOptions.templateName) {
    mergedOptions.templateName = "ts-globalScss";
  }

  const dirName = name.charAt(0).toLowerCase() + name.slice(1);
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  if (mergedOptions.dryRun) {
    console.log("\n----- DRY RUN -----\n");
    logOutput(dirName, componentName);
    return;
  }

  try {
    await fs.mkdir(path.join(process.cwd(), "components", dirName), {
      recursive: true,
    });

    const globalStylesFileExists = existsSync("styles/globals.scss");

    if (globalStylesFileExists) {
      await appendImportToGlobalStylesFile(dirName, componentName);
    }

    const templateFilesDir = path.join(__dirname, "..", "template");

    const templateFileNames = await fs.readdir(
      path.join(templateFilesDir, mergedOptions.templateName)
    );

    const createFilePromises = templateFileNames.map((templateFileName) =>
      createFileFromTemplate(
        dirName,
        componentName,
        templateFileName,
        mergedOptions
      )
    );

    await Promise.all(createFilePromises);
  } catch (e: any) {
    console.error(chalk.red(e));

    return;
  }

  if (!mergedOptions.quiet) {
    logOutput(dirName, componentName);
  }
}

function logOutput(dirName: string, componentName: string) {
  okLog(`Created folder components/${dirName}`);
  okLog(`Created file components/${dirName}/${componentName}.tsx`);

  okLog(`Created file components/${dirName}/${componentName}.styles.scss`);

  okLog(`Created file components/${dirName}/${componentName}.test.tsx`);

  okLog(`Created file components/${dirName}/${componentName}.stories.tsx`);

  okLog(`Created file components/${dirName}/index.tsx`);
}

const okLog = (...args: any) => console.log(chalk.green(...args));

async function createFileFromTemplate(
  dirName: string,
  componentName: string,
  templateFileName: string,
  options: Options
) {
  const templateFileContent = await fs.readFile(
    path.join(
      __dirname,
      "..",

      `template/${options.templateName}/${templateFileName}`
    ),
    { encoding: "utf-8" }
  );

  return fs.writeFile(
    path.join(
      process.cwd(),
      "components",
      dirName,
      `${templateFileName.replace("__Component__", componentName)}`
    ),
    templateFileContent.replace(/__Component__/g, componentName)
  );
}
