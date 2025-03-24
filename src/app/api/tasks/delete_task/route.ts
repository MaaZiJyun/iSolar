import { NextResponse } from 'next/server';
import connection from '@/lib/mysql'; // Your database connection utility

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const taskId = searchParams.get('taskId');
        const userId = searchParams.get('userId');

        // Validate required parameters
        if (!taskId || !userId) {
            return NextResponse.json(
                { error: 'Task ID and User ID are required' },
                { status: 400 }
            );
        }

        // SQL Query to delete the task
        const query = `
            DELETE FROM Tasks
            WHERE id = ? AND user_id = ?
        `;

        const [result]: any = await connection.query(query, [taskId, userId]);

        // Check if the task was deleted
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'No task found with the provided ID and User ID' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Task deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { error: 'Failed to delete task', details: (error as Error).message },
            { status: 500 }
        );
    }
}
