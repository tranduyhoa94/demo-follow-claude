# Task: Bàn cờ 3x3 cơ bản

## Mục tiêu
Người chơi cần một bàn cờ 3x3 hiển thị trên trình duyệt, cho phép 2 người luân phiên đánh dấu X/O bằng cách click vào ô trống, để làm nền tảng cho các tính năng sau (phát hiện thắng/hòa, reset).

## Phạm vi
- Component `Board` hiển thị lưới 3x3 (9 ô).
- Click vào một ô trống sẽ đánh dấu ô đó bằng ký hiệu của người chơi hiện tại (X hoặc O).
- Lượt chơi luân phiên tự động: bắt đầu là X, sau mỗi nước đi hợp lệ đổi sang người còn lại.
- Click vào ô đã có ký hiệu (đã đánh) không có tác dụng gì — không ghi đè, không đổi lượt.
- Hiển thị trạng thái lượt chơi hiện tại phía trên/dưới bàn cờ (ví dụ: "Lượt của: X").
- State bàn cờ (9 ô + lượt hiện tại) quản lý bằng `useState` ngay trong component, chưa cần lưu trữ ngoài.

## Ngoài phạm vi
- Phát hiện người thắng hoặc hòa cờ (task riêng: `win-detection`).
- Nút/chức năng reset ván cờ (task riêng: `reset-game`).
- Lưu lịch sử nước đi, undo, multiplayer online, AI đối thủ.
- Animation/hiệu ứng phức tạp — chỉ cần style Tailwind cơ bản, rõ ràng, căn giữa màn hình.

## Tiêu chí hoàn thành
- [ ] Bàn cờ 3x3 hiển thị đúng 9 ô, căn chỉnh dạng lưới rõ ràng bằng Tailwind.
- [ ] Click ô trống → hiển thị đúng ký hiệu (X hoặc O) của lượt hiện tại.
- [ ] Click ô đã đánh → không có gì thay đổi (không ghi đè ký hiệu, không đổi lượt).
- [ ] Sau mỗi nước đi hợp lệ, lượt chơi tự động đổi luân phiên X ↔ O.
- [ ] UI hiển thị rõ ràng lượt hiện tại là của ai, cập nhật đúng theo state.
- [ ] `npm run lint` không có lỗi/cảnh báo liên quan đến code mới.

## Yêu cầu kiểm thử
- Cần unit test cho phần logic thuần sau (tách vào `src/lib`, không test trực tiếp qua component):
  - Hàm xử lý một nước đi (nhận state bàn cờ hiện tại + vị trí ô + người chơi hiện tại, trả về state bàn cờ mới).
  - Case: đánh vào ô trống → cập nhật đúng ô, đúng ký hiệu.
  - Case: đánh vào ô đã có ký hiệu → trả về state không đổi (immutable, không throw lỗi).
  - Hàm xác định lượt kế tiếp (given lượt hiện tại, trả về lượt tiếp theo) — case X → O và O → X.

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng:
  - `src/components/Board.tsx` — component hiển thị lưới 3x3 và xử lý click.
  - `src/components/Cell.tsx` (tùy chọn, có thể gộp vào Board.tsx nếu đơn giản hơn) — 1 ô trong bàn cờ.
  - `src/lib/game.ts` — logic thuần: kiểu dữ liệu bàn cờ (mảng 9 phần tử `'X' | 'O' | null'`), hàm xử lý nước đi, hàm xác định lượt kế tiếp.
  - `src/lib/game.test.ts` — unit test cho các hàm trên.
  - `src/app/page.tsx` — chỉnh sửa để render `Board` thay cho nội dung mặc định của `create-next-app`.
- Giả định: bàn cờ không cần responsive đặc biệt cho mobile trong task này (chỉ cần hiển thị đúng, căn giữa, dùng được trên màn hình desktop thông thường); nếu cần tối ưu mobile sẽ là task riêng sau.
