import _ from "lodash";

const rocks = [
  // horizontal bar
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  // cross
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ],
  // ell
  [
    [2, 2],
    [1, 2],
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  // vertical bar
  [
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
  ],
  // square
  [
    [1, 0],
    [1, 1],
    [0, 0],
    [0, 1],
  ],
];

class Cave {
  get height() {
    return _.max(this.topRocks) + 1;
  }

  constructor(windStr) {
    this.winds = _.map(windStr);
    this.topRocks = _.fill(Array(7), -1);
    this.numRocks = 0;
    this.numWinds = 0;
  }

  toString() {
    return JSON.stringify(this.topRocks);
  }

  placeRock(rock) {
    return _.map(rock, ([row, col]) => [row + this.height + 3, col + 2]);
  }

  blowRock(rock) {
    const wind = this.winds[this.numWinds++ % this.winds.length];
    const dir = wind.charCodeAt(0) - 61; // good ole ASCII
    const nextRock = _.map(rock, ([row, col]) => [row, col + dir]);

    if (
      _.some(nextRock, ([row, col]) => {
        // hit left wall
        if (col < 0) {
          return true;
        }

        // hit right wall
        if (col > 6) {
          return true;
        }

        // hit a rock
        if (this.topRocks[col] >= row) {
          return true;
        }

        return false;
      })
    ) {
      return rock;
    }

    return nextRock;
  }

  fallRock(rock) {
    const nextRock = _.map(rock, ([row, col]) => [row - 1, col]);
    if (
      _.some(nextRock, ([row, col]) => {
        // hit bottom
        if (row < 0) {
          return true;
        }

        // hit a rock
        if (this.topRocks[col] >= row) {
          return true;
        }

        return false;
      })
    ) {
      return rock;
    }

    return nextRock;
  }

  dropRock() {
    let rock = this.placeRock(rocks[this.numRocks++ % rocks.length]);
    let fallenRock = Array.from(rock);

    while (!Object.is(rock, fallenRock)) {
      rock = this.blowRock(fallenRock);
      fallenRock = this.fallRock(rock);
    }

    _.forEach(rock, ([row, col]) => {
      this.topRocks[col] = Math.max(this.topRocks[col], row);
    });
  }
}

export function part1(input) {
  const cave = new Cave(input[0]);
  for (let i = 0; i < 2022; ++i) {
    cave.dropRock();
  }
  return _.max(cave.topRocks) + 1;
}

export function part2(input) {
  const cave = new Cave(input[0]);
  for (let i = 0; i < 1000000000000; ++i) {
    cave.dropRock();
  }
  return cave.height;
}
