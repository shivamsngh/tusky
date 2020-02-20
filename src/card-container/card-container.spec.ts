import { CardContainer } from "./card-conatiner";

describe('TypeScript WebPack Starter Tests', () => {

    beforeEach(() => {
        customElements.define('task-card', CardContainer);
    })
    it('Should create element 👌🏽', () => {
        const navEl = document.createElement('task-card');
        expect(navEl.shadowRoot).toBeDefined();
    });
});
