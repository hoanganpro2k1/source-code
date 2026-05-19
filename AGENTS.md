<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This project uses the latest Next.js App Router.
APIs, conventions, and file structure may differ from older versions.

Always:

- Read relevant docs from node_modules/next/dist/docs/
- Follow latest App Router conventions
- Prefer Server Components
- Avoid deprecated APIs
- Use Metadata API
- Use async server patterns
<!-- END:nextjs-agent-rules -->

# AI Project Instructions

Project Name:
SourceCode

This is a premium marketplace platform
for selling source code projects
and graduation thesis projects.

---

# Backend NestJS Integration (CRITICAL)

Mã nguồn dự án Backend nằm ở thư mục riêng biệt:
- **Đường dẫn Backend**: `D:\SourceDoan\be-source-doan`
- **Địa chỉ Local**: `http://localhost:3001`
- **Tài liệu ngữ cảnh**: Đọc thêm tại [.agent/context/backend.md](file:///d:/SourceDoan/source-doan/.agent/context/backend.md)

**QUY TẮC BẮT BUỘC CHO AI**: Khi người dùng yêu cầu làm việc với API hoặc tính năng (ví dụ: login, register, checkout, v.v.), AI phải **chủ động** đọc trực tiếp code của Backend tại `D:\SourceDoan\be-source-doan` thông qua các công cụ hệ thống (`view_file`, `list_dir`, `grep_search`) để biết chính xác cấu trúc API, DTO, Database Schema trước khi viết code Frontend.

---

# IMPORTANT

Before generating code,
read and follow all rules and context inside:

.agent/

Especially:

- .agent/rules/
- .agent/context/
- .agent/decisions/
- .agent/examples/

The .agent folder acts as the main AI memory
and project knowledge base.

Always prioritize:

1. Existing codebase patterns
2. .agent examples
3. .agent rules
4. AGENTS.md instructions

---

# Core Development Principles

- Keep code scalable
- Keep UI consistent
- Prefer reusable components
- Follow feature-based architecture
- Generate production-ready code
- Maintain premium SaaS UI quality

---

# UI Direction

The UI style is:

- Dark premium SaaS
- Inspired by Vercel, Linear, Stripe
- Modern developer platform aesthetic

Avoid:

- Flat UI
- Old dashboard styles
- Random design patterns
- Inconsistent spacing

---

# Next.js Principles

- Prefer Server Components
- Avoid unnecessary use client
- Optimize performance
- Use Metadata API
- Follow App Router best practices

---

# Component Rules

Always:

- Reuse existing UI components
- Follow design system
- Support responsiveness
- Support dark/light themes

Avoid:

- Duplicated UI
- Massive components
- Inline styles

---

# AI Output Expectations

Generated code must:

- Match the existing design system
- Follow .agent rules
- Follow existing examples
- Be maintainable
- Be scalable
- Be responsive
- Be SEO-friendly
- Be production-ready

---

# Language Rules

- Always respond in Vietnamese
- Code comments should be concise
- Keep naming clear and readable
