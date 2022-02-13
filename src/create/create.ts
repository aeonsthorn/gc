import { existsSync, promises as fs } from "fs";
import * as path from "path";

export default async function create(name: string, options: any) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  await fs.mkdir(path.join(process.cwd(), name));

  const componentFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.tsx"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.tsx`),
    componentFileContent.replace(/__Component__/g, componentName)
  );

  const storyFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.stories.tsx"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.stories.tsx`),
    storyFileContent.replace(/__Component__/g, componentName)
  );

  const testFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.test.tsx"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.test.tsx`),
    testFileContent.replace(/__Component__/g, componentName)
  );

  const indexFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/index.ts"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, "index.ts"),
    indexFileContent.replace(/__Component__/g, componentName)
  );

  const scssFileContent = await fs.readFile(
    path.join(process.cwd(), "template/typescript/__Component__.styles.scss"),
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    path.join(process.cwd(), name, `${componentName}.styles.scss`),
    scssFileContent.replace(/__Component__/g, componentName)
  );

  const globalStylesFileExists = existsSync("styles/globals.scss");

  if (globalStylesFileExists) {
    const globalStylesFile = await fs.readFile("styles/globals.scss", {
      encoding: "utf-8",
    });

    await fs.writeFile(
      path.join(process.cwd(), "styles/globals.scss"),
      `@use '../components/${name}/${componentName}.styles.scss';\n${globalStylesFile}`
    );
  }
}
