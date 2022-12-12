import _ from "lodash";
import { findPath, manhattanHeuristic } from "./aoc.js";
import { EventEmitter } from "events";

class HillGraph {
  constructor({ hills, start, goal }) {
    this.getNeighborDistance = _.constant(1);
    this.hills = hills;
    this.start = start;
    this.goal = goal;
  }

  getNeighbors([row, col]) {
    const height = this.hills[row][col];
    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    return _.filter(neighbors, (n) => {
      const neighborHeight = _.get(this.hills, n, Infinity);
      return neighborHeight <= height + 1;
    });
  }

  keyify([row, col]) {
    return `[${row}][${col}]`;
  }
}

function parseMaze(input) {
  let start = null;
  let goal = null;

  for (let row = 0; row < input.length && !(start && goal); ++row) {
    const line = input[row];
    for (let col = 0; col < line.length && !(start && goal); ++col) {
      const ch = line.charAt(col);

      if (ch === "S") {
        start = [row, col];
      } else if (ch === "E") {
        goal = [row, col];
      }
    }
  }

  const hills = _.map(input, (line) => {
    return _.map(line, (ch) => {
      if (ch === "S") {
        return 0;
      }

      if (ch === "E") {
        return 26;
      }

      return ch.codePointAt(0) - "a".codePointAt(0);
    });
  });

  return new HillGraph({ hills, start, goal });
}

function solveMaze(maze) {
  const emitter = new EventEmitter();
  // emitter.on("visit", (current, open, visited) => {
  //   console.log(JSON.stringify({ current, open, visited }, null, 2));
  // });

  return findPath({
    graph: maze,
    start: maze.start,
    goal: maze.goal,
    h: manhattanHeuristic(maze.goal),
    emitter,
  });
}

export function part1(input) {
  const maze = parseMaze(input);
  const path = solveMaze(maze);
  return path.length - 1;
}

export function part2(input) {
  return input;
}
