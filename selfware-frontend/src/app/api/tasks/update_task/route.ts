import { NextResponse } from 'next/server';
import connection from '@/lib/mysql'; // Database connection utility

export async function PUT(req: Request) {
    try {
        // Parse JSON payload from the request body
        const body = await req.json();

        const {id, name, date, remarks, completion, mark, userId } = body;

        // Validate required parameters
        if (!id || !userId) {
            return NextResponse.json(
                { error: 'Task ID and User ID are required' },
                { status: 400 }
            );
        }

        // Validate optional parameters and at least one field to update
        if (name === undefined && remarks === undefined && completion === undefined) {
            return NextResponse.json(
                { error: 'At least one field (name, remarks, completion) must be provided to update' },
                { status: 400 }
            );
        }

        // Build SQL query dynamically based on provided fields
        const updates = [];
        const values: any[] = [];
        if (name) {
            updates.push(`name = ?`);
            values.push(name);
        }
        if (remarks) {
            updates.push(`remarks = ?`);
            values.push(remarks);
        }
        if (completion !== undefined) {
            updates.push(`completion = ?`);
            values.push(completion);
        }
        if (mark !== undefined) {
            updates.push(`mark = ?`);
            values.push(mark);
        }

        // Add WHERE clause values at the end
        values.push(id, userId);

        const query = `
            UPDATE Tasks
            SET ${updates.join(', ')}
            WHERE id = ? AND user_id = ?
        `;

        const [result]: any = await connection.query(query, values);

        // Check if the task was updated
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'No task found with the provided ID and User ID' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Task updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'Failed to update task', details: (error as Error).message },
            { status: 500 }
        );
    }
}
