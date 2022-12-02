import _ from "lodash";
import { readInput } from "./aoc.js";

async function main() {
  return _.range(1, 26).reduce(async (prior, day) => {
    await prior;

    try {
      const dayStr = _.padStart(day.toString(10), 2, "0");
      const puzzleInput = readInput(`./src/day${dayStr}.txt`);
      // https://github.com/mysticatea/eslint-plugin-node/issues/250
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      const solver = await import(`./day${dayStr}.js`);

      console.log(`Day ${day}:`);

      const soln1 = solver.part1(puzzleInput);
      console.log(`  part1: ${soln1}`);

      const soln2 = solver.part2(puzzleInput);
      console.log(`  part2: ${soln2}`);
    } catch (err) {
      // ENOENT means the input file is missing; skip
      if (err.code === "ENOENT") {
        return;
      }
      throw err;
    }
  }, Promise.resolve());
}

main().catch((err) =>
  process.nextTick(() => {
    throw err;
  })
);
