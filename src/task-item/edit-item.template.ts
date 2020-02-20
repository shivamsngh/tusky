export const EditTemplate = document.createElement('template');
EditTemplate.innerHTML = `
<style>
:host{
  display:block;
  margin:7px;
  -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
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
`;