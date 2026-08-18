# Task: Popup thông báo chiến thắng kèm pháo hoa

## Mục tiêu
Khi một người chơi thắng ván (không áp dụng cho hòa), hệ thống cần hiển thị một popup thông báo chiến thắng nổi bật kèm hiệu ứng pháo hoa, thay vì chỉ hiển thị dòng chữ trạng thái như hiện tại, để tăng cảm giác ăn mừng cho người thắng.

## Phạm vi
- Thêm một popup/modal hiển thị khi `calculateWinner(board)` khác `null` (đã có sẵn trong `Board.tsx`), che phủ phần lớn/toàn bộ màn hình (overlay), nội dung nêu rõ người thắng (ví dụ: "X đã thắng!").
- Thêm hiệu ứng pháo hoa (fireworks) chạy khi popup đang hiển thị — dùng CSS thuần (keyframe animation) tạo các "tia pháo hoa"/particle nhiều màu, lặp lại hoặc bắn ngẫu nhiên trong lúc popup mở. Không dùng canvas, không dùng thư viện animation ngoài.
- Popup có nút để đóng — tái sử dụng nút "Chơi lại" đã có (di chuyển/nhân bản vào trong popup khi ván đã thắng): bấm nút vừa đóng popup vừa reset ván cờ về trạng thái ban đầu (dùng lại logic reset hiện có trong `Board.tsx`).
- Khi ván hòa (`isDraw(board)` true): giữ nguyên hành vi hiển thị dòng chữ "Hòa!" như hiện tại, KHÔNG hiển thị popup, KHÔNG chạy pháo hoa.
- Khi ván đang chơi dở hoặc sau khi reset: không hiển thị popup, không có pháo hoa, giao diện bàn cờ/trạng thái lượt chơi hoạt động như hiện tại.

## Ngoài phạm vi
- Không thêm popup/hiệu ứng cho trường hợp hòa.
- Không thêm âm thanh (sound effect) khi thắng.
- Không thêm lựa chọn tắt/bật hiệu ứng pháo hoa (accessibility toggle, "giảm hiệu ứng chuyển động"...).
- Không dùng thư viện animation/confetti ngoài (ví dụ `canvas-confetti`, `framer-motion`) — chỉ CSS/Tailwind thuần.
- Không thay đổi logic xác định thắng/hòa trong `src/lib/game.ts`.
- Không thêm nút đóng popup riêng biệt mà giữ ván đang thắng ở trạng thái "xem lại board" (không reset) — theo giả định bên dưới, đóng popup luôn đi kèm reset thông qua nút "Chơi lại" có sẵn.
- Không đổi bảng màu/style tổng thể của bàn cờ ngoài phần trực tiếp liên quan đến popup/pháo hoa (việc đó thuộc task `ui-visual-polish`).

## Tiêu chí hoàn thành
- [x] Khi có người thắng (3 ô liên tiếp cùng ký hiệu) → popup hiển thị ngay, nội dung nêu đúng người thắng (X hoặc O).
- [x] Khi popup hiển thị → hiệu ứng pháo hoa chạy (particle nhiều màu, chuyển động bằng CSS keyframe), quan sát được bằng mắt khi chạy `npm run dev`.
- [x] Khi ván hòa → KHÔNG hiển thị popup, KHÔNG chạy pháo hoa, vẫn hiển thị "Hòa!" như hành vi hiện tại.
- [x] Khi ván đang chơi dở → không có popup, không có pháo hoa xuất hiện.
- [x] Bấm nút "Chơi lại" trong popup → popup đóng lại, board reset về 9 ô trống, lượt về X, pháo hoa dừng.
- [x] Nút "Chơi lại" gốc (ngoài popup, dùng khi ván đang chơi dở hoặc hòa) vẫn hoạt động như task `reset-game` đã hoàn thành — không bị phá vỡ hành vi cũ.
- [x] `npm run lint` không có lỗi/cảnh báo liên quan đến code mới.
- [x] `npm run test` (nếu đã cấu hình Vitest) vẫn pass, không có test cũ bị hỏng do thay đổi này.

## Yêu cầu kiểm thử
- Không có logic thuần mới trong `src/lib` — điều kiện hiển thị popup chỉ dựa trực tiếp vào `calculateWinner(board)` đã có sẵn và đã được unit test đầy đủ trong task `win-detection`. Popup/pháo hoa là UI/animation thuần (component + CSS), không yêu cầu unit test mới trong `game.test.ts`.

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng:
  - `src/components/Board.tsx` — thêm state/JSX hiển thị popup khi có winner, render nút "Chơi lại" bên trong popup, giữ nguyên nhánh hiển thị "Hòa!"/trạng thái lượt chơi hiện có.
  - Có thể tách component mới `src/components/WinPopup.tsx` (khuyến nghị, để `Board.tsx` không phình to) — nhận props `winner` và callback `onReplay`.
  - `src/app/globals.css` — thêm các `@keyframes` CSS cho hiệu ứng pháo hoa (ví dụ tia bắn lên, particle rơi/nổ, nhấp nháy màu).
- Giả định:
  - Popup chỉ có một cách đóng duy nhất là bấm "Chơi lại" (đóng + reset đồng thời) — không có nút "X" đóng riêng chỉ để xem lại board mà không reset, vì yêu cầu gốc chỉ nói "show popup thông báo chiến thắng", không yêu cầu giữ trạng thái xem lại.
  - Pháo hoa triển khai bằng CSS keyframe thuần (ví dụ nhiều `<span>`/`<div>` với animation-delay khác nhau tạo cảm giác bắn nhiều tia), không cần thư viện ngoài — phù hợp quy tắc "ưu tiên useState/CSS thuần, hạn chế thêm dependency" trong CLAUDE.md.
  - Popup overlay dùng nền mờ (ví dụ `bg-black/50`) phủ toàn màn hình, nội dung popup căn giữa, không cần responsive đặc biệt ngoài việc hiển thị tốt trên khung hình desktop thông thường (nhất quán với giả định "không cần responsive đặc biệt cho mobile" của task `game-board-3x3`).
  - Nếu task `ui-visual-polish` đã được triển khai trước, nên tái sử dụng bảng màu/token (ví dụ biến CSS accent, gradient) đã thêm ở đó cho style popup để nhất quán; nếu task đó chưa triển khai, tự chọn màu sắc hợp lý cho popup/pháo hoa (không cần chờ) và developer của `ui-visual-polish` có thể tinh chỉnh lại sau.
