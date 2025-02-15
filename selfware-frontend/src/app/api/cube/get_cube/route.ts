import { NextResponse } from 'next/server'; // For sending API responses
import connection from '@/lib/mysql'; // Your database connection utility

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');

        // Validate required fields
        if (!year || !month || !day) {
            return NextResponse.json({ error: 'Year, month, and day are required' }, { status: 400 });
        }

        // Query the database for matching date
        const query = `
            SELECT * FROM Cubes
            WHERE YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ?
        `;
        const [rows]: any = await connection.query(query, [year, month, day]);

        // Return the results
        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching records:', error);
        return NextResponse.json({ error: 'Failed to fetch records', details: error.message }, { status: 500 });
    }
}
