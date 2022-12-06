import _ from "lodash";

export function parseStack(stacks, line) {
  // array of crates per stack
  const crates = _(line).chunk(4).map(1).value();

  return _.map(crates, (crate, stackIndex) => {
    const stack = stacks[stackIndex] || [];

    if (crate === " ") {
      // blank space above the stack
      return stack;
    } else if (crate.match(/^\d$/)) {
      // stack number below the stack
      return stack;
    } else {
      // crate
      return [...stack, crate];
    }
  });
}

function parseMove(stacks, line) {
  const { numStr, fromStr, toStr } = line.match(
    /move (?<numStr>\d+) from (?<fromStr>\d+) to (?<toStr>\d+)/
  ).groups;

  const num = parseInt(numStr, 10);
  const from = parseInt(fromStr) - 1;
  const to = parseInt(toStr) - 1;

  const res = _.reduce(
    _.range(0, num),
    (stacks) => {
      const crate = _.head(stacks[from]);
      return _.map(stacks, (stack, n) => {
        if (n === from) {
          return _.tail(stack);
        } else if (n === to) {
          return [crate, ...stack];
        } else {
          return stack;
        }
      });
    },
    stacks
  );

  return res;
}

function parseInput({ stacks, moves, parsingStacks }, line) {
  if (parsingStacks) {
    if (_.isEmpty(line)) {
      return {
        stacks,
        moves,
        parsingStacks: false,
      };
    }

    return {
      stacks: parseStack(stacks, line),
      moves,
      parsingStacks,
    };
  }

  return {
    stacks: parseMove(stacks, line),
    moves,
    parsingStacks,
  };
}

export function part1(input) {
  return _.chain(input)
    .reduce(parseInput, {
      stacks: [],
      moves: [],
      parsingStacks: true,
    })
    .thru(({ stacks }) => _.map(stacks, _.first))
    .join("")
    .value();
}

export function part2(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}
