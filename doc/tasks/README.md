# Tasks

Thư mục này chứa các file task do agent `business-analyst` sinh ra, để agent `developer` triển khai và agent `review-code` đối chiếu.

Quy ước đặt tên: `<slug-ngan-gon>.md`, kebab-case, tiếng Anh — ví dụ `game-board-3x3.md`, `win-detection.md`, `reset-game.md`.

## Định dạng chuẩn (bắt buộc)

Mọi file task phải giữ đúng các heading sau, theo đúng thứ tự, để các agent khác đọc/đối chiếu nhất quán:

```markdown
# Task: <Tên task ngắn gọn>

## Mục tiêu
<1-3 câu>

## Phạm vi
- <việc cụ thể cần làm>

## Ngoài phạm vi
- <việc KHÔNG làm trong task này>

## Tiêu chí hoàn thành
- [ ] <tiêu chí kiểm chứng được>

## Yêu cầu kiểm thử
- <unit test cụ thể cần có, hoặc "Không yêu cầu" kèm lý do>

## Ghi chú kỹ thuật
- File/thư mục dự kiến bị ảnh hưởng: <đường dẫn>
- Giả định (nếu có): <...>
```

Không đổi tên heading, không bỏ mục — nếu một mục không áp dụng (ví dụ không cần test), vẫn giữ heading và ghi rõ "Không yêu cầu" kèm lý do thay vì xóa mục.
