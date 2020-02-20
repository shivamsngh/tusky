export const CardContainerTemplate = document.createElement('template');
CardContainerTemplate.innerHTML = `
<style>
.card {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 10px;
  }
  .card-footer{
      text-align:center;
      margin:5px;
  }
  .card:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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
</style>

<div class="card">

<header>
  <div class="image">
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