// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import connection from '@/lib/mysql';
import UserClass from '@/modules/UserClass';
import jwt from 'jsonwebtoken';

// Secret key for signing JWT (store this securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Validate provided email and password
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and Password are required' },
                { status: 400 } // Bad Request
            );
        }

        // Fetch user by email
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        const userRecord = (rows as any[])[0];

        if (!userRecord) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 } // Unauthorized
            );
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, userRecord.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 } // Unauthorized
            );
        }

        // Generate JWT token (expires in 1 day)
        const token = jwt.sign(
            {
                id: userRecord.id,
                email: userRecord.email,
                username: userRecord.username,
            },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 day
        );

        // 设置HTTP-Only Cookie
        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // 仅在HTTPS中传输
            maxAge: 60 * 60, // 1天
            path: '/', // Cookie的路径
            sameSite: 'strict', // 防止CSRF攻击
        });

        // Prepare and return a `User` object (excluding password for security)
        const user = new UserClass(
            userRecord.id,
            userRecord.username,
            userRecord.email,
            '',
            userRecord.contact,
            userRecord.gender,
            userRecord.date_of_birth,
            userRecord.bio
        );

        return NextResponse.json(
            { message: 'Login successful', user },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 } // Internal Server Error
        );
    }
}
// export async function POST(res: NextResponse) {
//     try {
//       // 获取请求数据
//       const { email, password } = await res.json();
  
//       // 验证用户的身份逻辑（假设是 hardcoded 数据）
//       if (email === 'domukino@gmail.com' && password === '066811') {
//         return NextResponse.json({
//           message: 'Login successful',
//           user: { id: 1, email },
//         });
//       } else {
//         return NextResponse.json(
//           { error: 'Invalid credentials' },
//           { status: 401 }
//         );
//       }
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Internal server error' },
//         { status: 500 }
//       );
//     }
//   }
  