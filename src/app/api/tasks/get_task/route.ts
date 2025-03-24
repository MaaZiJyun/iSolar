import { NextResponse } from 'next/server';
import connection from '@/lib/mysql'; // Path to your database utility

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');
        const userId = searchParams.get('userId');

        if (!userId || !date) {
            return NextResponse.json({ error: 'User ID and Date are required' }, { status: 400 });
        }

        // Query to retrieve tasks by user ID and date
        const query = `
            SELECT * FROM Tasks
            WHERE user_id = ? AND date = ?
        `;

        // Execute the query
        const [results] = await connection.query(query, [userId, date]);

        // Return the tasks as JSON
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks by date:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks', details: (error as Error).message }, { status: 500 });
    }
}
