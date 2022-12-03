import _ from "lodash";

function toElves(input) {
  const { elves, elf } = _.reduce(
    input,
    ({ elves, elf }, caloriesStr) => {
      if (_.isEmpty(caloriesStr)) {
        return {
          elves: [...elves, elf],
          elf: [],
        };
      }

      return {
        elves,
        elf: [...elf, parseInt(caloriesStr, 10)],
      };
    },
    {
      elves: [],
      elf: [],
    }
  );

  return _.map([...elves, elf], _.sum);
}

export function part1(input) {
  return _.max(toElves(input));
}

export function part2(input) {
  const elves = toElves(input);
  return _(elves)
    .sortBy((x) => -x)
    .take(3)
    .sum();
}
