import { part1, part2 } from "./day13";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day13.txt");
const exampleInput = [
  "[1,1,3,1,1]",
  "[1,1,5,1,1]",
  "",
  "[[1],[2,3,4]]",
  "[[1],4]",
  "",
  "[9]",
  "[[8,7,6]]",
  "",
  "[[4,4],4,4]",
  "[[4,4],4,4,4]",
  "",
  "[7,7,7,7]",
  "[7,7,7]",
  "",
  "[]",
  "[3]",
  "",
  "[[[]]]",
  "[[]]",
  "",
  "[1,[2,[3,[4,[5,6,7]]]],8,9]",
  "[1,[2,[3,[4,[5,6,0]]]],8,9]",
];

describe("day13", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(13);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(5292);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(140);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(23868);
    });
  });
});
