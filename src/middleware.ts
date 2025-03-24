import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// List of public routes
const PUBLIC_ROUTES = ['/sign_in', '/sign_up', '/'];

async function verifyToken(token: string) {
  try {
    // 使用 jose 验证 JWT
    const secret = new TextEncoder().encode(JWT_SECRET); // 将密钥转换为 Uint8Array
    const { payload } = await jwtVerify(token, secret); // 验证 Token
    return payload; // 返回解码后的 Token 数据
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Token verification failed or expired:', err.message);
    }
    return null; // 验证失败
  }
}

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl; // Get the current route

  console.log(pathname);

  // Allow access to public routes (sign_in, sign_up, index)
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get('token')?.value; // Use cookies instead of localStorage for better security

  if (!token) {
    // Redirect to sign-in if no token is found
    const loginUrl = new URL('/sign_in', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if token is valid and unexpired
  const verifiedToken = await verifyToken(token);
  if (!verifiedToken) {
    // Redirect to sign-in if token is invalid or expired
    const loginUrl = new URL('/sign_in', req.url);
    return NextResponse.redirect(loginUrl); // Token 过期，重新登录
  }

  // If token is valid, allow access
  return NextResponse.next();
}

// Matching all routes with middleware
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};

