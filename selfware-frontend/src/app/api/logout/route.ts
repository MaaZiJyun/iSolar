// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // 清除Token Cookie
        (await
            // 清除Token Cookie
            cookies()).set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // 设置为过去的时间
            path: '/',
        });

        return NextResponse.json(
            { message: 'Logout successful' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred', details: (error as Error).message },
            { status: 500 }
        );
    }
}