import { part1, part2 } from "./day21";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day21.txt");
const exampleInput = [
  "root: pppw + sjmn",
  "dbpl: 5",
  "cczh: sllz + lgvd",
  "zczc: 2",
  "ptdq: humn - dvpt",
  "dvpt: 3",
  "lfqf: 4",
  "humn: 5",
  "ljgn: 2",
  "sjmn: drzm * dbpl",
  "sllz: 4",
  "pppw: cczh / lfqf",
  "lgvd: ljgn * ptdq",
  "drzm: hmdt - zczc",
  "hmdt: 32",
];

describe("day21", () => {
  describe("part 1", () => {
    it("should work with the tiny sample", () => {
      const actual = part1(exampleInput, "drzm");
      expect(actual).toStrictEqual(30);
    });
    it("should work with the other tiny sample", () => {
      const actual = part1(exampleInput, "sjmn");
      expect(actual).toStrictEqual(150);
    });

    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(152);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(286698846151845);
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
