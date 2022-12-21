import _ from "lodash";

function parseLine(line) {
  const strs = _.split(line, ",");
  return _.map(strs, (s) => parseInt(s, 10));
}

const Directions = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];

function getNeighborCell(cell, direction) {
  return _(cell).zip(direction).map(_.sum).value();
}

function setCell(grid, cell) {
  const self = {
    numNeighbors: 0,
    steamed: 0,
  };
  _.set(grid, cell, self);

  for (const d of Directions) {
    const neighborCell = getNeighborCell(cell, d);
    const neighbor = _.get(grid, neighborCell);
    if (neighbor) {
      ++neighbor.numNeighbors;
      ++self.numNeighbors;
    }
  }

  return grid;
}

export function part1(input) {
  const grid = _(input).map(parseLine).reduce(setCell, []);

  return _(grid)
    .flatten()
    .flatten()
    .compact()
    .map(({ numNeighbors }) => 6 - numNeighbors)
    .sum();
}

export function part2(input) {
  const cells = _.map(input, parseLine);
  const grid = _.reduce(cells, setCell, []);
  const limits = _.reduce(
    cells,
    (maxes, cell) => _(maxes).zip(cell).map(_.max).value(),
    [-1, -1, -1]
  );

  const open = [[0, 0, 0]];
  const visited = new Set();

  let current;
  while ((current = open.pop())) {
    if (visited.has(JSON.stringify(current))) {
      continue;
    }
    visited.add(JSON.stringify(current));

    for (const d of Directions) {
      const cell = getNeighborCell(current, d);

      // skip if we are off the bottom of the grid
      if (_.some(cell, (v) => v < 0)) {
        continue;
      }
      // of off the top
      if (cell[0] > limits[0] + 1) {
        continue;
      }
      if (cell[1] > limits[1] + 1) {
        continue;
      }
      if (cell[2] > limits[2] + 1) {
        continue;
      }

      const neighbor = _.get(grid, cell);
      // if the neighbor exists, mark it as being steamed
      // otherwise it's another empty cell to investigate
      if (neighbor) {
        ++neighbor.steamed;
      } else {
        open.push(cell);
      }
    }
  }

  return _(grid).flatten().flatten().compact().map("steamed").sum();
}
