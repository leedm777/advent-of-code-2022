import { part1, part2 } from "./day20";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day20.txt");
const exampleInput = ["1", "2", "-3", "3", "-2", "0", "4"];

describe("day20", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(3);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(2275);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(1623178306);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(4090409331120);
    });
  });
});
