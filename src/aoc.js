import fs from "fs";
import _ from "lodash";
import { EventEmitter } from "events";
import assert from "assert";

export function readInput(filename) {
  return _.chain(fs.readFileSync(filename, "utf-8"))
    .trimEnd()
    .split("\n")
    .value();
}

export class MinHeap {
  constructor() {
    // null element helps with the off by one errors
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(priority, node) {
    this.heap.push({
      priority,
      node,
    });

    let i = this.heap.length - 1;
    let p = Math.floor((i - 1) / 2);

    while (i > 0 && this.priority(i) < this.priority(p)) {
      this.swap(i, p);

      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  peek() {
    return this.heap[0].node;
  }

  extract() {
    if (this.isEmpty()) {
      return;
    }

    const r = this.heap[0];
    if (this.heap.length <= 1) {
      this.heap = [];
      return r.node;
    }

    this.heap[0] = this.heap.pop();

    let i = 0;
    let c1 = 1;
    let c2 = 2;

    while (
      this.priority(i) > this.priority(c1) ||
      this.priority(i) > this.priority(c2)
    ) {
      if (this.priority(c1) < this.priority(c2)) {
        this.swap(i, c1);
        i = c1;
      } else {
        this.swap(i, c2);
        i = c2;
      }

      c1 = 2 * i + 1;
      c2 = 2 * i + 2;
    }

    return r.node;
  }

  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  priority(i) {
    return _.get(this.heap, i, { priority: Infinity }).priority;
  }
}

function dijkstraHeuristic() {
  return 0;
}

export function manhattanHeuristic(goal) {
  return (p) => Math.abs(goal[0] - p[0]) + Math.abs(goal[1] + p[1]);
}

/**
 * Implementation of A* from the Wikipedia algo
 * see [](https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode)
 *
 * @param graph - Graph of maze positions.
 * @param start - Position we are starting from
 * @param goalFn - Function testing if we've reached our goal
 * @param h - estimates the cost to reach goal from node n.
 * @param emitter - emitter to get graph updates
 */
export function findPath({
  graph,
  start,
  goalFn,
  neighborsFn,
  h = dijkstraHeuristic,
  emitter = new EventEmitter(),
}) {
  const open = new MinHeap();
  open.insert(h(start), start);
  const cameFrom = new Map();

  // g(n) -> cost of the cheapest path from start to n currently known.
  const cheapestPathFromStart = [];
  cheapestPathFromStart[graph.keyify(start)] = 0;

  let current = open.extract();
  while (current && !goalFn(current)) {
    emitter.emit(
      "visit",
      current,
      _.map(open.heap, "node"),
      _.keys(cheapestPathFromStart)
    );
    const neighbors = neighborsFn(current);
    for (const neighbor of neighbors) {
      const cost =
        _.get(cheapestPathFromStart, graph.keyify(current), Infinity) +
        graph.getNeighborDistance(current, neighbor);
      assert(cost < Infinity, `Should have cost for node ${current}`);
      if (
        cost < _.get(cheapestPathFromStart, graph.keyify(neighbor), Infinity)
      ) {
        cameFrom.set(graph.keyify(neighbor), current);
        cheapestPathFromStart[graph.keyify(neighbor)] = cost;
        // f(n) -> current best guess as to how short a path from start to
        // finish can be if it goes through n
        const f = cost + h(neighbor);
        open.insert(f, neighbor);
      }
    }

    current = open.extract();
  }

  // walk back to the beginning to record the path
  const path = [];
  while (current) {
    path.unshift(current);
    current = cameFrom.get(graph.keyify(current));
  }

  return path;
}
