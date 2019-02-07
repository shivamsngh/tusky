import { NavBar } from "./nav-bar";

describe('TypeScript WebPack Starter Tests', () => {

  beforeEach(() => {
    customElements.define('nav-bar', NavBar);
  })
  it('Should create element 👌🏽', () => {
    const navEl = document.createElement('nav-bar');
    expect(navEl.shadowRoot).toBeDefined();
  });
});
