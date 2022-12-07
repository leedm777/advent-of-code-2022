import _ from "lodash";

function changeDirectory(cwd, tree, dir) {
  switch (dir) {
    case "/":
      return {
        cwd: [],
        tree,
      };
    case "..":
      return {
        cwd: _.initial(cwd),
        tree,
      };
    default:
      return {
        cwd: [...cwd, dir],
        tree,
      };
  }
}

function parseLine({ cwd, tree }, line) {
  if (_.startsWith(line, "$ ")) {
    // command
    const [, command, option] = _.split(line, " ");
    switch (command) {
      case "cd":
        return changeDirectory(cwd, tree, option);
      case "ls":
        // nothing really to do here yet
        return { cwd, tree };
      default:
        throw new Error(`Unknown command ${command}`);
    }
  } else {
    // assume everything else is ls output
    const [size, name] = _.split(line, " ");
    const n = _.isEmpty(cwd) ? tree : _.get(tree, cwd);
    if (size === "dir") {
      n[name] = {};
    } else {
      n[name] = { size: parseInt(size, 10) };
    }
  }

  return { cwd, tree };
}

function sizeTree(acc, cwd, tree) {
  if (_.has(tree, "size")) {
    // single node
    acc[_.join(cwd, "/")] = tree.size;
    return tree.size;
  } else {
    const size = _(tree)
      .map((node, name) => {
        return sizeTree(acc, [...cwd, name], node);
      })
      .sum();
    acc[_.join(cwd, "/") + "/"] = size;
    return size;
  }
}

// To begin, find all of the directories with a total size of at most 100000,
// then calculate the sum of their total sizes.
export function part1(input) {
  const { tree } = _.reduce(input, parseLine, { cwd: [], tree: {} });
  const sizes = {};
  sizeTree(sizes, [], tree);
  return _(sizes)
    .pickBy((size, path) => size <= 100000 && _.endsWith(path, "/"))
    .map()
    .sum();
}

const TOTAL_SIZE = 70000000;
const NEEDED_FREE = 30000000;

export function part2(input) {
  const { tree } = _.reduce(input, parseLine, { cwd: [], tree: {} });
  const sizes = {};
  const used = sizeTree(sizes, [], tree);
  const free = TOTAL_SIZE - used;
  const toDelete = NEEDED_FREE - free;

  return _(sizes)
    .pickBy((size, path) => size >= toDelete && _.endsWith(path, "/"))
    .sortBy()
    .head();
}
