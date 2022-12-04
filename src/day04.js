import _ from "lodash";

function parseRange(str) {
  const [beginStr, endStr] = _.split(str, "-");
  return {
    begin: parseInt(beginStr, 10),
    end: parseInt(endStr, 10),
  };
}

function parseLine(line) {
  const [str1, str2] = _.split(line, ",");
  return {
    elf1: parseRange(str1),
    elf2: parseRange(str2),
  };
}

function shouldReconsider({ elf1, elf2 }) {
  return (
    (elf1.begin >= elf2.begin && elf1.end <= elf2.end) ||
    (elf2.begin >= elf1.begin && elf2.end <= elf1.end)
  );
}

function hasOverlap({ elf1, elf2 }) {
  return (
    (elf1.begin <= elf2.begin && elf2.begin <= elf1.end) ||
    (elf1.begin <= elf2.end && elf2.end <= elf1.end) ||
    (elf2.begin <= elf1.begin && elf1.begin <= elf2.end) ||
    (elf2.begin <= elf1.end && elf1.end <= elf2.end)
  );
}

export function part1(input) {
  return _(input).map(parseLine).filter(shouldReconsider).size();
}

export function part2(input) {
  return _(input).map(parseLine).filter(hasOverlap).size();
}
