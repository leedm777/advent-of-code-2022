import _ from "lodash";

function parseLine(line) {
  return _.chunk(line, line.length / 2);
}

function scoreItem(ch) {
  if (ch === _.toLower(ch)) {
    return ch.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  return ch.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

export function part1(input) {
  return _(input)
    .map(parseLine)
    .map(([c1, c2]) => _.intersection(c1, c2)[0])
    .map(scoreItem)
    .sum();
}

function strToArray(s) {
  return _.map(s, _.identity);
}

export function part2(input) {
  return _(input)
    .chunk(3)
    .map(
      ([e1, e2, e3]) =>
        _.intersection(strToArray(e1), strToArray(e2), strToArray(e3))[0]
    )
    .map(scoreItem)
    .sum();
}
