import _ from "lodash";
import assert from "assert";

export function compare(lhs, rhs) {
  // console.log(JSON.stringify({ lhs, rhs }));
  if (_.isNumber(lhs) && _.isNumber(rhs)) {
    return Math.sign(lhs - rhs);
  }

  if (_.isNil(lhs) && _.isNil(rhs)) {
    return 0;
  }
  if (_.isNil(lhs) && !_.isNil(rhs)) {
    return -1;
  }
  if (!_.isNil(lhs) && _.isNil(rhs)) {
    return 1;
  }

  if (_.isArray(lhs) && _.isArray(rhs)) {
    if (_.isEmpty(lhs) && _.isEmpty(rhs)) {
      return 0;
    }

    const [lhsFirst, ...lhsRest] = lhs;
    const [rhsFirst, ...rhsRest] = rhs;

    const cmpFirst = compare(lhsFirst, rhsFirst);
    if (cmpFirst !== 0) {
      return cmpFirst;
    }

    return compare(lhsRest, rhsRest);
  }

  if (_.isArray(lhs) && _.isNumber(rhs)) {
    return compare(lhs, [rhs]);
  }

  if (_.isNumber(lhs) && _.isArray(rhs)) {
    return compare([lhs], rhs);
  }

  assert.fail(`Unknown comparison ${JSON.stringify({ lhs, rhs })}`);
}
export function part1(input) {
  return _(input)
    .chunk(3)
    .map(([lhsStr, rhsStr]) => ({
      lhs: JSON.parse(lhsStr),
      rhs: JSON.parse(rhsStr),
    }))
    .map(({ lhs, rhs }) => compare(lhs, rhs))
    .map((cmp, idx) => (cmp === -1 ? idx + 1 : 0))
    .sum();
}

export function part2(input) {
  const divider1 = [[2]];
  const divider2 = [[6]];
  return _(input)
    .compact()
    .map(JSON.parse)
    .concat([divider1, divider2])
    .thru((packets) => packets.sort(compare))
    .map((packet, idx) => {
      if (_.isEqual(packet, divider1) || _.isEqual(packet, divider2)) {
        return idx + 1;
      }
      return 1;
    })
    .reduce(_.multiply);
}
