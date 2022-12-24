import { part1, part2 } from "./day22";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day22.txt");
const exampleInput = [
  "        ...#",
  "        .#..",
  "        #...",
  "        ....",
  "...#.......#",
  "........#...",
  "..#....#....",
  "..........#.",
  "        ...#....",
  "        .....#..",
  "        .#......",
  "        ......#.",
  "",
  "10R5L5R10L4R5L5",
];

describe("day22", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(6032);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(159034);
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
