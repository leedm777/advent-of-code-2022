import fs from "fs";

export function readInput(filename) {
  return fs.readFileSync(filename, "utf-8").trim().split("\n");
}
