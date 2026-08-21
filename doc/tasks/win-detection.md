# Task: Phát hiện thắng/hòa

## Mục tiêu
Sau mỗi nước đi, hệ thống cần tự động phát hiện người thắng (3 ô liên tiếp cùng ký hiệu theo hàng/cột/chéo) hoặc hòa (hết 9 ô mà không ai thắng), hiển thị kết quả rõ ràng, và khóa bàn cờ không cho đánh tiếp khi ván đã kết thúc.

## Phạm vi
- Hàm logic thuần trong `src/lib/game.ts` xác định người thắng dựa trên board hiện tại, kiểm tra đủ 8 đường thắng (3 hàng ngang, 3 hàng dọc, 2 đường chéo).
- Logic xác định trạng thái hòa: board đã đầy (9 ô đều có ký hiệu) và không có người thắng.
- `Board` component: sau mỗi nước đi, tính lại trạng thái ván cờ (đang chơi / có người thắng / hòa) và hiển thị kết quả tương ứng (ví dụ: "X đã thắng!", "Hòa!").
- Khi ván đã kết thúc (có người thắng hoặc hòa): click vào ô trống không còn tác dụng — không đánh dấu thêm, không đổi lượt.
- Khi ván đang diễn ra: giữ nguyên hành vi hiện có (đánh dấu ô + đổi lượt) từ task `game-board-3x3`.

## Ngoài phạm vi
- Nút/chức năng chơi lại (reset ván cờ) — task riêng `reset-game`.
- Làm nổi bật (highlight) trực quan 3 ô tạo thành đường thắng.
- Lưu lịch sử nước đi, undo, thống kê số ván thắng/thua/hòa.
- Animation/hiệu ứng khi kết thúc ván.

## Tiêu chí hoàn thành
- [x] Khi 3 ô liên tiếp cùng ký hiệu theo 1 trong 8 đường thắng (3 hàng, 3 cột, 2 chéo) → UI hiển thị đúng người thắng (X hoặc O).
- [x] Khi 9 ô đã đầy mà không có đường thắng nào → UI hiển thị "Hòa" (hoặc thông báo tương đương).
- [x] Khi ván chưa kết thúc → UI tiếp tục hiển thị lượt chơi hiện tại như task trước, không hiển thị kết quả thắng/hòa.
- [x] Sau khi ván kết thúc (thắng hoặc hòa), click vào bất kỳ ô trống nào cũng không thay đổi board và không đổi lượt.
- [x] `npm run lint` không có lỗi/cảnh báo liên quan đến code mới.

## Yêu cầu kiểm thử
- Cần unit test cho hàm xác định người thắng trong `src/lib` (test qua hàm thuần, không qua component), tối thiểu các case:
  - Thắng theo hàng ngang (ít nhất 1 trong 3 hàng).
  - Thắng theo hàng dọc (ít nhất 1 trong 3 cột).
  - Thắng theo đường chéo (cả 2 đường chéo chính và phụ).
  - Hòa: board đầy 9 ô, không có đường thắng nào → trả về không có người thắng (và được coi là hòa).
  - Ván đang diễn ra: board chưa đầy, chưa có đường thắng nào → trả về không có người thắng (và không phải hòa).

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng:
  - `src/lib/game.ts` — thêm logic thuần xác định người thắng / trạng thái hòa.
  - `src/lib/game.test.ts` — thêm unit test cho logic mới.
  - `src/components/Board.tsx` — dùng logic mới để hiển thị kết quả và khóa bàn cờ khi ván kết thúc.
- Giả định:
  - Luật thắng chuẩn Cờ Xo 3x3: 8 đường thắng gồm 3 hàng ngang, 3 hàng dọc, 2 đường chéo.
  - Nếu đồng thời board đầy và có người thắng ở nước đi cuối, ưu tiên hiển thị kết quả thắng (không hiển thị hòa).
  - Không cần phân biệt style riêng cho "thắng" và "hòa" ngoài nội dung text hiển thị khác nhau — style chi tiết (màu sắc, kích thước) do developer tự quyết theo Tailwind cơ bản, miễn rõ ràng dễ đọc.
