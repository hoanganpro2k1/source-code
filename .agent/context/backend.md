# Backend Context & Integration

Dự án Frontend này được kết nối trực tiếp với dự án Backend NestJS nằm trên cùng máy tính của người dùng.

## Thông tin dự án Backend

- **Đường dẫn thư mục (Workspace Path)**: `D:\DUAN\DOAN_24H\be-doan-24h`
- **Cổng chạy Local (Local URL)**: `http://localhost:3001`
- **Cơ sở dữ liệu (Database)**: PostgreSQL `be_source_doan`
  - URL Kết nối: `postgresql://postgres:root@localhost:5432/be_source_doan?schema=public`

## Hướng dẫn dành cho AI Agent

Khi người dùng đưa ra các yêu cầu liên quan đến API, xử lý logic, đồng bộ dữ liệu hoặc hoàn thành các chức năng tích hợp (ví dụ: *"Hãy xem API login và hoàn thành chức năng login"*):

1. **CHỦ ĐỘNG ĐỌC CODE BACKEND**: AI **BẮT BUỘC** phải sử dụng các công cụ hệ thống (`list_dir`, `view_file`, `grep_search`) với đường dẫn tuyệt đối `D:\DUAN\DOAN_24H\be-doan-24h` để kiểm tra:
   - Các Route/Controller trong `src/routes/` hoặc `src/controllers/`.
   - Các DTO đầu vào/đầu ra (Data Transfer Objects) để biết chính xác kiểu dữ liệu cần gửi lên và nhận về.
   - Cấu trúc bảng Database trong `prisma/schema.prisma` của dự án Backend.
2. **KHÔNG GIẢ ĐỊNH**: Không tự giả định cấu trúc API của Backend. Hãy luôn kiểm tra trực tiếp mã nguồn thực tế tại đường dẫn trên.
3. **ĐỒNG BỘ KIỂU DỮ LIỆU (TYPESCRIPT)**: Khai báo các Interface/Type ở Frontend khớp hoàn toàn với cấu trúc DTO ở Backend.
4. **DÙNG BỘ TÀI LIỆU AI CỦA BACKEND**: Backend có sẵn bộ tài liệu `.agent/` riêng tại `D:\DUAN\DOAN_24H\be-doan-24h\.agent\` — đọc trước khi đọc code thô để nắm nhanh kiến trúc, quy ước, và các phần "đã biết nhưng chưa triển khai":
   - `.agent/context/architecture.md` — kiến trúc tổng thể, quy ước file mỗi module
   - `.agent/context/auth-and-authorization.md` — luồng đăng ký/đăng nhập/JWT/RBAC
   - `.agent/context/commerce-flow.md` — luồng giỏ hàng → đơn hàng → thanh toán
   - `.agent/context/content-and-media.md` — brand/category đa ngôn ngữ, upload media, email
   - `.agent/decisions/known-gaps.md` — **quan trọng**: các phần có code sẵn nhưng chưa hoạt động thật (Redis, BullMQ, UserOwnership/download, hoàn kho khi huỷ đơn...) — tránh giả định các tính năng này đã chạy được khi tích hợp Frontend.
