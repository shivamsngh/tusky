import { CardContainer } from './card-container/card-conatiner';
import { NavBar } from './nav-bar/nav-bar';
import { TaskItem } from './task-item/task-item';
import { Toast } from './toast/toast';
import './style.css';
customElements.define('tusky-toast', Toast);
customElements.define('tusky-nav-bar', NavBar);
customElements.define('tusky-task-item', TaskItem);
customElements.define('tusky-card-conatiner', CardContainer);

document.getElementById('addTask').addEventListener('click', (ev: Event) => {
    // presentPopover({'input':'Enter Task Title', ''})
    ev.preventDefault();
    const newCard = document.createElement('tusky-task-card');
    document.getElementById('tusky-task-card').appendChild(newCard);
});

