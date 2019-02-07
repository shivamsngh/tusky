import { Task } from "../models/task";
export declare class TaskCard extends HTMLElement {
    root: ShadowRoot;
    taskHeader: string;
    taskList: Task[];
    count: number;
    title: string;
    static readonly observedAttributes: string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    constructor();
    connectedCallback(): void;
    createTask(opts?: Task): void;
    handleDrop(ev: any): void;
    allowDrop(ev: Event): void;
    render(): void;
}
