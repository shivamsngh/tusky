import { TaskCard } from "./task-card";

describe('TypeScript WebPack Starter Tests', () => {

    beforeEach(() => {
        customElements.define('task-card', TaskCard);
    })
    it('Should create element 👌🏽', () => {
        const navEl = document.createElement('task-card');
        expect(navEl.shadowRoot).toBeDefined();
    });
});
