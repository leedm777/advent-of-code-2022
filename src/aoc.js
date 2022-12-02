import fs from "fs";

export function readInput(filename) {
  return fs.readFileSync(filename, "utf-8").split("\n");
}
