import { Command } from "commander";

import create from "./core/create";
import remove from "./core/remove";

const program = new Command();

program
  .name("GC")
  .description("Generate components and related utils")
  .version("0.0.1");

program
  .command("create")
  .description("Create a new component")
  .argument("<name>", "Name for the component")
  .option("--quiet", "Quiet mode")
  .option("--global-styles", "Add component scss import to global.scss file")
  .option(
    "--template <string>",
    `Name of the template you want to use.
    The tool comes with an increasing number of builtins but you can bring your own.
    Read the online documentation to learn how.`
  )
  .option("--dry-run", "Dry run")

  .action(create);

program
  .command("rename")
  .description("Rename a component")
  .argument("<oldName>", "Name for the component")
  .argument("<newName>", "New name for the component")
  .action((oldName, newName) => {
    console.log({ oldName });
    console.log({ newName });
    console.error("not implemented yet");
  });

program
  .command("remove")
  .description("Delete a component")
  .argument("<name>", "Name for the component")
  .option("--quiet", "Quiet mode")
  .option("--dry-run", "Dry run")

  .action(remove);

program.parse(process.argv);
