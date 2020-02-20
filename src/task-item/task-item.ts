import { Task } from "../models/task";
import { ItemTemplate } from './task-item.template';
import { EditTemplate } from './edit-item.template';

export class TaskItem extends HTMLElement {
  root: ShadowRoot;
  // draggable: boolean;
  task: Task;
  child: Node;

  static get observedAttributes() {
    return ['priority', 'message', 'editable'];
  }

  get draggable() {
    return this.hasAttribute('draggable');
  }

  set draggable(val) {
    if (val) {
      this.setAttribute('draggable', 'true')
    }
    else {
      this.removeAttribute('draggable');
    }
  }

  get editable() {
    return this.hasAttribute('editable');
  }
  set editable(val) {
    if (val) {
      this.setAttribute('editable', ' ');
    } else {
      this.removeAttribute('editable');
    }
  }
  get priority() {
    return this.getAttribute('priority');
  }
  set priority(val) {
    if (val) {
      this.setAttribute('priority', val);
    } else {
      this.removeAttribute('priority');
    }
  }
  get message() {
    return this.getAttribute('message');
  }
  set message(val) {
    if (val) {
      this.setAttribute('message', val);
    } else {
      this.removeAttribute('message');
    }
  }

  constructor() {
    super();
    console.log("constructor run")
    // dummy data
    this.task = {
      id: new Date(2010, 6, 26).getTime() / 1000,
      priority: '',
      assignedTo: { name: 'Depp', id: 1 },
      owner: { name: 'Depp', id: 1 },
      message: '',
      comments: ['abc', 'def', 'ghq'],
      attachments: ['abc', 'def']
    }
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(ItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("connected")
    if (this.root.querySelector('#deleteTask')) {
      console.log("del ttch")
      this.root.querySelector('#deleteTask').addEventListener('click', (ev) => this.deleteTask(ev));

    }
    this.addEventListener('dragstart', (ev) => this.dragstartHandler(ev));
    this.addEventListener('dragend', (ev) => this.dragendHandler(ev));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'message':
        this.task.message = newValue;
        this.render();
        break;
      case 'priority':
        this.task.priority = newValue;
        this.render();
        break;
      case 'editable':
        if (newValue) {
          this.switchItemView('edit');
        }
        break;
    }
  }

  /**
   * Switch between Edit and Show views
   * @param type
   */
  switchItemView(type: string) {
    switch (type) {
      case 'edit':
        this.removeAllViewsFromRoot();
        this.root.appendChild(EditTemplate.content.cloneNode(true));
        (<HTMLTextAreaElement>this.root.querySelector('#msgInput')).value = this.message;
        (<HTMLTextAreaElement>this.root.querySelector('#ptyInput')).value = this.priority;
        this.removeAttribute('draggable');
        this.draggable = false;
        this.root.querySelector('#submitTask').addEventListener('click', (ev) => this.addTask());
        this.root.querySelector('#switchView').addEventListener('click', (ev) => {
          ev.preventDefault();
          this.switchItemView('show');
        });
        this.root.querySelector('#cancel').addEventListener('click', (ev) => this.remove());

        break;
      case 'show':
        const msg = (<HTMLTextAreaElement>this.root.querySelector('#msgInput')).value;
        const pty = (<HTMLSelectElement>this.root.querySelector('#ptyInput')).value;
        if (!msg && !pty) {
          this.showError('Please enter message and priority')
          break;
        }
        this.removeAllViewsFromRoot();
        this.root.appendChild(ItemTemplate.content.cloneNode(true));
        this.draggable = true;
        this.message = msg;
        this.priority = pty;
        this.root.querySelector('#deleteTask').addEventListener('click', (ev) => this.deleteTask(ev));
        this.root.querySelector('#switchView').addEventListener('click', (ev) => {
          ev.preventDefault();
          this.switchItemView('edit');
        });
        break;
    }
  }

  /**
   * Cleans the root
   */
  removeAllViewsFromRoot() {
    Array.from(this.root.children).forEach((element: any) => {
      this.root.removeChild(element);
    });
  }


  /**
   * Drag event start handler
   * @param ev
   */
  dragstartHandler(ev: any) {
    // Add the target element's id to the data transfer object
    const sourceId = (<ShadowRoot>this.offsetParent.parentNode).host.id
    ev.dataTransfer.setData("text/plain", JSON.stringify({ ... { sourceId }, ...this.task }));
  }


  /**
   * Drag event start handler
   * @param ev
   */
  dragendHandler(ev: any) {
    console.log("dragend event", ev);
    if (ev.dataTransfer.dropEffect !== 'none') {
      this.remove();
    }
  }

  /**
   * Render function, responds to changes in the UI
   * on attribute change
   */
  render(): void {
    const msgEl = this.root.querySelector('p');
    const ptyEl = (<HTMLElement>this.root.querySelector('header h3'));
    const commentSpan = this.root.querySelector('#comments').nextSibling;
    commentSpan.textContent = this.task.comments.length.toString();
    const attachmentSpan = this.root.querySelector('#attachments').nextSibling;
    attachmentSpan.textContent = this.task.attachments.length.toString();
    this.setPriorityBackground(ptyEl, this.priority);
    msgEl.textContent = this.message;
    ptyEl.textContent = this.priority;
  }


  setPriorityBackground(el: HTMLElement, priority: string) {
    el.style.color = 'white';
    switch (priority) {
      case 'High Priority':
        el.style.background = 'crimson';
        break;
      case 'Medium Priority':
        el.style.background = 'mediumturquoise';
        break;
      case 'Low Priority':
        el.style.background = 'khaki';
        break;
    }
  }
  /**
   * Delete current task element
   */
  deleteTask(ev: Event) {
    this.remove();
  }

  /**
   * Add task from edit view to show view
   */
  addTask() {
    const msg = (<HTMLTextAreaElement>this.root.querySelector('#msgInput')).value;
    const pty = (<HTMLSelectElement>this.root.querySelector('#ptyInput')).value;

    if (msg && pty) {
      this.switchItemView('show');
      this.message = msg;
      this.priority = pty;
    }
    else {
      this.showError('Please enter message and priority')
    }

  }

  /**
   * Shows error on screen if validation fails
   */

  showError(errMsg: string) {
    const errToast = document.createElement('tusky-toast');
    errToast.setAttribute('message', errMsg);
    this.root.appendChild(errToast);
  }

}