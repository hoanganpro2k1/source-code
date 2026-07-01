import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken } = await request.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: "Thiếu mã truy cập hoặc mã làm mới." },
        { status: 400 },
      );
    }

    const response = NextResponse.json({ success: true, accessToken });

    // Cấu hình cookie refresh token bảo mật (httpOnly)
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
      path: "/",
    });

    // Cấu hình cookie access token (non-httpOnly) để phía Client Component có thể đọc trực tiếp
    let maxAge = 60 * 60; // Mặc định 1 giờ
    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      const decoded = JSON.parse(jsonPayload);
      maxAge = decoded.exp - Math.floor(Date.now() / 1000);
    } catch (e) {}

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge > 0 ? maxAge : 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google Auth Route error:", error);
    return NextResponse.json(
      { message: "Lỗi ghi nhận phiên đăng nhập Google." },
      { status: 500 },
    );
  }
}
