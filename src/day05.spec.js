import { part1, part2 } from "./day05";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day05.txt");
const exampleInput = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
];

describe("day05", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("CMZ");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).not.toStrictEqual("BJVPHCGBT");
      expect(actual).toStrictEqual("VJSFHWGFT");
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual("MCD");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("LCTQFBVZV");
    });
  });
});
