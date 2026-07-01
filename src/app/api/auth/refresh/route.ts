import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    
    // Lấy refreshToken từ cookie của request gửi lên Next Server
    const cookieHeader = request.headers.get("cookie") || "";
    // Trích xuất chính xác giá trị refreshToken từ cookie
    let refreshToken = "";
    const match = cookieHeader.match(/(?:^|; )refreshToken=([^;]*)/);
    if (match) {
      refreshToken = match[1];
    }

    if (!refreshToken) {
      return NextResponse.json({ message: "Không tìm thấy refresh token" }, { status: 401 });
    }

    const res = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Backend yêu cầu refreshToken nằm trong body
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json({ accessToken: data.accessToken });

    if (data.refreshToken) {
      response.cookies.set({
        name: "refreshToken",
        value: data.refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 ngày
        path: "/",
      });
    }

    if (data.accessToken) {
      let maxAge = 60 * 60; // Mặc định 1 giờ
      try {
        const base64Url = data.accessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);
        maxAge = decoded.exp - Math.floor(Date.now() / 1000);
      } catch (e) {}

      response.cookies.set({
        name: "accessToken",
        value: data.accessToken,
        httpOnly: false, // Để client component có thể đọc được
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: maxAge > 0 ? maxAge : 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Refresh API route error:", error);
    return NextResponse.json(
      { message: "Lỗi kết nối đến máy chủ xác thực." },
      { status: 500 }
    );
  }
}
