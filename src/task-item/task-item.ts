import { Task } from "../models/task";

const _itemTemplate = document.createElement('template');
_itemTemplate.innerHTML = `
<style>
:host{
  display:block;
  border:1px solid black;
  margin:5px;
}
.button {
  background-color: white;
  color: black;
  border: 0px none #555555;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin: 4px 2px; */
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0px;
  padding: 0px;
}
.button:hover {
  //background-color: #555555;
  color: red;
}
.chip {
  display: inline-block;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 2px;
  font-size: 13px;
  }
  .chip:hover {
    background: #ccc;
  }
  .grid-container {
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: auto auto auto;
  }

  .header-grid {
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: auto auto;
  }
  header{
    text-align:center;
  }
  header h3{
    margin:0px;
  }
  .card{
    padding:10px;
  }
</style>
<div class="card">
  <header class="header-grid">
    <h3 class="chip grid-item">Priority</h3><a href="" style="margin-left:auto;" id="switchView">Fold</a>
  </header>
  <main>
    <p>message</p>
  </main>
    <footer class="grid-container">
    <div>
    <button class="button grid-item" id="comments">&#x1f4ac;</button>
    <span></span>
    </div>
    <div>
    <button class="button grid-item" id="attachments">&#128206;</button>
    <span></span>
    </div>
    <button id="deleteTask" class="button grid-item">&#x2715;</button>
    </div>
  </footer>
</div>`;

const _editTemplate = document.createElement('template');
_editTemplate.innerHTML = `
<style>
:host{
  display:block;
  border:1px solid black;
  margin:5px;
}
.button {
  background-color: white;
  color: black;
  border: 2px solid lightgray;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin: 4px 2px; */
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0px;
  padding: 5px;
}
.button:hover {
  //background-color: #555555;
  color: red;
}
textarea, select {
  border: 5px solid white;
  -webkit-box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  -moz-box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  box-shadow:
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1);
  padding: 15px;
  background: rgba(255,255,255,0.5);
  margin: 0 0 10px 0;
}

textarea{
  width:-webkit-fill-available;
}
select{
  padding:10px;
}
  .grid-container {
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: auto auto;
  }

  .full-width{
    display:flex;
    flex-direction:column;
  }
  .card{
    padding:10px;
  }
</style>
<div class="card">
  <header class="grid-container">
      <select id="ptyInput">
        <option>High Priority</option>
        <option>Medium Priority</option>
        <option selected>Low Priority</option>
      </select>
      <a href="" style="margin-left:auto;" id="switchView">Fold</a>
  </header>
  <main>
    <textarea id="msgInput" placeholder="Enter Task Details"></textarea>
  </main>
    <footer class="grid-container">
    <div class="full-width">
        <button id="submitTask" class="button grid-item">Add</button>
    </div>
    <div class="full-width">
      <button id="cancel" class="button grid-item">Del</button>
    </div>
  </footer>
</div>
`

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
    this.root.appendChild(_itemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("connected")
    // this.draggable = true;
    if (this.root.querySelector('#deleteTask'))
      this.root.querySelector('#deleteTask').addEventListener('click', (ev) => this.deleteTask(ev));

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
        this.root.appendChild(_editTemplate.content.cloneNode(true));
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
        this.removeAllViewsFromRoot();
        console.log("root", this.root.lastElementChild);
        this.root.appendChild(_itemTemplate.content.cloneNode(true));
        this.draggable = true;
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
    console.log("dragStart; task val", this.task);
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
    const commentSpan = this.root.querySelector('#comments').nextSibling;
    commentSpan.textContent = this.task.comments.length.toString();
    const attachmentSpan = this.root.querySelector('#attachments').nextSibling;
    attachmentSpan.textContent = this.task.attachments.length.toString();
    console.log("message", this.message)
    this.root.querySelector('p').textContent = this.message;
    this.root.querySelector('header h3').textContent = this.priority;
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
    console.log(this.root.getElementById('#msgInput'))
    const msg = (<HTMLTextAreaElement>this.root.querySelector('#msgInput')).value;
    const pty = (<HTMLSelectElement>this.root.querySelector('#ptyInput')).value;
    this.switchItemView('show');
    console.log("msg pty", msg, pty)
    this.message = msg;
    this.priority = pty;
  }

}