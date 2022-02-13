import { promises as fs } from "fs";
import * as path from "path";

export default async function create(name: string, options: any) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  await fs.mkdir(path.join(process.cwd(), name));

  const componentFile = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.tsx"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.tsx`),
    componentFile.replace(/__Component__/g, componentName)
  );

  const storyFile = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.stories.tsx"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.stories.tsx`),
    storyFile.replace(/__Component__/g, componentName)
  );
}
