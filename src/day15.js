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

  const minX = _(sensors)
    .map((s) => s.sensor[0] - s.beaconDistance)
    .min();
  const maxX = _(sensors)
    .map((s) => s.sensor[0] + s.beaconDistance)
    .max();

  console.error(maxX - minX);
  return _(_.range(minX, maxX + 1))
    .map((x) => (_.some(sensors, (s) => s.cannotContainBeacon([x, y])) ? 1 : 0))
    .sum();
}

export function part2(input) {
  const sensors = _.map(input, parseSensor);
  return sensors;
}
