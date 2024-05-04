import HashMap from "./hashMap.js";
// This function finds the shortest path from a starting position to an end position for a knight in a chess board.

function knightMoves(start, end) {
  // Create a new instance of the KnightBoard class to represent the chess board.
  const board = new KnightBoard();

  // Populate the adjacency list with all possible positions of the knight on the board.
  board.allPositions();

  // Get the adjacency list from the knight board.
  const adjacencyList = board.adjacencyList;

  // Create a queue to store the nodes to be visited, and a dictionary to keep track of the visit history.
  const queue = [start.toString()];
  const visit = { [start.toString()]: [start] };

  // Loop until the queue is empty.
  while (queue.length > 0) {
    // Get the current node to visit.
    const currentMove = queue.shift();

    // If the currentMove node is the end node, print the shortest path and return.
    if (currentMove == end.toString()) {
      const path = visit[currentMove];
      console.log(`You made it in ${path.length} moves!  Here's your path:`);
      path.forEach((pos) => console.log(pos));
      return;
    }

    // Log the currentMove node.
    console.log(currentMove);

    // For each move the currentMove node can make, add it to the visit dictionary and add it to the queue.
    for (const move of adjacencyList[currentMove]) {
      if (!visit[move]) {
        visit[move] = [...visit[currentMove], move];
        queue.push(move);
      }
    }
  }
}

class KnightBoard {
  constructor() {
    this.adjacencyList = {};
  }

  addEdge(square1, square2) {
    const adjList = this.adjacencyList;
    if (!adjList[square1]) {
      adjList[square1] = [];
    }
    adjList[square1].push(square2);
  }
  populateVertices() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.adjacencyList[`${i},${j}`] = [];
      }
    }
  }
  possibleMoves(vertex) {
    const x = +vertex[0];
    const y = +vertex[1];
    if (x + 2 < 8 && y + 1 < 8) {
      this.addEdge(vertex, [x + 2, y + 1]);
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      this.addEdge(vertex, [x - 2, y + 1]);
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      this.addEdge(vertex, [x + 2, y - 1]);
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      this.addEdge(vertex, [x - 2, y - 1]);
    }
    if (x + 1 < 8 && y + 2 < 8) {
      this.addEdge(vertex, [x + 1, y + 2]);
    }
    if (x + 1 < 8 && y - 2 >= 0) {
      this.addEdge(vertex, [x + 1, y - 2]);
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      this.addEdge(vertex, [x - 1, y + 2]);
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      this.addEdge(vertex, [x - 1, y - 2]);
    }
  }
  allPositions() {
    this.populateVertices();
    for (const vertex in this.adjacencyList) {
      const coordinates = vertex.split(",");

      this.possibleMoves(coordinates);
    }
  }
}
knightMoves([0, 0], [7, 7]);
