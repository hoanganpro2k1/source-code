# SourceCode UI Style Guide

# 1. Tổng quan phong cách

## UI Direction

Phong cách giao diện:

- Dark Premium
- SaaS Dashboard
- Developer Platform
- Modern Tech UI
- Vercel / Linear Inspired

Đặc trưng:

- Nền tối xanh đen
- Accent tím neon
- Glassmorphism nhẹ
- Border mờ
- Glow tím/xanh
- Typography lớn, sạch
- Motion nhẹ và mượt

---

# 2. Typography

# Primary Font

## Inter

Lý do sử dụng:

- Hiện đại
- Dễ đọc
- Hỗ trợ tiếng Việt tốt
- Phù hợp dashboard và SaaS
- Render đẹp trên dark mode

---

# Font Weights

| Usage         | Weight  |
| ------------- | ------- |
| Hero Title    | 800     |
| Section Title | 700     |
| Card Title    | 600     |
| Body Text     | 400–500 |
| Buttons       | 600     |

---

# Font Sizes

## Hero Title

```css
font-size: 64px;
line-height: 1.1;
letter-spacing: -0.03em;
```

## Section Title

```css
font-size: 32px;
```

## Card Title

```css
font-size: 18px;
font-weight: 600;
```

## Body Text

```css
font-size: 16px;
line-height: 1.7;
```

---

# 3. Color Palette

# Background Colors

## Main Background

```css
#060816
```

## Secondary Background

```css
#0B1020
```

## Card Background

```css
#0E1325
```

---

# Primary Colors

## Main Purple

```css
#7C4DFF
```

## Hover Purple

```css
#8B5CFF
```

## Accent Blue

```css
#3B82F6
```

## Neon Blue Accent

```css
#00D1FF
```

---

# Text Colors

## Main Text

```css
#FFFFFF
```

## Secondary Text

```css
#A1A1AA
```

## Muted Text

```css
#71717A
```

---

# Status Colors

## Success

```css
#22C55E
```

## Warning

```css
#F59E0B
```

## Danger

```css
#EF4444
```

---

# 4. Gradient Styles

# Primary Gradient

```css
linear-gradient(
  135deg,
  #6D4AFF 0%,
  #8B5CFF 100%
)
```

---

# Hero Background Gradient

```css
background:
  radial-gradient(
    circle at top left,
    rgba(124, 77, 255, 0.18),
    transparent 35%
  ),
  radial-gradient(
    circle at bottom right,
    rgba(59, 130, 246, 0.12),
    transparent 30%
  ),
  #060816;
```

---

# Gradient Text

```css
background: linear-gradient(90deg, #ffffff, #8b5cff);

-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

# 5. Glassmorphism

## Card Style

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.06);
```

---

# 6. Shadows

# Default Card Shadow

```css
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
```

---

# Purple Glow

```css
box-shadow: 0 0 40px rgba(124, 77, 255, 0.25);
```

---

# 7. Border Radius

## Cards

```css
border-radius: 24px;
```

## Buttons

```css
border-radius: 14px;
```

## Inputs

```css
border-radius: 12px;
```

---

# 8. Buttons

# Primary Button

```css
background: linear-gradient(135deg, #6d4aff, #8b5cff);

color: white;
font-weight: 600;
```

---

# Button Hover

```css
transform: translateY(-2px);
box-shadow: 0 10px 30px rgba(124, 77, 255, 0.35);
```

---

# 9. Tailwind Config

```ts
colors: {
  background: "#060816",
  card: "#0E1325",
  primary: "#7C4DFF",
  secondary: "#8B5CFF",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  muted: "#A1A1AA",
}
```

---

# 10. Spacing System

# Section Spacing

```css
padding-top: 120px;
padding-bottom: 120px;
```

---

# Card Padding

```css
padding: 24px;
```

---

# Container Width

```css
max-width: 1400px;
margin: 0 auto;
padding: 0 24px;
```

---

# 11. Animation Guidelines

# Animation Style

Phong cách animation:

