import _ from "lodash";

function findStart(len) {
  return (str) => {
    for (let i = 0; i < str.length - len; ++i) {
      const marker = _.slice(str, i, i + len);
      if (_.uniq(marker).length === len) {
        return i + len;
      }
    }
  };
}

const findStartOfPacket = findStart(4);
const findStartOfMessage = findStart(14);

export function part1(input) {
  return findStartOfPacket(input);
}

export function part2(input) {
  return findStartOfMessage(input);
}
