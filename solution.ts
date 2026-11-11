// Implement a 4x4 Tic-Tac-Toe/Connect Four solver. The program should take in a representation of a 4x4 board,
// and tell you the winner if any.

// Victory is determined by one of five conditions:
// Vertical
// Horizontal
// Diagonal
// All Four Corner
// 2x2 box

// Implementing a UI is not necessary: we are only interested in your implementation of the win condition.
// Implement the below functions, and feel free to create any other types that you need,
// as well as unit tests (just tell us how to run them!).

//If you use AI please include your AI session transcripts.

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[]; // Length 16 for 4x4
type CellTuple = [number, number, number, number]; // Represents a 4-tuple of cell indices for win conditions
type GameResult = "In Progress" | Player | "Draw";

const WINNING_COMBINATIONS: CellTuple[] = [
  //there are only so many win conditions for 4x4, so hardcode them
  // horizontal (4 rows)
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],

  // vertical (4 cols)
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],

  // main diags (2)
  [0, 5, 10, 15],
  [3, 6, 9, 12],

  // corners
  [0, 3, 12, 15],

  // 2x2 boxes (9 sub-grids)
  [0, 1, 4, 5],
  [1, 2, 5, 6],
  [2, 3, 6, 7],
  [4, 5, 8, 9],
  [5, 6, 9, 10],
  [6, 7, 10, 11],
  [8, 9, 12, 13],
  [9, 10, 13, 14],
  [10, 11, 14, 15],
];

class TicTacToe {
  public static parseBoard(boardStr: string): Board {
    if (boardStr.length !== 16) {
      throw new Error("Invalid board length. Expected 16 characters.");
    }

    return boardStr.split("").map((char) => {
      switch (char) {
        case "X":
          return "X";
        case "O":
          return "O";
        case "-":
        case " ":
          return null;
        default:
          throw new Error(`Invalid character '${char}'`);
      }
    });
  }

  public static checkWinner(board: Board): Player | null {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c, d] = combination;
      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c] &&
        board[a] === board[d]
      ) {
        return board[a];
      }
    }
    return null;
  }

  public static anyMovesLeft(board: Board): boolean {
    return board.some((cell) => cell === null);
  }

  public static isGameOver(board: Board): GameResult {
    const winner = this.checkWinner(board);
    if (winner) {
      return winner;
    }
    if (!this.anyMovesLeft(board)) {
      return "Draw";
    }
    return "In Progress";
  }
}

interface TestCase {
  board: string;
  expected: GameResult | boolean;
  desc: string;
}

class Main {
  public static main(): void {
    const winnerTestCases: TestCase[] = [
      // horizontal
      { board: "XXXX------------", expected: "X", desc: "Horizontal Row 0" },
      { board: "----OOOO--------", expected: "O", desc: "Horizontal Row 1" },
      { board: "------------XXXX", expected: "X", desc: "Horizontal Row 3" },
      // vertical
      { board: "X---X---X---X---", expected: "X", desc: "Vertical Col 0" },
      { board: "---O---O---O---O", expected: "O", desc: "Vertical Col 3" },
      // diagonal
      { board: "X----X----X----X", expected: "X", desc: "Main Diagonal" },
      { board: "---O--O--O--O---", expected: "O", desc: "Anti-Diagonal" },
      // corners
      { board: "X--X--------X--X", expected: "X", desc: "All 4 Corners" },
      // 2x2 box
      { board: "XX--XX----------", expected: "X", desc: "Top-Left 2x2 Box" },
      { board: "-----OO--OO-----", expected: "O", desc: "Center 2x2 Box" },
      {
        board: "----------XX--XX",
        expected: "X",
        desc: "Bottom-Right 2x2 Box",
      },
      // in progress or draw
      {
        board: "----------------",
        expected: "In Progress",
        desc: "Empty Board",
      },
      {
        board: "X-O-X-O---------",
        expected: "In Progress",
        desc: "Mid Game with moves left",
      },
      { board: "XOXOOXOXOXOXOXOX", expected: "Draw", desc: "Full Board Draw" },
      {
        board: "-XX-XX-XX-XX-XX-",
        expected: "In Progress",
        desc: "Almost Win",
      },
    ];

    const movesLeftTestCases: TestCase[] = [
      { board: "----------------", expected: true, desc: "Empty Board" },
      {
        board: "X-O-X-O---------",
        expected: true,
        desc: "Mid Game with moves left",
      },
      { board: "XOXOOXOXOXOXOXOX", expected: false, desc: "Full Board Draw" },
      { board: "XXXXXXXXXXXXXXXX", expected: false, desc: "Full Board Win" },
    ];

    let passedCount = 0;
    let totalTests = winnerTestCases.length + movesLeftTestCases.length;

    for (const test of winnerTestCases) {
      const board = TicTacToe.parseBoard(test.board);
      const actual = TicTacToe.isGameOver(board);

      if (actual === test.expected) {
        passedCount++;
      } else {
        console.error(
          `FAIL: ${test.desc}\n  Board:    ${test.board}\n  Expected: ${test.expected}\n  Actual:   ${actual}`,
        );
      }
    }

    for (const test of movesLeftTestCases) {
      const board = TicTacToe.parseBoard(test.board);
      const actual = TicTacToe.anyMovesLeft(board);

      if (actual === test.expected) {
        passedCount++;
      } else {
        console.error(
          `FAIL: ${test.desc}\n  Board:    ${test.board}\n  Expected: ${test.expected}\n  Actual:   ${actual}`
        );
      }
    }

    console.log(`\nTests Completed: ${passedCount}/${totalTests} Passed`);
  }
}

Main.main();
