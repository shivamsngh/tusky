import { Person } from "./person";

export interface Task {
    id: number;
    priority: string;
    message: string;
    comments: Array<string>;
    attachments: Array<string>;
    owner: Person;
    assignedTo: Person
}