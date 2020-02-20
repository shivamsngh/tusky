import { NavTemplate } from "./nav.template";

export class NavBar extends HTMLElement {
    root: any;
    constructor() {
        super();
        console.log("nav initializing");
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(NavTemplate.content.cloneNode(true));
    }
}




