import { NextResponse } from 'next/server'; // For sending API responses
import connection from '@/lib/mysql'; // Your database connection utility

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, userId, name, date, percentage, status } = body;

        // Validate required fields
        if (!id || !userId || !name || !date || percentage === undefined || !status) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Update the cube in the database
        const query = `
            UPDATE Cubes
            SET userId = ?, name = ?, percentage = ?, status = ?
            WHERE id = ?
        `;
        const [result]: any = await connection.query(query, [userId, name, percentage, status, id]);

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'No cube found with the specified ID' }, { status: 404 });
        }

        // Return a success response
        return NextResponse.json({ message: 'Cube updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating cube:', error);
        return NextResponse.json({ error: 'Failed to update cube', details: error.message }, { status: 500 });
    }
}
