import { NextResponse } from 'next/server'; // For sending API responses
import connection from '@/lib/mysql'; // Your database connection utility

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, name, date, percentage, status } = body;
        // console.log(body);
        

        // Validate required fields
        if (!userId || !name || !date || percentage === undefined || !status) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Insert the cube into the database
        const query = `
            INSERT INTO Cubes (userId, name, date, percentage, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const [result]: any = await connection.query(query, [userId, name, date, percentage, status]);

            // Return a success response
            return NextResponse.json({ message: 'Cube inserted successfully', cubeId: result.insertId }, { status: 201 });
        } catch (error: any) {
            // Handle unique constraint violation
            if (error.code === 'ER_DUP_ENTRY') {
                return NextResponse.json({ error: 'A record for this date already exists' }, { status: 409 });
            }
            throw error; // Re-throw other unknown errors
        }
    } catch (error: any) {
        console.error('Error inserting cube:', error);
        return NextResponse.json({ error: 'Failed to insert cube', details: error.message }, { status: 500 });
    }
}
