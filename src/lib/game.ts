// Logic thuần cho bàn cờ Xo 3x3 (Tic-Tac-Toe).
// Không phụ thuộc React/UI để dễ test độc lập.

export type Player = "X" | "O";
export type Cell = Player | null;
export type BoardState = Cell[]; // luôn có 9 phần tử, index 0-8

export const EMPTY_BOARD: BoardState = Array(9).fill(null);

/**
 * Xử lý một nước đi: đánh dấu ô tại `index` bằng `player` nếu ô đó đang trống.
 * - Nếu ô trống: trả về board mới (immutable) với ô đã được cập nhật.
 * - Nếu ô đã có ký hiệu: trả về đúng tham chiếu `board` ban đầu, không đổi gì.
 */
export function makeMove(
  board: BoardState,
  index: number,
  player: Player
): BoardState {
  if (board[index] !== null) {
    return board;
  }

  const nextBoard = [...board];
  nextBoard[index] = player;
  return nextBoard;
}

/**
 * Trả về lượt chơi kế tiếp dựa trên lượt hiện tại.
 */
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === "X" ? "O" : "X";
}

/**
 * 8 đường thắng của bàn cờ 3x3: 3 hàng ngang, 3 hàng dọc, 2 đường chéo.
 * Mỗi phần tử là bộ 3 index trên board tạo thành 1 đường thắng.
 */
export const WIN_LINES: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Xác định người thắng dựa trên board hiện tại.
 * - Nếu có 1 trong 8 đường thắng cùng ký hiệu: trả về ký hiệu đó (X hoặc O).
 * - Nếu chưa có ai thắng: trả về null.
 */
export function calculateWinner(board: BoardState): Player | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

/**
 * Kiểm tra board đã đầy (9 ô đều có ký hiệu) hay chưa.
 */
export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Xác định ván cờ có hòa hay không: board đã đầy và không có người thắng.
 */
export function isDraw(board: BoardState): boolean {
  return isBoardFull(board) && calculateWinner(board) === null;
}
