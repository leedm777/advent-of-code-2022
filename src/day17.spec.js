import { part1, part2 } from "./day17";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day17.txt");
const exampleInput = [">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"];

describe("day17", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(3068);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(3153);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(1514285714288);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
