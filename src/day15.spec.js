import { part1, part2 } from "./day15";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day15.txt");
const exampleInput = [
  "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
  "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
  "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
  "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
  "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
  "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
  "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
  "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
  "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
  "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
  "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
  "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
  "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
  "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
];

describe("day15", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput, 10);
      expect(actual).toStrictEqual(26);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput, 2000000);
      expect(actual).toStrictEqual(4725496);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput, 20);
      expect(actual).toStrictEqual(56000011);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput, 4000000);
      expect(actual).toBeLessThan(13803903042458);
      expect(actual).toStrictEqual(12051287042458);
    });
  });
});
