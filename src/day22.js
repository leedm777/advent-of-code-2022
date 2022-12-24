import _ from "lodash";
import assert from "assert";

// Facing is 0 for right (>)
// 1 for down (v)
// 2 for left (<)
// and 3 for up (^)

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

function parse(input) {
  const map = _(input)
    .takeWhile((line) => !_.isEmpty(line))
    .map((line) => _.split(line, ""))
    .value();
  const dir = RIGHT;
  const pos = [0, 0];
  while (_.get(map, pos, " ") !== ".") {
    ++pos[1];
  }

  const rowLimits = _.map(map, (row) => ({
    min: _.findIndex(row, (ch) => ch !== " "),
    max: _.findLastIndex(row, (ch) => ch !== " ") + 1,
  }));

  const colLimits = _.map(_.zip(...map), (col) => ({
    min: _.findIndex(col, (ch) => !_.isNil(ch) && ch !== " "),
    max: _.findLastIndex(col, (ch) => !_.isNil(ch) && ch !== " ") + 1,
  }));

  const moves = _.chain(input)
    .last()
    .thru((s) => _.split(s, /([LR])/g))
    .map((s) => {
      const n = parseInt(s, 10);
      return _.isNaN(n) ? s : n;
    })
    .value();

  return { map, rowLimits, colLimits, moves, pos, dir };
}

function turn(jungle, rotation) {
  if (rotation === "R") {
    return {
      ...jungle,
      dir: (jungle.dir + 1) % 4,
    };
  }

  return {
    ...jungle,
    dir: (jungle.dir + 3) % 4, // same as -1 mod 4
  };
}

function modAdd({ min, max }, lhs, rhs) {
  const mod = max - min;
  return ((mod + lhs + rhs - min) % mod) + min;
}

function nextPos({ dir, rowLimits, colLimits }, pos) {
  const [row, col] = pos;
  let n;

  const rowLimit = rowLimits[pos[0]];
  const colLimit = colLimits[pos[1]];

  switch (dir) {
    case RIGHT:
      n = [row, modAdd(rowLimit, col, +1)];
      break;
    case DOWN:
      n = [modAdd(colLimit, row, +1), col];
      break;
    case LEFT:
      n = [row, modAdd(rowLimit, col, -1)];
      break;
    case UP:
      n = [modAdd(colLimit, row, -1), col];
      break;
  }
  return n;
}

function applyNextMove(jungle) {
  let nextMove = jungle.moves.shift();
  if (!_.isNumber(nextMove)) {
    return turn(jungle, nextMove);
  }

  let { pos } = jungle;
  while (nextMove-- > 0) {
    const next = nextPos(jungle, pos);

    const cell = _.get(jungle.map, next, " ");
    switch (cell) {
      case "#":
        // hit a wall
        return {
          ...jungle,
          pos,
        };
      case ".":
        // space to move
        pos = next;
        break;
      default:
        assert.fail(`Unexpected map location ${next}: ${JSON.stringify(cell)}`);
        break;
    }
  }

  return {
    ...jungle,
    pos,
  };
}

export function part1(input) {
  let jungle = parse(input);

  while (!_.isEmpty(jungle.moves)) {
    jungle = applyNextMove(jungle);
  }

  const {
    pos: [row, col],
    dir,
  } = jungle;

  return (row + 1) * 1000 + 4 * (col + 1) + dir;
}

export function part2(input) {
  return "TODO";
}
