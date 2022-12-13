import _ from "lodash";
import { dijkstraHeuristic, findPath, manhattanHeuristic } from "./aoc.js";

class UphillGraph {
  constructor({ hills, start, goal }) {
    this.getNeighborDistance = _.constant(1);
    this.hills = hills;
    this.start = start;
    this.goal = goal;
    this.h = manhattanHeuristic(goal);
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

  isGoal(coord) {
    return _.isEqual(coord, this.goal);
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

  return { hills, start, goal };
}

export function part1(input) {
  const { hills, start, goal } = parseMaze(input);
  const graph = new UphillGraph({ hills, start, goal });
  const path = findPath(graph);

  return path.length - 1;
}

/**
 * Since there are multiple starting points, we'll solve the maze in reverse
 * looking for the first "starting point" we come to.
 */
class DownhillGraph extends UphillGraph {
  constructor({ hills, goal }) {
    super({
      hills,
      start: goal,
    });
    this.h = dijkstraHeuristic;
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
      const neighborHeight = _.get(this.hills, n, -Infinity);
      return neighborHeight >= height - 1;
    });
  }

  isGoal(coord) {
    return _.get(this.hills, coord, -Infinity) === 0;
  }
}

export function part2(input) {
  const { hills, goal } = parseMaze(input);
  const graph = new DownhillGraph({ hills, goal });
  const path = findPath(graph);

  return path.length - 1;
}
