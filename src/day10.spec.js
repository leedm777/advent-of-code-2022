import { part1, part2, ClockCircuit, parseProgram, tickBy } from "./day10";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day10.txt");
const exampleInput = theExampleInputIsTooLong();

describe("day10", () => {
  describe("part 1", () => {
    it("should work with a smaller example", async () => {
      const program = [
        { op: "noop" },
        { op: "addx", arg1: 3 },
        { op: "addx", arg1: -5 },
      ];

      const cycle0 = new ClockCircuit({ program });
      expect(cycle0.x).toStrictEqual(1);
      const cycle1 = cycle0.tick();
      expect(cycle1.x).toStrictEqual(1);
      const cycle2 = cycle1.tick();
      expect(cycle2.x).toStrictEqual(1);
      const cycle3 = cycle2.tick();
      expect(cycle3.x).toStrictEqual(4);
      const cycle4 = cycle3.tick();
      expect(cycle4.x).toStrictEqual(4);
      const cycle5 = cycle4.tick();
      expect(cycle5.x).toStrictEqual(-1);
    });

    it.skip("should work at the checkpoints", async () => {
      const program = parseProgram(exampleInput);
      const machine = new ClockCircuit({ program });

      const p1 = tickBy(machine, 20);
      expect(p1).toStrictEqual(
        expect.objectContaining({
          clock: 20,
          x: 21,
        })
      );

      const p2 = tickBy(p1, 40);
      expect(p2).toStrictEqual(
        expect.objectContaining({
          clock: 60,
          x: 19,
        })
      );

      const p3 = tickBy(p2, 40);
      expect(p3).toStrictEqual(
        expect.objectContaining({
          clock: 100,
          x: 18,
        })
      );

      const p4 = tickBy(p3, 40);
      expect(p4).toStrictEqual(
        expect.objectContaining({
          clock: 140,
          x: 21,
        })
      );

      const p5 = tickBy(p4, 40);
      expect(p5).toStrictEqual(
        expect.objectContaining({
          clock: 180,
          x: 16,
        })
      );

      const p6 = tickBy(p5, 40);
      expect(p6).toStrictEqual(
        expect.objectContaining({
          clock: 220,
          x: 18,
        })
      );
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(13140);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toBeLessThan(14800);
      expect(actual).toStrictEqual(13760);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual([
        "██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ",
        "███   ███   ███   ███   ███   ███   ███ ",
        "████    ████    ████    ████    ████    ",
        "█████     █████     █████     █████     ",
        "██████      ██████      ██████      ████",
        "███████       ███████       ███████     ",
      ]);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual([
        "███  ████ █  █ ████  ██  ███  ████ ████ ",
        "█  █ █    █ █     █ █  █ █  █ █    █    ",
        "█  █ ███  ██     █  █    █  █ ███  ███  ",
        "███  █    █ █   █   █    ███  █    █    ",
        "█ █  █    █ █  █    █  █ █    █    █    ",
        "█  █ █    █  █ ████  ██  █    ████ █    ",
      ]);
    });
  });
});

function theExampleInputIsTooLong() {
  return [
    "addx 15",
    "addx -11",
    "addx 6",
    "addx -3",
    "addx 5",
    "addx -1",
    "addx -8",
    "addx 13",
    "addx 4",
    "noop",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx -35",
    "addx 1",
    "addx 24",
    "addx -19",
    "addx 1",
    "addx 16",
    "addx -11",
    "noop",
    "noop",
    "addx 21",
    "addx -15",
    "noop",
    "noop",
    "addx -3",
    "addx 9",
    "addx 1",
    "addx -3",
    "addx 8",
    "addx 1",
    "addx 5",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx -36",
    "noop",
    "addx 1",
    "addx 7",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "addx 6",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx 7",
    "addx 1",
    "noop",
    "addx -13",
    "addx 13",
    "addx 7",
    "noop",
    "addx 1",
    "addx -33",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "noop",
    "noop",
    "noop",
    "addx 8",
    "noop",
    "addx -1",
    "addx 2",
    "addx 1",
    "noop",
    "addx 17",
    "addx -9",
    "addx 1",
    "addx 1",
    "addx -3",
    "addx 11",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx -13",
    "addx -19",
    "addx 1",
    "addx 3",
    "addx 26",
    "addx -30",
    "addx 12",
    "addx -1",
    "addx 3",
    "addx 1",
    "noop",
    "noop",
    "noop",
    "addx -9",
    "addx 18",
    "addx 1",
    "addx 2",
    "noop",
    "noop",
    "addx 9",
    "noop",
    "noop",
    "noop",
    "addx -1",
    "addx 2",
    "addx -37",
    "addx 1",
    "addx 3",
    "noop",
    "addx 15",
    "addx -21",
    "addx 22",
    "addx -6",
    "addx 1",
    "noop",
    "addx 2",
    "addx 1",
    "noop",
    "addx -10",
    "noop",
    "noop",
    "addx 20",
    "addx 1",
    "addx 2",
    "addx 2",
    "addx -6",
    "addx -11",
    "noop",
    "noop",
    "noop",
  ];
}
