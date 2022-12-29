import { part1, part2 } from "./day25";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day25.txt");
const exampleInput = [
  "1=-0-2",
  "12111",
  "2=0=",
  "21",
  "2=01",
  "111",
  "20012",
  "112",
  "1=-1=",
  "1-12",
  "12",
  "1=",
  "122",
];

describe("day25", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("2=-1=0");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("2=001=-2=--0212-22-2");
    });
  });

  describe.skip("part 2", () => {
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
