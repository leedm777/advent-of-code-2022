import { inspect, parseMonkeys, part1, part2 } from "./day11";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day11.txt");
const exampleInput = [
  "Monkey 0:",
  "  Starting items: 79, 98",
  "  Operation: new = old * 19",
  "  Test: divisible by 23",
  "    If true: throw to monkey 2",
  "    If false: throw to monkey 3",
  "",
  "Monkey 1:",
  "  Starting items: 54, 65, 75, 74",
  "  Operation: new = old + 6",
  "  Test: divisible by 19",
  "    If true: throw to monkey 2",
  "    If false: throw to monkey 0",
  "",
  "Monkey 2:",
  "  Starting items: 79, 60, 97",
  "  Operation: new = old * old",
  "  Test: divisible by 13",
  "    If true: throw to monkey 1",
  "    If false: throw to monkey 3",
  "",
  "Monkey 3:",
  "  Starting items: 74",
  "  Operation: new = old + 3",
  "  Test: divisible by 17",
  "    If true: throw to monkey 0",
  "    If false: throw to monkey 1",
];

describe("day11", () => {
  describe("part 1", () => {
    it("should works after a single inspection", async () => {
      const monkeys = parseMonkeys(exampleInput);
      inspect(monkeys, 0);
      expect(monkeys[0].items).toStrictEqual([]);
      expect(monkeys[2].items).toStrictEqual([79, 60, 97]);
      expect(monkeys[3].items).toStrictEqual([74, 500, 620]);
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(10605);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(50616);
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
