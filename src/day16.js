import _ from "lodash";
import { dijkstraHeuristic, findPath } from "./aoc.js";
import assert from "assert";

const TIME_LIMIT = 30;

function parseLine(line) {
  const re =
    /Valve (?<valveName>[A-Z][A-Z]) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<leadTo>.*)*/;
  const { groups } = line.match(re);

  return {
    valveName: groups.valveName,
    flowRate: parseInt(groups.flowRate, 10),
    leadTo: _.split(groups.leadTo, ", "),
  };
}

class Valves {
  constructor(valves) {
    this.valves = valves;
    this.start = {
      valveName: "AA",
      // assume any flowRate of 0 is already open
      closedValves: _(valves).filter("flowRate").map("valveName").value(),
      minute: 0,
    };
    this.h = dijkstraHeuristic;
  }

  isGoal(n) {
    return _.isEmpty(n.closedValves) || n.minute === TIME_LIMIT;
  }

  getNeighbors({ valveName, closedValves, minute }) {
    if (minute > TIME_LIMIT) {
      // Time is up!
      return [];
    }

    const v = this.valves[valveName];
    assert.ok(v, `Could not find valve ${valveName}`);
    const r = _.map(v.leadTo, (nextValveName) => ({
      valveName: nextValveName,
      closedValves,
      minute: minute + 1,
    }));

    // If this valve is open, close it
    const i = _.indexOf(closedValves, valveName);
    if (i >= 0) {
      const nextClosedValves = _.clone(closedValves);
      nextClosedValves.splice(i, 1);
      r.push({
        valveName,
        closedValves: nextClosedValves,
        minute: minute + 1,
      });
    }

    return r;
  }

  getNeighborDistance(current, neighbor) {
    // opportunity cost of the closed valves
    const oppCost = _(neighbor.closedValves)
      .map((valveName) => {
        const valve = this.valves[valveName];
        assert.ok(valve, `Could not find valve named ${valveName}`);
        return valve;
      })
      .map("flowRate")
      .sum();

    // add 1 for either moving tunnels or opening the valves
    return (TIME_LIMIT - neighbor.minute) * oppCost + 1;
  }

  keyify({ valveName, closedValves } = {}) {
    const s = _(closedValves).sortBy().join(",");
    return `${valveName};${s}`;
  }
}

export function part1(input) {
  const valves = new Valves(_(input).map(parseLine).keyBy("valveName").value());
  const path = findPath(valves);

  if (_.isEmpty(path)) {
    return 0;
  }

  let log = "";

  const { totalPressure } = _.reduce(
    _.zip(path, _.range(0, TIME_LIMIT)),
    ({ totalPressure }, [node, minute]) => {
      const closedValves = _.get(node, "closedValves", []);
      const thisPressure = _(valves.valves)
        .filter(({ valveName }) => !_.includes(closedValves, valveName))
        .map("flowRate")
        .sum();

      log = `${log}\n${minute + 1}: ${thisPressure}: ${valves.keyify(node)}`;
      return {
        totalPressure: totalPressure + thisPressure,
      };
    },
    {
      totalPressure: 0,
    }
  );

  // console.log(log);

  return totalPressure;
}

export function part2(input) {
  const valves = new Valves(_(input).map(parseLine).keyBy("valveName").value());
  return valves.length;
}
