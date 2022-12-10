import { part1, part2 } from "./day06";
import { readInput } from "./aoc";
import _ from "lodash";

const puzzleInput = readInput("./src/day06.txt");
const exampleInput = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

const exampleInput2 = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

describe("day06", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = _.map(exampleInput, part1);
      expect(actual).toStrictEqual([7, 5, 6, 10, 11]);
    });
    it("should work with the puzzle input", () => {
      const actual = _.map(puzzleInput, part1);
      expect(actual).toStrictEqual([1723]);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = _.map(exampleInput2, part2);
      expect(actual).toStrictEqual([19, 23, 23, 29, 26]);
    });
    it("should work with the puzzle input", () => {
      const actual = _.map(puzzleInput, part2);
      expect(actual).toStrictEqual([3708]);
    });
  });
});
