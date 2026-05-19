import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Các route yêu cầu phải đăng nhập
const protectedRoutes = ["/admin", "/profile", "/settings", "/checkout", "/dashboard"];
// Các route chỉ dành cho khách (chưa đăng nhập)
const authRoutes = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Đọc accessToken từ cookie (vì chúng ta đã cấu hình httpOnly: false)
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  // 1. Nếu chưa đăng nhập mà vào trang yêu cầu đăng nhập -> Đá về /login
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Nếu đã đăng nhập mà vào trang /login, /register -> Đá về trang chủ
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua các file tĩnh, ảnh, api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
