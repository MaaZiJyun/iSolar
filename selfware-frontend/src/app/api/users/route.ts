// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/mysql';

// GET 请求 - 获取所有用户
export async function GET() {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return NextResponse.json({ data: rows });
  } catch (error: unknown) {
    console.error('Database Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// POST 请求 - 插入新用户
export async function POST(req: NextRequest) {
    try {
      // 从请求体中解析用户数据
    const {
        username,
        email,
        password,
        contact,
        gender,
        dateOfBirth,
        bio,
      } = await req.json();
  
      // 验证必须字段
      if (!username || !email || !password) {
        return NextResponse.json(
          { error: 'Username, Email, and Password are required fields' },
          { status: 400 } // Bad Request
        );
      }
  
      // **1. 检查 Email 是否已存在**
      const [existingUser] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );
  
      if (Array.isArray(existingUser) && existingUser.length > 0) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 } // Conflict
        );
      }

      // **3. 插入新用户到数据库**
    const [result] = await connection.execute(
        `INSERT INTO users (username, email, password, contact, gender, date_of_birth, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          email,
          password,
          contact,
          gender,
          dateOfBirth ? new Date(dateOfBirth) : null,
          bio,
        ]
      );

      // Type assertion since we know the result will be a ResultSetHeader
      const resultHeader = result as unknown as { insertId: number };
      return NextResponse.json({ id: resultHeader.insertId, message: 'User created successfully' });
    } catch (error: unknown) {
      console.error('Database Error:', error);
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
  
