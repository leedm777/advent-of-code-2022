import _ from "lodash";
import assert from "assert";

function parseOperation(s) {
  assert(_.startsWith(s, "new = "));
  const [, fnStr] = _.split(s, " = ");
  const [lhs, opStr, rhs] = _.split(fnStr, " ");
  const op = opStr === "*" ? _.multiply : _.add;
  assert.deepStrictEqual(lhs, "old");
  if (rhs === "old") {
    return (i) => op(i, i);
  }

  const j = parseInt(rhs, 10);
  return (i) => op(i, j);
}

function parseTest(s) {
  const [div, by, num] = _.split(s, " ");
  assert.deepStrictEqual(div, "divisible");
  assert.deepStrictEqual(by, "by");
  return parseInt(num, 10);
}

function parseThrowTo(s) {
  const [thrw, to, monkey, num] = _.split(s, " ");
  assert.deepStrictEqual(thrw, "throw");
  assert.deepStrictEqual(to, "to");
  assert.deepStrictEqual(monkey, "monkey");
  return parseInt(num, 10);
}

function parseMonkey(lines, n) {
  const pairs = _.map(lines, (line) => _.split(line, ": "));

  const [monkey] = pairs[0];
  assert.deepStrictEqual(monkey, `Monkey ${n}:`);

  const [startingLabel, itemsStr] = pairs[1];
  assert.deepStrictEqual(startingLabel, "  Starting items");
  const items = _(itemsStr)
    .split(", ")
    .map((s) => parseInt(s, 10))
    .value();

  const [opLabel, opStr] = pairs[2];
  assert.deepStrictEqual(opLabel, "  Operation");
  const op = parseOperation(opStr);

  const [testLabel, testStr] = pairs[3];
  assert.deepStrictEqual(testLabel, "  Test");
  const divBy = parseTest(testStr);

  const [trueLabel, trueStr] = pairs[4];
  assert.deepStrictEqual(trueLabel, "    If true");
  const trueMonkey = parseThrowTo(trueStr);

  const [falseLabel, falseStr] = pairs[5];
  assert.deepStrictEqual(falseLabel, "    If false");
  const falseMonkey = parseThrowTo(falseStr);

  return {
    monkey: n,
    numInspections: 0,
    items,
    op,
    divBy,
    trueMonkey,
    falseMonkey,
  };
}

export function inspect(monkeys, n, lowerWorry) {
  const monkey = monkeys[n];
  const { items } = monkey;
  monkey.items = [];
  monkey.numInspections += items.length;

  const mod = _(monkeys).map("divBy").reduce(_.multiply);

  const [trueItems, falseItems] = _(items)
    .map((i) => monkey.op(i))
    .map((i) => (lowerWorry ? Math.floor(i / 3) : i % mod))
    .partition((i) => i % monkey.divBy === 0)
    .value();

  const { trueMonkey, falseMonkey } = monkey;

  monkeys[trueMonkey].items = _.concat(
    monkeys[trueMonkey].items,
    trueItems || []
  );
  monkeys[falseMonkey].items = _.concat(
    monkeys[falseMonkey].items,
    falseItems || []
  );
}

export function parseMonkeys(input) {
  return _(input).chunk(7).map(parseMonkey).value();
}

export function part1(input, numRounds = 20, lowerWorry = true) {
  const monkeys = parseMonkeys(input);

  for (let round = 0; round < numRounds; ++round) {
    for (let monkeyNum = 0; monkeyNum < monkeys.length; ++monkeyNum) {
      inspect(monkeys, monkeyNum, lowerWorry);
    }
  }

  return _(monkeys)
    .sortBy("numInspections")
    .takeRight(2)
    .map("numInspections")
    .reduce(_.multiply);
}

export function part2(input) {
  return part1(input, 10000, false);
}
