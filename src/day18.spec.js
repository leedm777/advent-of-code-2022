import { part1, part2 } from "./day18";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day18.txt");
const exampleInput = [
  "2,2,2",
  "1,2,2",
  "3,2,2",
  "2,1,2",
  "2,3,2",
  "2,2,1",
  "2,2,3",
  "2,2,4",
  "2,2,6",
  "1,2,5",
  "3,2,5",
  "2,1,5",
  "2,3,5",
];

describe("day18", () => {
  describe("part 1", () => {
    it("should work with the tiny sample", () => {
      const actual = part1(["1,1,1", "2,1,1"]);
      expect(actual).toStrictEqual(10);
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(64);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(4456);
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
