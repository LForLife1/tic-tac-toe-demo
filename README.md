# 4x4 Tic-Tac-Toe Solver

A lightweight TypeScript evaluator for a 4x4 board. Parses a 16-character string representation and checks for victories across rows, columns, diagonals, all four corners, and 2x2 sub-grids.

## How to Use

Convert your board string into an internal `Board` state using `parseBoard()`, then pass that state into `checkWinner()` to find the winning player (or use `isGameOver()` to include draw and in-progress statuses).

```typescript
// 1. Parse a 16-character string ('X', 'O', or '-'/' ' for empty)
const board = TicTacToe.parseBoard("XX--XX----------");

// 2. Check for a winner ('X', 'O', or null)
const winner = TicTacToe.checkWinner(board); // "X"

// Optional: Check moves remaining or full game status
const movesExist = TicTacToe.anyMovesLeft(board); // true
const status = TicTacToe.isGameOver(board);       // "X"
```

## How to Run

To execute the file and run the embedded test suite, use `tsx` or `ts-node` directly via npx:

```bash
npx tsx solution.ts
