import { NextResponse } from 'next/server'; // For sending API responses
import connection from '@/lib/mysql'; // Your database connection utility

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId'); // 获取 userId 参数

        // 验证需要的参数
        if (!userId) {
            return NextResponse.json(
                { error: 'UserId is required' },
                { status: 400 }
            );
        }

        // 查询数据库，获取某个用户的所有 Cubes 数据
        const query = `
            SELECT * FROM Cubes
            WHERE userId = ?
        `;
        const [rows]: any = await connection.query(query, [userId]);

        // 返回查询结果
        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching records:', error);
        return NextResponse.json(
            { error: 'Failed to fetch records', details: error.message },
            { status: 500 }
        );
    }
}
