import _ from "lodash";

const sandEnters = [0, 500];
Object.freeze(sandEnters);

class Cave {
  constructor() {
    this.grid = [];
    this.minRow = this.maxRow = sandEnters[0];
    this.minCol = this.maxCol = sandEnters[1];
    // this.set(sandEnters, "+"); // need to be able to fill this space for pt2
  }

  draw(start, end, ch) {
    if (start[0] === end[0]) {
      const row = start[0];
      const min = Math.min(start[1], end[1]);
      const max = Math.max(start[1], end[1]);

      for (let col = min; col <= max; ++col) {
        this.set([row, col], ch);
      }
    } else if (start[1] === end[1]) {
      const col = start[1];
      const min = Math.min(start[0], end[0]);
      const max = Math.max(start[0], end[0]);

      for (let row = min; row <= max; ++row) {
        this.set([row, col], ch);
      }
    }
  }

  get(coord) {
    return _.get(this.grid, coord, " ");
  }

  set([row, col], ch) {
    this.minRow = Math.min(this.minRow, row);
    this.maxRow = Math.max(this.maxRow, row);
    this.minCol = Math.min(this.minCol, col);
    this.maxCol = Math.max(this.maxCol, col);
    _.set(this.grid, [row, col], ch);
  }

  toString() {
    let str = "";
    for (let row = this.minRow; row <= this.maxRow; ++row) {
      for (let col = this.minCol; col <= this.maxCol; ++col) {
        const ch = _.get(this.grid, [row, col], " ");
        str = `${str}${ch}`;
      }
      str = `${str}\n`;
    }

    return str;
  }

  dropSand() {
    let [row, col] = sandEnters;

    while (true) {
      // falls down one step if possible
      if (this.get([row + 1, col]) === " " && row <= this.maxRow) {
        ++row;
        continue;
      }

      // instead move diagonally one step down and to the left
      if (this.get([row + 1, col - 1]) === " " && row <= this.maxRow) {
        ++row;
        --col;
        continue;
      }

      // instead move diagonally one step down and to the right
      if (this.get([row + 1, col + 1]) === " " && row <= this.maxRow) {
        ++row;
        ++col;
        continue;
      }

      break;
    }

    if (row > this.maxRow) {
      return false;
    }

    if (this.get([row, col]) !== " ") {
      return false;
    }

    this.set([row, col], "o");
    return true;
  }
}

function parsePath(str) {
  return _(str)
    .split(" -> ")
    .map((str) => {
      const [colStr, rowStr] = _.split(str, ",");
      return [parseInt(rowStr, 10), parseInt(colStr, 10)];
    })
    .value();
}

export function part1(input) {
  const paths = _.map(input, parsePath);
  const cave = new Cave();
  _.forEach(paths, (path) => {
    for (let i = 1; i < path.length; ++i) {
      cave.draw(path[i - 1], path[i], "#");
    }
  });

  while (cave.dropSand()) {
    // process.stdout.write("\x1B[H");
    // console.log(cave.toString());
  }

  return _(cave.grid)
    .map((row) => _.map(row, (ch) => (ch === "o" ? 1 : 0)))
    .map(_.sum)
    .sum();
}

export function part2(input) {
  const paths = _.map(input, parsePath);
  const cave = new Cave();
  _.forEach(paths, (path) => {
    for (let i = 1; i < path.length; ++i) {
      cave.draw(path[i - 1], path[i], "#");
    }
  });

  const floorRow = cave.maxRow + 2;
  cave.draw(
    [floorRow, 0],
    [floorRow, sandEnters[1] + 2 * cave.maxRow], // hopefully enough?
    "#"
  );

  while (cave.dropSand()) {
    // process.stdout.write("\x1B[H");
    // console.log(cave.toString());
  }

  return _(cave.grid)
    .map((row) => _.map(row, (ch) => (ch === "o" ? 1 : 0)))
    .map(_.sum)
    .sum();
}
