import _ from "lodash";

function mix(n, m) {
  let r = n % m;
  if (r < 0) {
    r += m;
  }
  return r;
}

export function part1(input) {
  const cipher = _.map(input, (s) => ({
    val: parseInt(s, 10),
    moved: false,
  }));

  cipher.toString = () => _(this).map("val").join(",");

  for (let i = 0; i < cipher.length; ) {
    const { val, moved } = cipher[i];

    if (moved) {
      ++i;
      continue;
    }

    const newIndex = mix(i + val - 1, cipher.length - 1) + 1;
    cipher.splice(i, 1);
    cipher.splice(newIndex, 0, {
      val,
      moved: true,
    });
    // console.log(JSON.stringify(_.map(cipher, "val")));
  }

  const zeroIndex = _.findIndex(cipher, ({ val }) => val === 0);

  const onek = cipher[mix(zeroIndex + 1000, cipher.length)].val;
  const twok = cipher[mix(zeroIndex + 2000, cipher.length)].val;
  const threek = cipher[mix(zeroIndex + 3000, cipher.length)].val;
  return onek + twok + threek;
}

export function part2(input) {
  return "TODO";
}
