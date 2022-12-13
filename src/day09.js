import _ from "lodash";

function computeHeadPositions(input) {
  const { past: headPositions } = _.chain(input)
    .reduce((singleMoves, move) => {
      const [dir, distStr] = _.split(move, " ");
      const dist = parseInt(distStr, 10);
      return `${singleMoves}${_.repeat(dir, dist)}`;
    }, "")
    .reduce(
      ({ past, current }, move) => {
        const next = moveHead(current, move);
        return {
          past: [...past, next],
          current: next,
        };
      },
      {
        past: [{ x: 0, y: 0 }],
        current: { x: 0, y: 0 },
      }
    )
    .value();

  return headPositions;
}

function moveHead({ x, y }, move) {
  switch (move) {
    case "L":
      return { x: x - 1, y };
    case "R":
      return { x: x + 1, y };
    case "U":
      return { x, y: y - 1 };
    case "D":
      return { x, y: y + 1 };
  }
}

function moveTail(t, h) {
  const deltaX = h.x - t.x;
  const deltaY = h.y - t.y;

  if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
    // don't need to move
    return t;
  }
  // move in the direction of the head
  return { x: t.x + Math.sign(deltaX), y: t.y + Math.sign(deltaY) };
}

function moveNextKnot(headPositions) {
  const { past: tailPositions } = _.reduce(
    headPositions,
    ({ past, current }, headPosition) => {
      const next = moveTail(current, headPosition);
      if (_.isEqual(next, current)) {
        return { past, current };
      }
      return {
        past: [...past, next],
        current: next,
      };
    },
    {
      past: [{ x: 0, y: 0 }],
      current: { x: 0, y: 0 },
    }
  );
  return tailPositions;
}

export function part1(input) {
  const headPositions = computeHeadPositions(input);
  const tailPositions = moveNextKnot(headPositions);

  return _(tailPositions)
    .map(({ x, y }) => `(${x},${y})`)
    .uniq()
    .size();
}

export function part2(input) {
  const headPositions = computeHeadPositions(input);

  const tailPositions = _.reduce(
    _.range(0, 9),
    (currentKnot) => moveNextKnot(currentKnot),
    headPositions
  );

  return _(tailPositions)
    .map(({ x, y }) => `(${x},${y})`)
    .uniq()
    .size();
}
