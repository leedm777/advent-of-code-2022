import _ from "lodash";

const opponentToRPS = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const meToRPS = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

function parseRound(str) {
  const [p1, p2] = str.split(" ");
  return {
    opponent: opponentToRPS[p1],
    me: meToRPS[p2],
  };
}

const scoreByShape = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const meToOpponentToScore = {
  rock: { rock: 3, paper: 0, scissors: 6 },
  paper: { rock: 6, paper: 3, scissors: 0 },
  scissors: { rock: 0, paper: 6, scissors: 3 },
};

function scoreRound({ opponent, me }) {
  return meToOpponentToScore[me][opponent] + scoreByShape[me];
}

export function part1(input) {
  return _.chain(input).map(parseRound).map(scoreRound).sum().value();
}

const meToOutcome = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

function parseRound2(str) {
  const [p1, p2] = str.split(" ");

  return {
    opponent: opponentToRPS[p1],
    outcome: meToOutcome[p2],
  };
}

const opponentToOutcomeToPlay = {
  rock: { win: "paper", lose: "scissors", draw: "rock" },
  paper: { win: "scissors", lose: "rock", draw: "paper" },
  scissors: { win: "rock", lose: "paper", draw: "scissors" },
};

function selectChoice(opponent, outcome) {
  return opponentToOutcomeToPlay[opponent][outcome];
}

function playRound2({ opponent, outcome }) {
  return {
    opponent,
    me: selectChoice(opponent, outcome),
  };
}

export function part2(input) {
  return _.chain(input)
    .map(parseRound2)
    .map(playRound2)
    .map(scoreRound)
    .sum()
    .value();
}
