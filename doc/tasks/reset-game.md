# Task: Chơi lại (Reset ván cờ)

## Mục tiêu
Người chơi cần một nút "Chơi lại" luôn có thể bấm để đưa ván cờ hiện tại (dù đang chơi dở hay đã kết thúc) về trạng thái ban đầu: 9 ô trống, lượt về X, không còn hiển thị kết quả thắng/hòa.

## Phạm vi
- Thêm nút "Chơi lại" trong `Board` component, hiển thị cố định gần khu vực trạng thái lượt chơi/kết quả (ví dụ: ngay dưới dòng trạng thái, phía trên hoặc dưới lưới 9 ô).
- Bấm nút: đưa `board` về trạng thái rỗng (9 ô `null`, dùng lại `EMPTY_BOARD` từ `src/lib/game.ts`) và `currentPlayer` về `"X"`.
- Nút hoạt động bất kể ván đang chơi dở (chưa ai thắng, chưa hòa) hay đã kết thúc (đã có người thắng hoặc đã hòa) — bấm lúc nào cũng reset về trạng thái ban đầu.
- Sau khi reset, hành vi bàn cờ trở lại như lúc mới tải trang: click ô trống đánh dấu X trước, đổi lượt luân phiên, logic thắng/hòa (từ task `win-detection`) hoạt động lại bình thường cho ván mới.

## Ngoài phạm vi
- Lưu lịch sử nước đi, undo từng nước, thống kê số ván thắng/thua/hòa qua các lần chơi lại.
- Animation/hiệu ứng khi reset.
- Hộp thoại xác nhận trước khi reset (bấm là reset ngay, không cần xác nhận).
- Làm nổi bật (highlight) đường thắng — thuộc phạm vi loại trừ của task `win-detection`, không xử lý ở đây.
- Thay đổi logic thắng/hòa hoặc logic xử lý nước đi hiện có trong `src/lib/game.ts`.

## Tiêu chí hoàn thành
- [x] Nút "Chơi lại" luôn hiển thị trên UI, kể cả khi ván đang chơi dở lẫn khi đã kết thúc (thắng/hòa).
- [x] Bấm nút khi ván đang chơi dở (một số ô đã đánh, chưa ai thắng) → board về lại 9 ô trống, lượt về X, dòng trạng thái hiển thị lại "Lượt của: X".
- [x] Bấm nút khi ván đã có người thắng → board về lại 9 ô trống, lượt về X, không còn hiển thị thông báo thắng.
- [x] Bấm nút khi ván đã hòa → board về lại 9 ô trống, lượt về X, không còn hiển thị thông báo hòa.
- [x] Sau khi reset, board không còn bị khóa: click vào ô trống đánh dấu được bình thường, đổi lượt đúng, logic thắng/hòa tính lại đúng cho ván mới.
- [x] `npm run lint` không có lỗi/cảnh báo liên quan đến code mới.

## Yêu cầu kiểm thử
- Không có logic thuần mới trong `src/lib` — việc reset chỉ là gọi lại `setBoard(EMPTY_BOARD)` và `setCurrentPlayer("X")` (các giá trị/hàm này đã tồn tại sẵn từ task `game-board-3x3`), không thêm hàm thuần mới nên không yêu cầu unit test mới trong `game.test.ts`.

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng:
  - `src/components/Board.tsx` — thêm nút "Chơi lại" và hàm xử lý reset state (`board`, `currentPlayer`).
- Giả định:
  - Đặt nút ngay dưới dòng trạng thái lượt chơi/kết quả, phía trên lưới 9 ô, để luôn dễ thấy và không đổi vị trí bố cục khi ván kết thúc; developer có thể điều chỉnh vị trí chính xác miễn thỏa yêu cầu "luôn hiển thị, dễ bấm".
  - Style nút dùng Tailwind cơ bản (ví dụ nền màu nhấn, chữ trắng, bo góc), nhất quán với style hiện có của các ô trong `Board.tsx`, không cần thiết kế riêng phức tạp.
  - Vì `EMPTY_BOARD` là hằng số dùng chung (module-level) và `makeMove` luôn tạo mảng mới khi có nước đi hợp lệ (không mutate), việc gán lại `board` bằng chính tham chiếu `EMPTY_BOARD` khi reset là an toàn, không cần tạo bản sao mới.
