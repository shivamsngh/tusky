const template = document.createElement('template');
template.innerHTML = `
  <style>
  .container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    overflow: auto;
}
  header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: transparent;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    z-index: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
}

header > .container {
    margin: 0 auto;
}
  nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    overflow: auto;
    padding:5px;
    width:100%;
}
nav a,
nav a:link {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: dimgray;
    text-decoration: none;
    padding: .8em;
    margin: 0;
    transition: background-color .2s ease-out;
}
nav a.active {
    background-color: rgba(255, 180, 0, 0.6);
    color: black;
    border-radius: 3px;
}
nav a .ver {
    font-size: .8em;
    margin: 0 0 0 1em;
}
nav>*:last-child{
    align-self:center
}
  </style>

  <header>
  <div class="container">
      <nav>
          <a  href="/?page=1" class="active">Home</a>
            <a class="github" href="https://github.com/shivamsngh" target="_blank" rel="noopener">
                <img width="32px" height="32px" src='data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41"><path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.12.83-.26.83-.57 0-.28 0-1.03-.02-2.03-3.33.72-4.03-1.6-4.03-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.1-.73.1-.73 1.2.1 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.3 3.5 1 .1-.77.4-1.3.75-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23.96-.26 1.98-.4 3-.4s2.04.14 3 .4c2.28-1.55 3.3-1.23 3.3-1.23.63 1.66.23 2.88.1 3.18.77.84 1.24 1.9 1.24 3.22 0 4.6-2.8 5.63-5.48 5.92.42.35.8 1.1.8 2.2v3.3c0 .3.2.7.82.57C20.56 22.1 24 17.6 24 12.3c0-6.63-5.37-12-12-12"/></svg>' alt="Github" />
             </a>
      </nav>
  </div>
</header>
`;

export class NavBar extends HTMLElement {
    root: any;
    constructor() {
        super();
        console.log("nav initializing");
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
    }
}




