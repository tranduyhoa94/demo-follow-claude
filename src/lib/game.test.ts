import { describe, it, expect } from "vitest";
import {
  makeMove,
  getNextPlayer,
  calculateWinner,
  isDraw,
  EMPTY_BOARD,
  type BoardState,
} from "./game";

describe("makeMove", () => {
  it("đánh vào ô trống → cập nhật đúng ô, đúng ký hiệu", () => {
    const board: BoardState = [...EMPTY_BOARD];
    const result = makeMove(board, 4, "X");

    expect(result[4]).toBe("X");
    // các ô khác không đổi
    result.forEach((cell, i) => {
      if (i !== 4) expect(cell).toBeNull();
    });
    // không mutate board gốc
    expect(board[4]).toBeNull();
  });

  it("đánh vào ô đã có ký hiệu → trả về state không đổi (immutable, không throw lỗi)", () => {
    const board: BoardState = [...EMPTY_BOARD];
    board[0] = "X";

    expect(() => makeMove(board, 0, "O")).not.toThrow();

    const result = makeMove(board, 0, "O");
    expect(result[0]).toBe("X");
    expect(result).toEqual(board);
    expect(result).toBe(board); // trả về đúng tham chiếu, không tạo board mới
  });
});

describe("getNextPlayer", () => {
  it("X → O", () => {
    expect(getNextPlayer("X")).toBe("O");
  });

  it("O → X", () => {
    expect(getNextPlayer("O")).toBe("X");
  });
});

describe("calculateWinner", () => {
  it("thắng theo hàng ngang (hàng đầu tiên)", () => {
    const board: BoardState = [
      "X", "X", "X",
      "O", "O", null,
      null, null, null,
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("thắng theo hàng ngang (hàng giữa)", () => {
    const board: BoardState = [
      "O", null, null,
      "X", "X", "X",
      "O", null, null,
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("thắng theo hàng ngang (hàng cuối)", () => {
    const board: BoardState = [
      "X", "O", null,
      "X", "O", null,
      "O", "O", "O",
    ];
    expect(calculateWinner(board)).toBe("O");
  });

  it("thắng theo hàng dọc (cột đầu tiên)", () => {
    const board: BoardState = [
      "X", "O", null,
      "X", "O", null,
      "X", null, null,
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("thắng theo hàng dọc (cột giữa)", () => {
    const board: BoardState = [
      "O", "X", null,
      null, "X", "O",
      null, "X", null,
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("thắng theo hàng dọc (cột cuối)", () => {
    const board: BoardState = [
      null, "X", "O",
      "X", null, "O",
      null, "X", "O",
    ];
    expect(calculateWinner(board)).toBe("O");
  });

  it("thắng theo đường chéo chính (trên trái → dưới phải)", () => {
    const board: BoardState = [
      "X", "O", null,
      "O", "X", null,
      null, null, "X",
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("thắng theo đường chéo phụ (trên phải → dưới trái)", () => {
    const board: BoardState = [
      "O", null, "X",
      "O", "X", null,
      "X", null, null,
    ];
    expect(calculateWinner(board)).toBe("X");
  });

  it("chưa có ai thắng → trả về null", () => {
    const board: BoardState = [
      "X", "O", "X",
      "X", "O", "O",
      "O", "X", "X",
    ];
    expect(calculateWinner(board)).toBeNull();
  });
});

describe("isDraw", () => {
  it("board đầy 9 ô, không có đường thắng nào → hòa", () => {
    const board: BoardState = [
      "X", "O", "X",
      "X", "O", "O",
      "O", "X", "X",
    ];
    expect(calculateWinner(board)).toBeNull();
    expect(isDraw(board)).toBe(true);
  });

  it("ván đang diễn ra: board chưa đầy, chưa có đường thắng nào → không phải hòa", () => {
    const board: BoardState = [
      "X", "O", null,
      null, "X", null,
      null, null, null,
    ];
    expect(calculateWinner(board)).toBeNull();
    expect(isDraw(board)).toBe(false);
  });

  it("board đầy nhưng có người thắng → không tính là hòa", () => {
    const board: BoardState = [
      "X", "X", "X",
      "O", "O", "X",
      "O", "X", "O",
    ];
    expect(calculateWinner(board)).toBe("X");
    expect(isDraw(board)).toBe(false);
  });
});
