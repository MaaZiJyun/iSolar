import { NextResponse } from 'next/server';
import connection from '@/lib/mysql';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, date, remarks, completion, mark, userId } = body;

        const query = `
            INSERT INTO Tasks (name, date, remarks, completion, mark, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [results] = await connection.query(query, [name, date, remarks, completion, mark, userId]);
        
        // Type assertion since we know this is an INSERT query that returns ResultSetHeader
        const resultHeader = results as unknown as { insertId: number };
        return NextResponse.json({ message: 'Task created successfully', taskId: resultHeader.insertId }, { status: 201 });
    } catch (error) {
        console.error('Error adding task:', error);
        return NextResponse.json({ error: 'Failed to add task', details: (error as Error).message }, { status: 500 });
    }
}
