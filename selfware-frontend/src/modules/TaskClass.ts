export default class TaskClass {
    id: number; // Task identifier
    userId: string; // User ID associated with the task
    name: string; // Task name/title
    date: string; // Task date (e.g., in YYYY-MM-DD format)
    remarks: string | null; // Optional task remarks
    completion: "0%" | "50%" | "100%"; // Task completion status
    mark: "" | "Failure" | "Pass" | "Satisfactory" | "Good" | "Excellent"; // Task performance evaluation

    constructor(
        id: number,
        userId: string,
        name: string,
        date: string,
        remarks: string | null,
        completion: "0%" | "50%" | "100%",
        mark: "" | "Failure" | "Pass" | "Satisfactory" | "Good" | "Excellent",
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.date = date;
        this.remarks = remarks;
        this.completion = completion;
        this.mark = mark;
    }

    /**
     * Converts the current TaskClass instance into a JSON-compatible object.
     */
    toJson(): object {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            date: this.date,
            remarks: this.remarks,
            completion: this.completion,
            mark: this.mark,
        };
    }

    /**
     * Static method to create a TaskClass instance from a JSON object.
     */
    static fromJson(json: any): TaskClass {
        return new TaskClass(
            json.id,
            json.userId,
            json.name,
            json.date,
            json.remarks || null,
            json.completion as "0%" | "50%" | "100%",
            json.mark as "" | "Failure" | "Pass" | "Satisfactory" | "Good" | "Excellent",
        );
    }
}
