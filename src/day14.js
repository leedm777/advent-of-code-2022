import _ from "lodash";

const sandEnters = [0, 500];

class Cave {
  constructor() {
    this.grid = [];
    this.minRow = this.maxRow = sandEnters[0];
    this.minCol = this.maxCol = sandEnters[1];
    this.set(sandEnters, "+");
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

  set([row, col], ch) {
    this.minRow = Math.min(this.minRow, row);
    this.maxRow = Math.max(this.maxRow, row);
    this.minCol = Math.min(this.minCol, col);
    this.maxCol = Math.max(this.maxCol, col);
    // eslint-disable-next-line lodash/path-style
    _.set(this.grid, [row, col], ch);
  }

  toString() {
    let str = "";
    for (let row = this.minRow; row <= this.maxRow; ++row) {
      for (let col = this.minCol; col <= this.maxCol; ++col) {
        // eslint-disable-next-line lodash/path-style
        const ch = _.get(this.grid, [row, col], " ");
        str = `${str}${ch}`;
      }
      str = `${str}\n`;
    }

    return str;
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

  console.log(cave.toString());

  return paths;
}

export function part2(input) {
  return input;
}
