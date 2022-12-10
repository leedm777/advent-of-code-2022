import _ from "lodash";

class ALU {
  constructor({ x = 1, queue = [{ op: "noop" }] } = {}) {
    this.state = {
      x,
      queue,
    };
  }

  tick(instruction) {
    const [exec, ...queue] = this.queue;
    queue.push(instruction);

    let x = this.x;

    switch (exec.op) {
      case "addx":
        x += exec.arg1;
        break;
      case "noop":
        break;
      default:
        throw new Error(`Unknown op ${exec.op}`);
    }

    return new ALU({
      x,
      queue,
    });
  }

  get queue() {
    return this.state.queue;
  }

  get x() {
    return this.state.x;
  }
}

export class ClockCircuit {
  constructor({ program, alu = new ALU(), pc = 0, clock = 0 }) {
    this.state = {
      clock,
      program,
      alu,
      pc,
    };
  }

  tick() {
    const instruction = this.program[this.pc];
    return new ClockCircuit({
      program: this.program,
      clock: this.clock + 1,
      pc: this.pc + 1,
      alu: this.alu.tick(instruction),
    });
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
    return this.state.alu.x;
  }
}

export function part1(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}

export function part2(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}
