import _ from "lodash";

export class ClockCircuit {
  constructor({ program, x = 1, opCycle = 0, pc = 0, clock = 0 }) {
    this.state = {
      clock,
      program,
      opCycle,
      pc,
      x,
    };
  }

  tick() {
    const { op, arg1 } = this.program[this.pc];

    switch (op) {
      case "noop":
        return new ClockCircuit({
          ...this.state,
          clock: this.clock + 1,
          pc: this.pc + 1,
        });
      case "addx":
        if (this.opCycle < 1) {
          return new ClockCircuit({
            ...this.state,
            clock: this.clock + 1,
            opCycle: this.opCycle + 1,
          });
        }
        return new ClockCircuit({
          ...this.state,
          clock: this.clock + 1,
          pc: this.pc + 1,
          opCycle: 0,
          x: this.x + arg1,
        });
      default:
        throw new Error(`Unknown op ${op}`);
    }
  }

  get program() {
    return this.state.program;
  }

  get clock() {
    return this.state.clock;
  }

  get pc() {
    return this.state.pc;
  }

  get x() {
    return this.state.x;
  }

  get opCycle() {
    return this.state.opCycle;
  }
}

export function parseProgram(lines) {
  return _.map(lines, (line) => {
    const [op, arg1] = _.split(line, " ");
    switch (op) {
      case "noop":
        return { op };
      case "addx":
        return { op, arg1: parseInt(arg1, 10) };
      default:
        throw new Error(`Unknown op ${op}`);
    }
  });
}

export function tickBy(machine, n) {
  for (let i = 0; i < n; ++i) {
    machine = machine.tick();
  }
  return machine;
}

export function part1(input) {
  const program = parseProgram(input);
  let machine = new ClockCircuit({ program });
  let sum = 0;

  // const log = [];

  for (let i = 0; i < 220; ++i) {
    // log.push(
    //   `${machine.clock} (pc: ${machine.pc}, opCycle: ${
    //     machine.opCycle
    //   }): ${JSON.stringify(machine.program[machine.pc])}`
    // );
    const during = machine.x;
    machine = machine.tick();
    if ((machine.clock - 20) % 40 === 0) {
      sum += during * machine.clock;
    }
    // log.push(`  --> ${machine.x}`);
  }

  // console.log(_.join(log, "\n"));

  return sum;
}

export function part2(input) {
  const crt = [
    _.repeat(".", 40),
    _.repeat(".", 40),
    _.repeat(".", 40),
    _.repeat(".", 40),
    _.repeat(".", 40),
    _.repeat(".", 40),
  ];

  const program = parseProgram(input);
  let machine = new ClockCircuit({ program });

  const render = _.map(crt, (row) => {
    return _.map(row, (dot, col) => {
      const { x } = machine;
      machine = machine.tick();

      if (x - 1 <= col && col <= x + 1) {
        return "#";
      }

      return " ";
    });
  });

  return _.map(render, (row) => _.join(row, ""));
}
