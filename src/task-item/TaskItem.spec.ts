import { TaskItem } from "./task-item";

describe('TypeScript WebPack Starter Tests', () => {

  beforeEach(() => {
    customElements.define('task-item', TaskItem);
  })
  it('Should create element 👌🏽', () => {
    const navEl = document.createElement('task-item');
    expect(navEl.shadowRoot).toBeDefined();
  });
});
