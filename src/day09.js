import _ from "lodash";

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

export function part1(input) {
  const singleMoves = _.reduce(
    input,
    (singleMoves, move) => {
      const [dir, distStr] = _.split(move, " ");
      const dist = parseInt(distStr, 10);
      return `${singleMoves}${_.repeat(dir, dist)}`;
    },
    ""
  );

  const { past: headPositions } = _.reduce(
    singleMoves,
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
  );

  const { past: tailPositions } = _.reduce(
    headPositions,
    ({ past, current }, headPosition) => {
      const next = moveTail(current, headPosition);
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

  return _(tailPositions)
    .map(({ x, y }) => `(${x},${y})`)
    .uniq()
    .size();
}

export function part2(input) {
  return (
    // eslint-disable-next-line lodash/chaining
    _(input)
      // TODO
      .value()
  );
}
