import { existsSync, promises as fs } from "fs";
import * as path from "path";
import chalk from "chalk";

import loadConfig from "../loadConfig";

import appendImportToGlobalStylesFile from "../../plugins/appendImportToGlobalStylesFile";

if (isJest()) {
  // eslint-disable-next-line no-global-assign
  __dirname = path.join(__dirname, "..", "..");
}

type Options = {
  dryRun?: boolean;
  quiet?: boolean;
  template?: string;
  globalStyles?: boolean;
};

const DEFAULT_TEMPLATE_NAME = "ts-globalScss";

export default async function create(name: string, options: Options) {
  const configFileOptions = await loadConfig();

  const mergedOptions = {
    template: DEFAULT_TEMPLATE_NAME,
    ...configFileOptions,
    ...options,
  };

  if (mergedOptions.dryRun && mergedOptions.quiet) {
    printOnlineHelp();

    return;
  }

  const dirName = name.charAt(0).toLowerCase() + name.slice(1);
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  if (existsSync(path.join(process.cwd(), "components", dirName))) {
    console.log(chalk.red(`Component ${name} already exists`));
    return;
  }

  if (mergedOptions.globalStyles) {
    const globalStylesFileExists = existsSync("styles/globals.scss");

    if (globalStylesFileExists) {
      await appendImportToGlobalStylesFile(dirName, componentName);
    } else {
      console.log(chalk.red(`Aborting, Could not find styles/globals.scss`));
      return;
    }
  }

  try {
    if (!mergedOptions.dryRun) {
      await fs.mkdir(path.join(process.cwd(), "components", dirName), {
        recursive: true,
      });
    }

    if (!options.quiet) {
      okLog(`Created folder components/${dirName}`);
    }

    const templateFilesDir = hasACustomTemplateDir()
      ? path.join(process.cwd(), "template")
      : path.join(__dirname, "..", "template");

    const templateFileNames = await fs.readdir(
      path.join(templateFilesDir, mergedOptions.template)
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
  }
}

async function createFileFromTemplate(
  dirName: string,
  componentName: string,
  templateFileName: string,
  options: Options
) {
  const pathLeadingToTemplateFolder = hasACustomTemplateDir()
    ? path.join(process.cwd())
    : path.join(__dirname, "..");

  const templateFileContent = await fs.readFile(
    path.join(
      pathLeadingToTemplateFolder,

      `template/${options.template}/${templateFileName}`
    ),
    { encoding: "utf-8" }
  );

  if (options.dryRun) {
    okLog(
      `Created file components/${dirName}/${templateFileName.replace(
        "__Component__",
        componentName
      )}`
    );
    return;
  }

  await fs.writeFile(
    path.join(
      process.cwd(),
      "components",
      dirName,
      `${templateFileName.replace("__Component__", componentName)}`
    ),
    templateFileContent.replace(/__Component__/g, componentName)
  );

  if (options.quiet) return;

  okLog(
    `Created file components/${dirName}/${templateFileName.replace(
      "__Component__",
      componentName
    )}`
  );
}

function okLog(arg: string): void {
  console.log(chalk.green(arg));
}

function hasACustomTemplateDir(): boolean {
  return existsSync(path.join(process.cwd(), "template"));
}

function isJest(): boolean {
  return !!process.env.JEST_WORKER_ID;
}

function printOnlineHelp() {
  console.log(
    chalk.magenta(
      "Unsure about the usage of the program? visit us at https://carboniaweb.com"
    )
  );
}
