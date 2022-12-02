import _ from "lodash";

const scoreByShape = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

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

function scoreRound({ opponent, me }) {
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

function selectChoice(opponent, outcome) {
  switch (outcome) {
    case "lose":
      switch (opponent) {
        case "rock":
          return "scissors";
        case "paper":
          return "rock";
        case "scissors":
          return "paper";
      }
      break;
    case "draw":
      return opponent;
    case "win":
      switch (opponent) {
        case "rock":
          return "paper";
        case "paper":
          return "scissors";
        case "scissors":
          return "rock";
      }
      break;
  }
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
