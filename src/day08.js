import _ from "lodash";

function parseLine(line) {
  return _.map(line, (c) => parseInt(c, 10));
}

function countVisible(trees) {
  const isVisible = _.map(trees, (row) => _.map(row, _.constant(false)));
  const numRows = trees.length;
  const numCols = trees[0].length;

  let tallestTreeHeight = -1;
  const setIsVisible = (y, x) => {
    const treeHeight = trees[y][x];
    if (treeHeight > tallestTreeHeight) {
      // console.log(
      //   `trees[${y}][${x}] == ${treeHeight};  > ${tallestTreeHeight}`
      // );
      isVisible[y][x] = true;
      tallestTreeHeight = treeHeight;
      return true;
    }
    // console.log(`trees[${y}][${x}] == ${treeHeight}; <= ${tallestTreeHeight}`);
    return false;
  };

  // const printIsVisible = () => {
  //   const str = _(isVisible)
  //     .map((row) =>
  //       _(row)
  //         .map((tree) => (tree ? "X" : "."))
  //         .join("")
  //     )
  //     .join("\n");
  //   console.log(str);
  // };

  // scan the grid from each direction, keeping track of the max in that
  // direction. if it's visible from that direction, mark it in the isVisible
  // matrix

  // from left
  _.forEach(_.range(0, numRows), (y) => {
    tallestTreeHeight = -1;
    _.forEach(_.range(0, numCols), (x) => {
      setIsVisible(y, x);
    });
  });
  // printIsVisible();

  // from right
  _.forEach(_.range(0, numRows), (y) => {
    tallestTreeHeight = -1;
    _.forEach(_.range(0, numCols).reverse(), (x) => {
      setIsVisible(y, x);
    });
  });
  // printIsVisible();

  // from top
  _.forEach(_.range(0, numCols), (x) => {
    tallestTreeHeight = -1;
    _.forEach(_.range(0, numRows), (y) => {
      setIsVisible(y, x);
    });
  });
  // printIsVisible();

  // from bottom
  _.forEach(_.range(0, numCols), (x) => {
    tallestTreeHeight = -1;
    _.forEach(_.range(0, numRows).reverse(), (y) => {
      setIsVisible(y, x);
    });
  });
  // printIsVisible();

  return _(isVisible)
    .map((row) => _(row).compact().size())
    .sum();
}

export function part1(input) {
  const trees = _.map(input, parseLine);
  return countVisible(trees);
}

function computeScenicScores(trees) {
  const scenicScores = _.map(trees, (row) => _.map(row, _.constant(0)));
  const numRows = trees.length;
  const numCols = trees[0].length;

  const computeScenicScore = (treeY, treeX) => {
    // shortcut for the edges
    if (
      treeX === 0 ||
      treeY === 0 ||
      treeX === numCols - 1 ||
      treeY === numRows - 1
    ) {
      return 0;
    }

    const treeHeight = trees[treeY][treeX];

    // left
    let left = treeX;
    for (let x = treeX - 1; x >= 0; --x) {
      const h = trees[treeY][x];
      if (h >= treeHeight) {
        left = treeX - x;
        break;
      }
    }

    // right
    let right = numCols - treeX - 1;
    for (let x = treeX + 1; x < numCols; ++x) {
      const h = trees[treeY][x];
      if (h >= treeHeight) {
        right = x - treeX;
        break;
      }
    }

    // up
    let up = treeY;
    for (let y = treeY - 1; y >= 0; --y) {
      const h = trees[y][treeX];
      if (h >= treeHeight) {
        up = treeY - y;
        break;
      }
    }

    // down
    let down = numRows - treeY - 1;
    for (let y = treeY + 1; y < numRows; ++y) {
      const h = trees[y][treeX];
      if (h >= treeHeight) {
        down = y - treeY;
        break;
      }
    }

    return left * right * up * down;
  };

  _.forEach(_.range(0, numRows), (y) => {
    _.forEach(_.range(0, numCols), (x) => {
      scenicScores[y][x] = computeScenicScore(y, x);
    });
  });

  return scenicScores;
}

export function part2(input) {
  const trees = _.map(input, parseLine);
  const scenicScores = computeScenicScores(trees);
  return _(scenicScores)
    .map((rowScores) => _.max(rowScores))
    .max();
}
