// /models/cube.ts
import TaskClass from './TaskClass'; // Import TaskClass

export default class CubeClass {
    id: number; // Unique identifier for the cube
    userId: string; // User ID associated with the task
    name: string; // Name of the cube
    date: string; // Date associated with the cube (e.g., YYYY-MM-DD)
    percentage: number; // Calculated percentage of task completions
    status: "OPENING" | "CLOSED"; // Status of the cube

    constructor(
        id: number,
        userId: string,
        name: string,
        date: string,
        percentage: number,
        status: "OPENING" | "CLOSED",
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.date = date;
        this.percentage = percentage;
        this.status = status;
    }

    // Method to calculate the percentage of task completions
    public calculatePercentage(TaskList: TaskClass[]): number {
        if (TaskList.length === 0) return 0; // Avoid division by zero

        const totalCompletion = TaskList.reduce((sum, task) => {
            // Parse the completion string to a number
            const completionValue = parseInt(task.completion);
            return sum + (isNaN(completionValue) ? 0 : completionValue);
        }, 0);

        return totalCompletion / TaskList.length; // Return the average
    }

    // Method to determine the status based on the date
    private determineStatus(): "OPENING" | "CLOSED" {
        const now = new Date();
        const cubeDate = new Date(this.date);

        return cubeDate < now ? "CLOSED" : "OPENING"; // Set status based on the date comparison
    }

    // Method to convert the instance to JSON
    toJson(): object {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            date: this.date,
            percentage: this.percentage,
            status: this.status,
        };
    }

    // Static method to create an instance from JSON
    static fromJson(json: any): CubeClass {
        return new CubeClass(
            json.id,
            json.userId,
            json.name,
            json.date,
            json.percentage,
            json.status as "OPENING" | "CLOSED",
        );
    }
}
