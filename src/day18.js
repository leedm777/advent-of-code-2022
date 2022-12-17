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

export function part1(input) {
  const grid = _(input)
    .map(parseLine)
    .reduce((grid, cell) => {
      // eslint-disable-next-line lodash/path-style
      const self = {
        numNeighbors: 0,
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
    }, []);

  return _(grid)
    .flatten()
    .flatten()
    .compact()
    .map(({ numNeighbors }) => 6 - numNeighbors)
    .sum();
}

export function part2(input) {
  // TODO
  return _.map(input);
}
