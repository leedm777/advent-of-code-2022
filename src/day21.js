import _ from "lodash";
import assert from "assert";

class Monkeys {
  constructor() {
    this.monkeys = {};
  }

  addMonkey(monkey) {
    monkey.monkeys = this;
    this.monkeys[monkey.name] = monkey;
  }

  getMonkey(name) {
    return this.monkeys[name];
  }
}

class ConstMonkey {
  constructor({ name, constant }) {
    this.monkeys = null;
    this.name = name;
    this.constant = parseInt(constant, 10);
  }

  getValue() {
    return this.constant;
  }
}

class OpMonkey {
  constructor({ name, lhs, op, rhs }) {
    this.monkeys = null;
    this.name = name;
    this.lhs = lhs;
    this.op = op;
    this.rhs = rhs;
  }

  getValue() {
    assert.ok(this.monkeys, "Should be added to monkeys first");
    const lhs = this.monkeys.getMonkey(this.lhs).getValue();
    assert.notEqual(lhs, NaN, `Invalid value from ${this.lhs}`);
    const rhs = this.monkeys.getMonkey(this.rhs).getValue();
    assert.notEqual(rhs, NaN, `Invalid value from ${this.rhs}`);

    switch (this.op) {
      case "-":
        return lhs - rhs;
      case "+":
        return lhs + rhs;
      case "*":
        return lhs * rhs;
      case "/":
        return lhs / rhs;
    }
  }
}

function parseLine(line) {
  const re =
    /^(?<name>[a-z]+): ((?<constant>[0-9]+)|(?<lhs>[a-z]+) (?<op>[-+*/]) (?<rhs>[a-z]+))/;
  const { groups } = line.match(re);

  if (_.isNil(groups.constant)) {
    return new OpMonkey(groups);
  }

  return new ConstMonkey(groups);
}

export function part1(input, monkey = "root") {
  const monkeys = new Monkeys();
  _(input)
    .map(parseLine)
    .forEach((m) => monkeys.addMonkey(m));
  return monkeys.getMonkey(monkey).getValue();
}

export function part2(input) {
  // TODO
  return _.map(input);
}
