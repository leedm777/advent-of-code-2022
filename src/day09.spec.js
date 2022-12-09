import { part1, part2 } from "./day09";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day09.txt");
const exampleInput = [
  "R 4",
  "U 4",
  "L 3",
  "D 1",
  "R 4",
  "D 1",
  "L 5",
  "R 2"
];

describe("day09", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(13);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(5907);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
