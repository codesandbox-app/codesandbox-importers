import { ISandboxDirectory } from "codesandbox-import-util-types";

export function getDirectoryPaths(directories: ISandboxDirectory[]) {
  let paths: { [p: string]: ISandboxDirectory } = {};

  const addDirectory = (
    prevPath: string,
    directoryShortid: string | undefined
  ) => {
    const dir = directories.find(
      (d) => d.directoryShortid === directoryShortid && d.title === d.title
    );

    if (dir) {
      const dirPath = prevPath + "/" + dir.title;
      paths[dirPath] = dir;
      addDirectory(dirPath, dir.shortid);
    }
  };

  directories
    .filter((x) => x.directoryShortid == null)
    .forEach((dir) => {
      paths["/" + dir.title] = dir;

      addDirectory("/" + dir.title, dir.shortid);
    });

  return paths;
}
