import { TaskCard } from './task-card/task-card';
import { NavBar } from './nav-bar/nav-bar';
import { TaskItem } from './task-item/task-item';

customElements.define('nav-bar', NavBar);
customElements.define('task-item', TaskItem);
customElements.define('task-card', TaskCard);

document.getElementById('addTask').addEventListener('click', (ev: Event) => {
    ev.preventDefault();
    const newCard = document.createElement('task-card');
    document.getElementById('task-cards').appendChild(newCard);
});

