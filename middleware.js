import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req, res) {
  // 토큰 확인
  const bearerToken = req.headers.get("authorization");
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "token을 확인할 수 없습니다" }),
      { status: 401 }
    );
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "token형식이 유효하지 않습니다" }),
      { status: 401 }
    );
  }

  // 사용자의 토큰 확인
  // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const secret = new TextEncoder().encode('asdfjklienvmlqweockjfpsdnlcnznmlvcida');
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "사용자 정보를 가져올 수 없습니다" }),
      { status: 401 }
    );
  }
  console.log("middleware 토큰 검증 끝");
}

// 모든 요청 전에 반응하는 middleware를 선택적으로 사용할 수 있다
export const config = {
  matcher: ["/api/auth/me"],
};
