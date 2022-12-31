import _ from "lodash";
import { findPath, manhattanHeuristic, mod } from "./aoc.js";

class BlizzardMaze {
  constructor({
    startPos,
    goalPos,
    numRows,
    numCols,
    northWinds,
    southWinds,
    westWinds,
    eastWinds,
  }) {
    this.startPos = startPos;
    this.goalPos = goalPos;
    this.numRows = numRows;
    this.numCols = numCols;
    this.northWinds = northWinds;
    this.southWinds = southWinds;
    this.westWinds = westWinds;
    this.eastWinds = eastWinds;

    this.start = {
      pos: startPos,
      tick: 0,
    };

    this.hPos = manhattanHeuristic(this.goalPos);
  }

  isGoal({ pos }) {
    return _.isEqual(pos, this.goalPos);
  }

  h({ pos }) {
    return this.hPos(pos);
  }

  getNeighbors({ pos: [row, col], tick }) {
    const neighbors = [
      [row, col],
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    ++tick;

    return _(neighbors)
      .filter(([row, col]) => {
        if (
          _.isEqual([row, col], this.startPos) ||
          _.isEqual([row, col], this.goalPos)
        ) {
          return true;
        }

        if (row < 0 || col < 0) {
          return false;
        }

        if (row >= this.numRows && !_.isEqual([row, col], this.goalPos)) {
          return false;
        }

        if (col >= this.numCols) {
          return false;
        }

        if (_.get(this.northWinds, [mod(row + tick, this.numRows), col])) {
          return false;
        }

        if (_.get(this.southWinds, [mod(row - tick, this.numRows), col])) {
          return false;
        }

        if (_.get(this.westWinds, [row, mod(col + tick, this.numCols)])) {
          return false;
        }

        if (_.get(this.eastWinds, [row, mod(col - tick, this.numCols)])) {
          return false;
        }

        return true;
      })
      .map((pos) => ({ pos, tick }))
      .value();
  }

  getNeighborDistance = _.constant(1);

  keyify({ pos: [row, col], tick }) {
    return `${row},${col},${tick}`;
  }
}

function parseInput(input) {
  // trim east and west walls
  input = _.map(input, (line) => _.slice(line, 1, line.length - 1));
  const startRow = _.head(input);
  const goalRow = _.last(input);
  // trim north and south
  input = _.slice(input, 1, input.length - 1);

  const startPos = [-1, _.indexOf(startRow, ".")];
  const goalPos = [input.length, _.indexOf(goalRow, ".")];

  const northWinds = _.map(input, (line) => _.map(line, (ch) => ch === "^"));
  const southWinds = _.map(input, (line) => _.map(line, (ch) => ch === "v"));
  const westWinds = _.map(input, (line) => _.map(line, (ch) => ch === "<"));
  const eastWinds = _.map(input, (line) => _.map(line, (ch) => ch === ">"));

  return new BlizzardMaze({
    startPos,
    goalPos,
    numRows: input.length,
    numCols: input[0].length,
    northWinds,
    southWinds,
    westWinds,
    eastWinds,
  });
}

export function part1(input) {
  const blizzardMaze = parseInput(input);
  const path = findPath(blizzardMaze);
  return path.length - 1;
}

export function part2(input) {
  return "TODO";
}
