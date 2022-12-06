import _ from "lodash";

function startOfPacket(str, len = 4) {
  for (let i = 0; i < str.length - len; ++i) {
    const marker = _.slice(str, i, i + len);
    if (_.uniq(marker).length === len) {
      return i + len;
    }
  }
}

export function part1(input) {
  return _.map(input, (s) => startOfPacket(s, 4));
}

export function part2(input) {
  return _.map(input, (s) => startOfPacket(s, 14));
}
