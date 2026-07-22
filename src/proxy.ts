import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Các route yêu cầu phải đăng nhập
const protectedRoutes = ["/admin", "/profile", "/settings", "/checkout", "/dashboard", "/cart"];
// Các route chỉ dành cho khách (chưa đăng nhập) — /admin/login tách riêng vì nó
// nằm dưới "/admin" (thuộc protectedRoutes) nhưng bản thân lại là trang login.
const authRoutes = ["/login", "/register", "/forgot-password", "/admin/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Đọc accessToken từ cookie (vì chúng ta đã cấu hình httpOnly: false)
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // 1. Nếu chưa đăng nhập mà vào trang yêu cầu đăng nhập -> Đá về đúng trang login
  //    (loại trừ chính các authRoutes để "/admin/login" không tự đá về "/login")
  const isProtectedRoute = !isAuthRoute && protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    const isAdminRoute = pathname.startsWith("/admin");
    const loginUrl = new URL(isAdminRoute ? "/admin/login" : "/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Nếu đã đăng nhập mà vào trang login/register -> Đá về trang chủ tương ứng
  if (isAuthRoute && isAuthenticated) {
    const isAdminLoginRoute = pathname.startsWith("/admin/login");
    return NextResponse.redirect(new URL(isAdminLoginRoute ? "/admin/dashboard" : "/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua các file tĩnh, ảnh, api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
