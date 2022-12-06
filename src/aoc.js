import fs from "fs";
import _ from "lodash";

export function readInput(filename) {
  return _.chain(fs.readFileSync(filename, "utf-8")).trimEnd().split("\n").value();
}
