export const TaskCardTemplate = document.createElement('template');
TaskCardTemplate.innerHTML = `
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