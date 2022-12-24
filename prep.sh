#!/bin/bash

#
# Prep for today's challenge. You'll need to grab the session cookie from the
# browser and put it into .cookies.txt for authentication.
#

# Puzzles are released at midnight Eastern time
export TZ=America/New_York

day=${1:-$(date +%d)}
year=${2:-$(date +%Y)}
input=./src/day${day}.txt
url=https://adventofcode.com/${year}/day/$((10#${day}))

open ${url}

if test -e src/day${day}.js; then
  echo "day${day}.js already exists" >&2
  exit 1
fi

set -ex
curl \
  --output ${input} \
  --fail \
  --cookie .cookies.txt \
  ${url}/input

head ${input}

cat <<EOF > src/day${day}.js
import _ from "lodash";

export function part1(input) {
  return "TODO";
}

export function part2(input) {
  return "TODO";
}
EOF

cat <<EOF > src/day${day}.spec.js
import { part1, part2 } from "./day${day}";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day${day}.txt");
const exampleInput = [
];

describe("day${day}", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
EOF
