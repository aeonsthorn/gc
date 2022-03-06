import { existsSync, promises as fs } from "fs";
import * as path from "path";
import chalk from "chalk";

import loadConfig from "../loadConfig";

import removeImportFromGlobalStylesFile from "../../plugins/removeImportFromGlobalStylesFile";

if (isJest()) {
  // eslint-disable-next-line no-global-assign
  __dirname = path.join(__dirname, "..", "..");
}

type Options = {
  dryRun?: boolean;
  quiet?: boolean;
};

export default async function remove(name: string, options: Options) {
  const configFileOptions = await loadConfig();

  const mergedOptions = {
    ...configFileOptions,
    ...options,
  };

  if (mergedOptions.dryRun && mergedOptions.quiet) {
    printOnlineHelp();

    return;
  }

  const dirName = name.charAt(0).toLowerCase() + name.slice(1);
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  try {
    if (mergedOptions.dryRun) {
      okLog(`Removing folder components/${dirName}`);
      return;
    }

    if (!options.quiet) {
      okLog(`Removing folder components/${dirName}`);
    }

    const globalStylesFileExists = existsSync("styles/globals.scss");

    if (globalStylesFileExists) {
      await removeImportFromGlobalStylesFile(dirName, componentName);
    }

    const componentFolderToRemove = path.join(
      process.cwd(),
      "components",
      dirName
    );

    await fs.rm(componentFolderToRemove, {
      recursive: true,
      force: true,
    });
  } catch (e: any) {
    console.error(chalk.red(e));
  }
}

function okLog(arg: string): void {
  console.log(chalk.green(arg));
}

function isJest(): boolean {
  return !!process.env.JEST_WORKER_ID;
}

function printOnlineHelp() {
  console.log(
    chalk.magenta(
      "Unsure about the usage of the program? visit us at https://carboniaweb.com/gc-create"
    )
  );
}
