import { part1, part2 } from "./day24";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day24.txt");
const exampleInput = [
  "#.######",
  "#>>.<^<#",
  "#.<..<<#",
  "#>v.><>#",
  "#<^v^^>#",
  "######.#",
];

describe("day24", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(18);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(271);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(54);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(813);
    });
  });
});
