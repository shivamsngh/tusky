import { ToastTemplate } from "./toast.template";

export class Toast extends HTMLElement {
    root: ShadowRoot;
    get message() {
        return this.getAttribute('message');
    }
    set message(val) {
        if (val) {
            this.setAttribute('message', val);
        }
        else {
            this.setAttribute('message', '');
        }
    }

    get duration() {
        return this.getAttribute('duration') || '2000';
    }
    set duration(val) {
        if (val) {
            this.setAttribute('duration', val);
        }
        else {
            this.setAttribute('duration', '2000');
        }
    }

    static observedAttributes() {
        return ['message', 'duration'];
    }

    attributesChangedCallback(name: string, oldValue: string, newValue: string) {

        switch (name) {
            case 'message':
                (<HTMLDivElement>this.root.querySelector('#snackbar')).textContent = newValue;
                break;
            case 'duration':
                break;
        }
    }
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(ToastTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("Error Conncted", this.duration);
        console.log("Error Conncted", this.message);
        this.root.querySelector('#snackbar').className = "show";
        (<HTMLDivElement>this.root.querySelector('#snackbar')).textContent = this.message;
        setTimeout(() => {
            this.root.querySelector('#snackbar').className = this.root.querySelector('#snackbar').className.replace("show", "");
            this.remove();
        }, parseInt(this.duration));
    }

}