- Nhẹ
- Mượt
- Không flashy
- Premium feeling

---

# Recommended Effects

- Fade Up
- Blur Reveal
- Hover Scale
- Stagger Cards
- Glow Hover

---

# Framer Motion Example

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
```

---

# 12. UI Inspirations

Nguồn cảm hứng:

- Vercel
- Linear
- Stripe
- Raycast

---

# 13. Component Design Rules

# Navbar

- Height: 72px
- Blur background
- Sticky top
- Border bottom nhẹ

---

# Cards

- Dark glass background
- Hover glow
- Scale nhẹ khi hover
- Border mờ

---

# Inputs

- Background tối
- Border subtle
- Focus glow tím
- Padding lớn

---

# Dashboard Style

- Sidebar dark
- Rounded cards
- Purple analytics charts
- Minimal data layout

---

# 14. Responsive Design

# Breakpoints

| Device  | Width        |
| ------- | ------------ |
| Mobile  | < 768px      |
| Tablet  | 768px–1024px |
| Desktop | > 1024px     |

---

# Mobile Rules

- Stack layout vertically
- Reduce hero font size
- Hide heavy visual effects
- Reduce padding

---

# 15. Brand Direction

# Brand Personality

SourceCode cần mang cảm giác:

- Chuyên nghiệp
- Hiện đại
- Uy tín
- Premium
- Dành cho developer
- Dễ tiếp cận với sinh viên

---

# 16. Suggested Libraries

# Frontend

- Next.js
- TailwindCSS
- Framer Motion
- Shadcn UI
- Lucide Icons

---

# Optional Effects

- Aceternity UI
- Magic UI
- React Bits

---

# 17. Light Theme System

# Light Theme Direction

Mục tiêu light theme:

- Sạch
- Hiện đại
- Premium
- Dễ đọc
- Không quá trắng
- Phù hợp blog và đọc nội dung

---

# Light Theme Colors

## Main Background

```css
#F5F7FB
```

## Secondary Background

```css
#EEF2FF
```

## Card Background

```css
#FFFFFF
```

## Border

```css
rgba(15,23,42,0.08)
```

---

# Text Colors

## Main Text

```css
#0F172A
```

## Secondary Text

```css
#475569
```

## Muted Text

```css
#64748B
```

---

# Primary Accent

## Main Purple

```css
#7C4DFF
```

## Hover Purple

```css
#8B5CFF
```

## Accent Blue

```css
#3B82F6
```

---

# Light Theme Shadows

## Default Shadow

```css
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
```

---

# Soft Glow

```css
box-shadow: 0 0 30px rgba(124, 77, 255, 0.12);
```

---

# Light Theme Card Style

```css
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(12px);
border: 1px solid rgba(15, 23, 42, 0.06);
```

---

# Theme Variables System

## CSS Variables

```css
:root {
  --background: #f5f7fb;
  --card: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --primary: #7c4dff;
}

[data-theme="dark"] {
  --background: #060816;
  --card: #0e1325;
  --text: #ffffff;
  --muted: #a1a1aa;
  --primary: #7c4dff;
}
```

---

# Theme Switching

# Recommended Library

```bash
next-themes
```

---

# Theme Strategy

- Default dark mode
- Hỗ trợ system preference
- Có toggle switch
- Lưu localStorage

---

# Theme Toggle UI

- Icon mặt trăng/mặt trời
- Smooth transition
- Không flash khi reload

---

# Accessibility

# Accessibility Rules

- Contrast ratio tốt
- Text dễ đọc
- Focus states rõ ràng
- Hover states rõ ràng
- Không dùng màu quá nhạt

---

# Light Theme Inspirations

- Linear Light
- Stripe Docs
- Raycast
- Vercel Docs

---

# 19. Overall Design Goal

Mục tiêu giao diện:

- Hiện đại hơn các web bán source code tại Việt Nam
- Mang cảm giác startup công nghệ premium
- Tăng conversion
- Tạo trust với sinh viên
- Dễ scale về sau
