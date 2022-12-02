import fs from "fs";

export function readInput(filename) {
  return fs.readFileSync("./src/day01.txt", "utf-8").split("\n");
}
