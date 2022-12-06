import _ from "lodash";

function startOfPacket(str) {
  for (let i = 0; i < str.length - 4; ++i) {
    const marker = _.slice(str, i, i + 4);
    if (_.uniq(marker).length === 4) {
      return i + 4;
    }
  }
}

export function part1(input) {
  return (
    _.chain(input)
      .map(startOfPacket)
      .value()
  );
}

export function part2(input) {
  return (
    _.chain(input)
      // TODO
      .value()
  );
}
