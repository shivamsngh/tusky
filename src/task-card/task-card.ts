import { Task } from "../models/task";
import { TaskCardTemplate } from './task-card.template';

export class TaskCard extends HTMLElement {
  root: ShadowRoot;
  taskHeader: string;
  taskList: Task[] = [];
  count = 1;

  get title() {
    return this.getAttribute('title');
  }
  set title(val) {
    this.setAttribute('title', val);
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(name, "changed");
    this.render();
  }


  constructor() {
    super();
    console.log("task initializing");
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(TaskCardTemplate.content.cloneNode(true));
    console.log(this.root);
    this.root.querySelector('#addTask')
      .addEventListener('click', (ev) => this.createTask());
  }

  connectedCallback() {
    console.log('Custom task card element added to page.');
    this.addEventListener('drop', (ev) => this.handleDrop(ev));
    this.addEventListener('dragover', (ev) => this.allowDrop(ev));
    this.addEventListener('dragleave', (ev) => this.handleDragLeave(ev))
  }

  /**
   * Create Task handler function
   * @param opts
   */
  createTask(opts?: Task) {
    const itemT = document.createElement('tusky-task-item');
    if (opts) {
      console.log(opts)
      itemT.setAttribute('message', opts.message);
      itemT.setAttribute('id', JSON.stringify(opts.id));
      itemT.setAttribute('priority', opts.priority);
      itemT.setAttribute('draggable', 'true');
      this.taskList.push({
        id: opts.id,
        message: opts.message,
        priority: opts.priority,
        owner: { name: 'Depp', id: 1 },
        assignedTo: { name: 'Depp', id: 1 },
        comments: [],
        attachments: []
      });
    }
    else {
      console.log("editable");
      itemT.setAttribute('editable', 'true');
    }
    this.root.querySelector('.list').appendChild(itemT);
    this.render();

  }


  /**
   * Handles drop event/ Listener function for
   * ondrop event
   * @param ev
   */
  handleDrop(ev: any) {
    ev.preventDefault();
    const dumDiv = this.root.querySelector('#dum-div');
    if (dumDiv)
      this.root.querySelector('#dum-div').remove();
    const { sourceId, ...task } = JSON.parse(ev.dataTransfer.getData("text"));
    console.log("id received in drop", sourceId);
    console.log("task received in drop", task);
    this.taskList.push(task);
    this.createTask(task);
  }

  /**
   * Handles Dropping event permissions while element is hovering
   * @param ev
   */
  allowDrop(ev: Event) {
    console.log("Dropping hover")
    ev.preventDefault();
    this.style.boxShadow = '5px';

    // Dummy div
    const dumDiv = this.root.querySelector('#dum-div');
    if (!dumDiv) {
      const dumDiv = document.createElement('div');
      dumDiv.id = 'dum-div';
      dumDiv.style.border = '2px dashed black';
      dumDiv.style.width = '300px';
      dumDiv.style.height = '200px';
      this.root.querySelector('.list').insertBefore(dumDiv, this.root.querySelector('.list').childNodes[0])
    }
  }

  handleDragLeave(ev: Event) {
    ev.preventDefault();
    console.log("dragleft");
    const dumDiv = this.root.querySelector('#dum-div');
    if (dumDiv)
      this.root.querySelector('#dum-div').remove();
  }

  render() {
    console.log("task list renderer called", this.root.querySelectorAll('task-card').length);
    (<HTMLHeadingElement>this.root.querySelector('#card-title')).textContent = this.title;
    (<HTMLHeadingElement>this.root.querySelector('#card-count')).textContent = `Task Count: ${this.root.querySelectorAll('tusky-task-item').length}`;
  }
}