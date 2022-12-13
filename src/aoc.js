import fs from "fs";
import _ from "lodash";
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

export function dijkstraHeuristic() {
  return 0;
}

export function manhattanHeuristic(goal) {
  return (p) => Math.abs(goal[0] - p[0]) + Math.abs(goal[1] + p[1]);
}

/**
 * Implementation of A* from the Wikipedia algo
 * see [](https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode)
 *
 * The Graph has the following interface:
 *  - start: T - Starting node
 *  - isGoal: (T) -> bool - Returns true if a node is the goal
 *  - h: (T) -> Number - Heuristic to optimize the path, if possible
 *  - getNeighbors: (T) -> Array<T> - Function to get the neighbors of a Node
 *  - getNeighborDistance: (T) -> Number - Returns distance to neighbor
 *  - keyify: (T) -> string - Converts a node into a string to use as a key
 *
 * @param graph Graph of the maze to solve.
 * @return {Array} Array of coordinates with the path found from start to goal.
 */
export function findPath(graph) {
  const open = new MinHeap();
  open.insert(graph.h(graph.start), graph.start);
  const cameFrom = {};

  // g(n) -> cost of the cheapest path from start to n currently known.
  const g = {};
  const setCost = (node, cost) => {
    g[graph.keyify(node)] = cost;
  };
  const getCost = (node) => _.get(g, graph.keyify(node), Infinity);
  setCost(graph.start, 0);

  let current = open.extract();
  while (current && !graph.isGoal(current)) {
    const neighbors = graph.getNeighbors(current);
    for (const neighbor of neighbors) {
      const cost =
        getCost(current) + graph.getNeighborDistance(current, neighbor);
      assert(cost < Infinity, `Should have cost for node ${current}`);
      if (cost < getCost(neighbor)) {
        // new path to the neighbor
        cameFrom[graph.keyify(neighbor)] = current;
        setCost(neighbor, cost);
        // f(n) -> current best guess as to how short a path from start to
        // finish can be if it goes through n
        const f = cost + graph.h(neighbor);
        open.insert(f, neighbor);
      }
    }

    current = open.extract();
  }

  // walk back to the beginning to record the path
  const path = [];
  while (current) {
    path.unshift(current);
    current = cameFrom[graph.keyify(current)];
  }

  return path;
}
