export declare class ErrorToast extends HTMLElement {
    root: ShadowRoot;
    message: string;
    duration: string;
    static observedAttributes(): string[];
    attributesChangedCallback(name: string, oldValue: string, newValue: string): void;
    constructor();
    connectedCallback(): void;
}
