@AGENTS.md

# Dự án: Cờ Xo (Tic-Tac-Toe) trên web

Game cờ ca-rô 3x3 (Xo) chơi trên trình duyệt, 2 người chơi luân phiên (X/O) trên cùng một máy.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 cho styling
- ESLint (config mặc định của Next.js)
- Không dùng thư viện state/UI ngoài trừ khi thật sự cần thiết — ưu tiên `useState`/`useReducer` của React vì logic game đơn giản

## Lệnh thường dùng

```bash
npm run dev     # chạy dev server
npm run build   # build production
npm run lint    # kiểm tra lint
```

## Cấu trúc thư mục

- `src/app/` — routes, layout, trang chính (App Router)
- `src/components/` — UI components (Board, Cell, GameStatus, ...)
- `src/lib/` — logic thuần (tính người thắng, kiểm tra hòa, quản lý nước đi) tách khỏi component để dễ test
- `doc/tasks/` — nơi lưu các task do agent `business-analyst` sinh ra cho agent `developer` triển khai (xem quy trình bên dưới)

## Kiểm thử (Testing)

- Framework: **Vitest**, cho unit test của logic thuần trong `src/lib` (chưa cấu hình sẵn — agent `developer` sẽ tự cài đặt tối thiểu khi task đầu tiên cần đến).
- Quy ước: file test đặt cạnh module, đặt tên `*.test.ts`.
- Script: `npm run test` (khi đã cấu hình).
- Chỉ bắt buộc test cho logic thuần (thắng/thua/hòa, xử lý nước đi); không bắt buộc test cho component UI thuần hiển thị.

## Quy tắc code

- Component dạng function, đặt tên PascalCase, file `.tsx`
- Tách logic game (thắng/thua/hòa) ra khỏi component, đặt trong `src/lib`, để dễ review và test độc lập với UI
- Không thêm abstraction/tối ưu sớm cho các trường hợp chưa có yêu cầu (ví dụ: chưa cần multiplayer online, AI, lưu lịch sử nếu task không yêu cầu)
- Ưu tiên code rõ ràng, ít dependency ngoài

## Quy trình làm việc với 3 subagent

Dự án dùng 3 subagent trong `.claude/agents/` theo pipeline tuần tự:

1. **business-analyst** (chỉ đọc + ghi vào `doc/tasks/`) — nhận yêu cầu/tính năng từ người dùng, phân tích và xuất ra 1 file task theo đúng format chuẩn trong `doc/tasks/README.md`.
2. **developer** (đọc/ghi code + chạy lệnh) — đọc file task trong `doc/tasks/`, cài đặt code đúng phạm vi, viết unit test nếu task yêu cầu, chạy `npm run lint`/`npm run test` trước khi báo hoàn thành.
3. **review-code** (chỉ đọc, không sửa) — đối chiếu code vừa đổi với tiêu chí hoàn thành của task: đúng đắn, khả năng maintain, lỗ hổng bảo mật (XSS khi render nội dung động, input không kiểm soát, v.v.), kết luận đạt hay cần sửa lại.

Gọi từng agent theo đúng thứ tự trên cho mỗi tính năng mới. Chi tiết ranh giới/quy trình/định dạng đầu ra của từng agent nằm trong file tương ứng ở `.claude/agents/`.
