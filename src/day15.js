import _ from "lodash";
import assert from "assert";

class Sensor {
  constructor(sensor, beacon) {
    this.sensor = sensor;
    this.beacon = beacon;

    this.beaconDistance = this.distance(beacon);
  }

  distance(pos) {
    return (
      Math.abs(this.sensor[0] - pos[0]) + Math.abs(this.sensor[1] - pos[1])
    );
  }

  cannotContainBeacon(pos) {
    if (_.isEqual(pos, this.beacon)) {
      return false;
    }
    return this.distance(pos) <= this.beaconDistance;
  }

  getXRangeForY(y) {
    const xDistance = this.beaconDistance - Math.abs(this.sensor[1] - y);
    if (xDistance < 0) {
      return [0, 0];
    }

    assert.deepStrictEqual(
      this.distance([this.sensor[0] - xDistance, y]),
      this.beaconDistance
    );
    assert.deepStrictEqual(
      this.distance([this.sensor[0] + xDistance, y]),
      this.beaconDistance
    );

    return [this.sensor[0] - xDistance, this.sensor[0] + xDistance + 1];
  }

  toString() {
    return JSON.stringify({
      s: this.sensor,
      b: this.beacon,
      d: this.beaconDistance,
    });
  }
}

function parseSensor(str) {
  const re =
    /Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)/;
  const m = str.match(re);
  assert.ok(m, `Regex did not match '${str}'`);
  const { sx, sy, bx, by } = m.groups;

  return new Sensor(
    [parseInt(sx, 10), parseInt(sy, 10)],
    [parseInt(bx, 10), parseInt(by, 10)]
  );
}

export function part1(input, y) {
  const sensors = _.map(input, parseSensor);

  // TOO SLOW
  // const minX = _(sensors)
  //   .map((s) => s.sensor[0] - s.beaconDistance)
  //   .min();
  // const maxX = _(sensors)
  //   .map((s) => s.sensor[0] + s.beaconDistance)
  //   .max();
  //
  // console.error(maxX - minX);
  // return _(_.range(minX, maxX + 1))
  //   .map((x) => (_.some(sensors, (s) => s.cannotContainBeacon([x, y])) ? 1 : 0))
  //   .sum();

  const ranges = _.invokeMap(sensors, "getXRangeForY", y);

  // [[-2, 25]]
  const [first, ...rest] = _.sortBy(ranges, ([min]) => min);
  const { ctr } = _.reduce(
    rest,
    ({ ctr, max }, range) => {
      return {
        ctr: range[1] - Math.max(max, range[0]),
        max: Math.max(max, range[1]),
      };
    },
    {
      ctr: first[1] - first[0],
      max: first[1],
    }
  );

  return ctr;
}

export function part2(input) {
  const sensors = _.map(input, parseSensor);
  return sensors;
}
