import { Task } from "../models/task";

const _taskPanelTemplate = document.createElement('template');
_taskPanelTemplate.innerHTML = `
<style>
.card {
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
    margin: 20px;
    position: relative;
    margin-bottom: 50px;
    transition: all .2s ease-in-out;
    max-width:300px;
  }
  .card-footer{
      text-align:center;
      margin:5px;
  }
  .card:hover {
    /*box-shadow: 0 5px 22px 0 rgba(0,0,0,.25);*/
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    // margin-bottom: 54px;
  }
  .centered {
    position: absolute;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    text-align:center;
    height:200px;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }

  .image {
    max-height: 200px;
    max-width:100%;
    height:200px;
    opacity: .7;
    overflow: hidden;
    transition: all .2s ease-in-out;
    color:white;
    display:flex;
  }
  .image:hover,
  .card:hover .image {
    opacity: 1;
  }

  @media only screen and (max-width: 600px) {
    .card {
      max-width:350px;
    }
  }

.text {
  background: #FFF;
  padding: 20px;
  min-height: 200px;
}

.text p {
  margin-bottom: 0px;
}

.button {
    background-color: white;
    color: black;
    border: 2px solid #555555;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .button:hover {
    background-color: #555555;
    color: white;
  }

.fab {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  margin-top: -50px;
  right: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, .3);
  color: #fff;
  font-size: 48px;
  text-align: center;
  background: #0066A2;
  -webkit-transition: -webkit-transform .2s ease-in-out;
  transition: transform .2s ease-in-out;
}

.fab:hover {
  background: #549D3C;
  cursor: pointer;
  -ms-transform: rotate(90deg);
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}
</style>

<div class="card">

<header>
<div class="image">
  <img src="https://cdn.dribbble.com/users/1046434/screenshots/2817598/attachments/577913/opensource-background1-big.jpg">
  <div class="centered">
  <h1 id="card-title"></h1>
    <p id="card-count"></p>
  </div>
  </div>
</header>

<main>
<div class="list">
</div>
</main>

<div class="card-footer">
<button id="addTask" class="button">Add Task</button>
</div>
</div>
`;

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
        this.root.appendChild(_taskPanelTemplate.content.cloneNode(true));
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
        const itemT = document.createElement('task-item');
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
        (<HTMLHeadingElement>this.root.querySelector('#card-count')).textContent = `Task Count: ${this.root.querySelectorAll('task-item').length}`;
    }
}