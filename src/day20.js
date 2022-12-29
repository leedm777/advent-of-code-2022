import _ from "lodash";

function mod(n, m) {
  let r = n % m;
  if (r < 0) {
    r += m;
  }
  return r;
}

function mix(cipher) {
  _.forEach(cipher.orig, (toMove) => {
    const newIdx = mod(toMove.idx + toMove.val - 1, cipher.length - 1) + 1;

    if (newIdx === toMove.idx) {
      return;
    }

    if (newIdx < toMove.idx) {
      for (let i = toMove.idx; i > newIdx; --i) {
        cipher.mixed[i] = cipher.mixed[i - 1];
        cipher.mixed[i].idx = i;
      }
    } else {
      for (let i = toMove.idx; i < newIdx; ++i) {
        cipher.mixed[i] = cipher.mixed[i + 1];
        cipher.mixed[i].idx = i;
      }
    }

    cipher.mixed[newIdx] = toMove;
    cipher.mixed[newIdx].idx = newIdx;
  });
}

function parseInput(input, decryptionKey = 1) {
  const orig = _.map(input, (s, idx) => ({
    val: parseInt(s, 10) * decryptionKey,
    idx,
  }));
  return {
    orig,
    mixed: Array.from(orig),
    length: orig.length,
  };
}

function computeCoordinates(cipher) {
  const { mixed } = cipher;
  const zeroIndex = _.findIndex(mixed, ({ val }) => val === 0);
  const onek = mixed[mod(zeroIndex + 1000, mixed.length)].val;
  const twok = mixed[mod(zeroIndex + 2000, mixed.length)].val;
  const threek = mixed[mod(zeroIndex + 3000, mixed.length)].val;
  return onek + twok + threek;
}

export function part1(input) {
  const cipher = parseInput(input);

  mix(cipher);
  return computeCoordinates(cipher);
}

const DECRYPTION_KEY = 811589153;

export function part2(input) {
  const cipher = parseInput(input, DECRYPTION_KEY);

  for (let i = 0; i < 10; ++i) {
    mix(cipher);
  }
  return computeCoordinates(cipher);
}
