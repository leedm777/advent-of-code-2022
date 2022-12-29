import _ from "lodash";
import assert from "assert";

function snafuToDec(snafu) {
  return _(snafu)
    .map()
    .reverse()
    .reduce((acc, digit, place) => {
      let val = 0;
      switch (digit) {
        case "0":
          val = 0;
          break;
        case "1":
          val = 1;
          break;
        case "2":
          val = 2;
          break;
        case "-":
          val = -1;
          break;
        case "=":
          val = -2;
          break;
      }
      return acc + val * Math.pow(5, place);
    }, 0);
}

function decToSnafu(dec) {
  const base5 = [];
  while (dec > 0) {
    base5.push(dec % 5);
    dec = Math.floor(dec / 5);
  }
  base5.push(0); // leading 0 makes it easier
  for (let i = 0; i < base5.length; ++i) {
    if (base5[i] > 2) {
      base5[i] = base5[i] - 5;
      ++base5[i + 1];
    }
  }

  while (_.last(base5) === 0) {
    base5.pop();
  }

  return _(base5)
    .reverse()
    .map((digit) => {
      switch (digit) {
        case 0:
          return "0";
        case 1:
          return "1";
        case 2:
          return "2";
        case -1:
          return "-";
        case -2:
          return "=";
        default:
          assert.fail(`Bad digit ${digit}`);
          return "∞";
      }
    })
    .join("");
}

export function part1(input) {
  const val = _(input).map(snafuToDec).sum();
  return decToSnafu(val);
}

export function part2(input) {
  return "TODO";
}
