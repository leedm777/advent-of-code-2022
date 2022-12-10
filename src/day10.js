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

  get alu() {
    return this.state.alu;
  }

  get x() {
    return this.state.x;
  }

  get opCycle() {
    return this.state.opCycle;
  }
}

function parseProgram(lines) {
  return _.map(lines, (line) => {
    const [op, arg1] = line.split(" ");
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

export function part1(input) {
  const program = parseProgram(input);
  let machine = new ClockCircuit({ program });
  let sum = 0;

  for (let i = 0; i < 220; ++i) {
    machine = machine.tick();
    if ((machine.clock - 20) % 40 === 0) {
      console.log(`${machine.clock} * ${machine.x}`);
      sum += machine.x * machine.clock;
    }
  }
  return sum;
}

export function part2(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}
