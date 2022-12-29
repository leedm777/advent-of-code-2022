import _ from "lodash";

function mod(n, m) {
  let r = n % m;
  if (r < 0) {
    r += m;
  }
  return r;
}

function mix(cipher) {
  const mixed = cipher.mixed;
  for (let i = 0; i < mixed.length; ) {
    const { idx, val, moved } = mixed[i];

    if (moved) {
      ++i;
      continue;
    }

    const newIndex = mod(i + val - 1, mixed.length - 1) + 1;
    mixed.splice(i, 1);
    mixed.splice(newIndex, 0, {
      idx,
      val,
      moved: true,
    });
    // console.log(JSON.stringify(_.map(cipher, "val")));
  }
}

function parseInput(input, decryptionKey = 1) {
  const orig = _.map(input, (s, idx) => ({
    val: parseInt(s, 10) * decryptionKey,
    moved: false,
    idx,
  }));
  return {
    orig,
    mixed: orig,
  };
}

export function part1(input) {
  const cipher = parseInput(input);

  mix(cipher);
  const { mixed } = cipher;

  const zeroIndex = _.findIndex(mixed, ({ val }) => val === 0);

  const onek = mixed[mod(zeroIndex + 1000, mixed.length)].val;
  const twok = mixed[mod(zeroIndex + 2000, mixed.length)].val;
  const threek = mixed[mod(zeroIndex + 3000, mixed.length)].val;
  return onek + twok + threek;
}

const DECRYPTION_KEY = 811589153;

export function part2(input) {
  const cipher = parseInput(input, DECRYPTION_KEY);

  mix(cipher);
  return _.map(cipher.mixed, "val");
}
