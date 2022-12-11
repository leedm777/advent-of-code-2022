import _ from "lodash";
import assert from "assert";

function parseOperation(s) {
  assert(_.startsWith(s, "new = "));
  const [, opStr] = _.split(s, " = ");
  const fnStr = `(old) => (${opStr})`;
  // Yes, it's dangerous. But at least I don't have to build a parser
  // eslint-disable-next-line no-eval
  return eval(fnStr);
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

export function inspect(monkeys, n) {
  const monkey = monkeys[n];
  const { items } = monkey;
  monkey.items = [];
  monkey.numInspections += items.length;

  const [trueItems, falseItems] = _(items)
    .map((i) => monkey.op(i))
    .map((i) => Math.floor(i / 3))
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

export function part1(input) {
  const monkeys = parseMonkeys(input);

  for (let round = 0; round < 20; ++round) {
    for (let monkeyNum = 0; monkeyNum < monkeys.length; ++monkeyNum) {
      inspect(monkeys, monkeyNum);
    }
  }

  return _(monkeys)
    .sortBy("numInspections")
    .takeRight(2)
    .map("numInspections")
    .reduce(_.multiply);
}

export function part2(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}