# Task: Làm đẹp giao diện tổng thể (UI visual polish)

## Mục tiêu
Giao diện hiện tại của bàn cờ (nền trắng/đen đơn sắc, ô vuông không màu, chữ đen cơ bản) cần được làm đẹp hơn về màu sắc và độ tinh tế hình ảnh, để trải nghiệm chơi hấp dẫn hơn mà không thay đổi cấu trúc/hành vi của game.

## Phạm vi
- Cập nhật bảng màu nền trang (`src/app/globals.css`, biến `--background`/`--foreground` hoặc thêm biến màu mới) sang tông màu/gradient sinh động hơn thay vì trắng/đen thuần, áp dụng cho cả chế độ sáng và tối (`prefers-color-scheme: dark`).
- Thêm màu sắc/nền phân biệt rõ ràng cho container bàn cờ (khối bọc lưới 9 ô trong `Board.tsx`): bo góc lớn hơn, đổ bóng (shadow), có thể thêm viền hoặc nền gradient nhẹ.
- Thêm màu sắc phân biệt trực quan giữa ký hiệu X và O (ví dụ X một màu, O một màu khác) trong mỗi ô, thay vì cùng màu chữ đen/trắng theo theme như hiện tại.
- Cải thiện hiệu ứng hover/transition của từng ô khi rê chuột (ví dụ đổi màu nền mượt hơn, hơi phóng to nhẹ `scale`) và của nút "Chơi lại" (giữ hiệu ứng hover đã có, có thể tinh chỉnh màu/transition cho nhất quán với bảng màu mới).
- Cải thiện style dòng trạng thái lượt chơi/kết quả (`text-xl font-medium`) — ví dụ làm nổi bật hơn khi có người thắng/hòa (cỡ chữ, màu sắc, đậm nhạt) so với lúc đang chơi bình thường.
- Đảm bảo khoảng cách (spacing)/căn giữa tổng thể vẫn hợp lý trên khung hình desktop thông thường sau khi đổi màu/hiệu ứng.

## Ngoài phạm vi
- Không đổi cấu trúc component hiện có (không tách/gộp thêm component mới, không đổi tên props/state) — chỉ đổi className/style và biến CSS.
- Không đổi layout tổng thể (vẫn là cột dọc: trạng thái → nút chơi lại → lưới 3x3, căn giữa màn hình như hiện tại).
- Không thêm nút chuyển đổi dark/light mode thủ công (toggle) — vẫn giữ nguyên cơ chế tự động theo `prefers-color-scheme` như hiện có.
- Không thay đổi logic game trong `src/lib/game.ts`.
- Không tối ưu responsive/mobile chuyên sâu — giữ giả định "chỉ cần hiển thị tốt trên desktop thông thường" như các task trước.
- Không xử lý phần popup thông báo chiến thắng/pháo hoa (thuộc task riêng `win-popup-fireworks`) — task này chỉ polish giao diện nền tảng (bàn cờ, ô, trạng thái, nút chơi lại) đang tồn tại sẵn.

## Tiêu chí hoàn thành
- [x] Nền trang không còn là màu trắng/đen thuần (`#ffffff`/`#0a0a0a`) — có màu sắc/gradient sinh động hơn, áp dụng đúng cho cả light/dark mode.
- [x] Container bàn cờ (khối bọc lưới 9 ô) có bo góc rõ rệt hơn và có đổ bóng (shadow) quan sát được, khác biệt rõ so với style phẳng hiện tại.
- [x] Ký hiệu X và O hiển thị hai màu khác nhau, dễ phân biệt bằng mắt (không còn cùng màu đen/trắng theo theme).
- [x] Rê chuột vào một ô trống → có hiệu ứng chuyển động mượt (transition/scale) rõ ràng hơn so với chỉ đổi màu nền đơn giản hiện tại.
- [x] Dòng trạng thái khi có người thắng hoặc hòa có style nổi bật hơn (khác biệt quan sát được) so với dòng trạng thái lúc đang chơi bình thường ("Lượt của: X/O").
- [x] Toàn bộ hành vi game (đánh dấu ô, đổi lượt, phát hiện thắng/hòa, reset) không bị thay đổi — chỉ thay đổi phần hiển thị/màu sắc/hiệu ứng.
- [x] `npm run lint` không có lỗi/cảnh báo liên quan đến code mới.
- [x] `npm run test` (nếu đã cấu hình Vitest) vẫn pass — vì task này không đổi logic thuần nên các test hiện có không được phép hỏng.

## Yêu cầu kiểm thử
- Không có logic thuần mới trong `src/lib` — toàn bộ thay đổi thuộc về style/CSS/className, không có hàm mới cần test. Không yêu cầu unit test mới trong `game.test.ts`.

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng:
  - `src/app/globals.css` — cập nhật biến màu `--background`/`--foreground`, có thể thêm biến màu mới (ví dụ `--accent-x`, `--accent-o`, hoặc biến gradient) trong `:root` và khối `@media (prefers-color-scheme: dark)`.
  - `src/components/Board.tsx` — cập nhật className Tailwind cho container bàn cờ, từng ô, dòng trạng thái, nút "Chơi lại" để dùng bảng màu/hiệu ứng mới.
  - `src/app/page.tsx` — cập nhật className nền trang nếu cần đồng bộ với bảng màu mới (hiện đang dùng `bg-zinc-50 dark:bg-black` cứng, nên đổi sang dùng biến `--background` hoặc màu mới nhất quán).
- Giả định:
  - "Đẹp hơn" được cụ thể hóa thành các tiêu chí đo được ở trên (gradient nền, shadow container, màu X/O riêng biệt, hover mượt hơn, trạng thái kết quả nổi bật) vì yêu cầu gốc của người dùng không nêu bảng màu cụ thể.
  - Chọn tông màu cụ thể (ví dụ xanh dương cho X, đỏ/cam cho O, nền gradient tím-xanh nhạt) do developer tự quyết theo gu thẩm mỹ hợp lý, miễn đáp ứng các tiêu chí phân biệt màu sắc/độ nổi bật nêu trên — không cần xin thêm yêu cầu thiết kế chi tiết từ người dùng.
  - Chỉ dùng Tailwind CSS v4 thuần (className, biến CSS trong `globals.css`) — không thêm thư viện UI/theme ngoài.
  - Nên triển khai task này trước task `win-popup-fireworks` để thiết lập bảng màu/token nền tảng; nếu `win-popup-fireworks` đã triển khai trước, cần quay lại đồng bộ màu popup/pháo hoa với bảng màu mới ở bước này.
