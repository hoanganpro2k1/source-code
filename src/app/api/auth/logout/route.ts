import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Gọi backend logout nếu có refreshToken
  if (refreshToken) {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (err) {
      // Bỏ qua lỗi network — vẫn xóa cookie phía client
      console.error("[logout] Lỗi gọi backend:", err);
    }
  }

  // Xóa cookies phía BFF dù backend có lỗi hay không
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  response.cookies.set({
    name: "accessToken",
    value: "",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
