import _ from "lodash";

const scoreByShape = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const m1 = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
}

const m2 = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
}

function parseRound(str) {
  const [p1, p2] = str.split(' ');
  return {
    p1: m1[p1],
    p2: m2[p2]
  }
}

function scoreRound({p1: opponent, p2: me}) {
  const baseScore = scoreByShape[me];

  if (opponent === me) {
    // draw
    return baseScore + 3;
  }

  // wins
  if (me === "paper" && opponent === "rock") {
    return baseScore + 6;
  }
  if (me === "scissors" && opponent === "paper") {
    return baseScore + 6;
  }
  if (me === "rock" && opponent === "scissors") {
    return baseScore + 6;
  }

  // lose
  return baseScore + 0;
}

export function part1(input) {
  return _.chain(input)
    .map(parseRound)
    .map(scoreRound)
    .sum()
    .value();
}

export function part2(input) {
}
