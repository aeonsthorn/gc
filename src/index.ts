import { Command } from "commander";

import create from "./core/create";
// @ts-ignore
import destroy from "./core/destroy";

const program = new Command();

program
  .name("GC")
  .description("Generate components and related utils")
  .version("0.0.1");

program
  .command("create")
  .description("Create a new component")
  .argument("<name>", "Name for the component")
  .option("--dry-run", "Dry run")
  .option("--js", "Javascript version")
  .option("--quiet", "Quiet mode")

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
  .command("destroy")
  .description("Delete a component")
  .argument("<name>", "Name for the component")
  .action((name) => {
    console.log({ name });
    destroy(name);
  });

program.parse(process.argv);
