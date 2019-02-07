import { Task } from "../models/task";
export declare class TaskItem extends HTMLElement {
    root: ShadowRoot;
    task: Task;
    child: Node;
    static readonly observedAttributes: string[];
    draggable: boolean;
    editable: boolean;
    priority: string;
    message: string;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    switchItemView(type: string): void;
    removeAllViewsFromRoot(): void;
    dragstartHandler(ev: any): void;
    dragendHandler(ev: any): void;
    render(): void;
    deleteTask(ev: Event): void;
    addTask(): void;
}
