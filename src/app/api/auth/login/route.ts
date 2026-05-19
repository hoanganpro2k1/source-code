import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Gửi request đến NestJS backend
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
      // Decode để lấy thời gian sống chính xác của accessToken
      let maxAge = 60 * 60; // Mặc định 1 giờ
      try {
        const base64Url = data.accessToken.split(".")[1];
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
        value: data.accessToken,
        httpOnly: false, // Để client component có thể đọc được qua document.cookie
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: maxAge > 0 ? maxAge : 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { message: "Lỗi kết nối đến máy chủ xác thực." },
      { status: 500 },
    );
  }
}
