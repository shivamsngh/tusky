export const ItemTemplate = document.createElement('template');
ItemTemplate.innerHTML = `
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
  border: 1px none #555555;
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
    <div style="display:flex;justify-content: center;">
    <button class="button grid-item" id="comments"><span>&#x1f4ac;</span></button>
    <span></span>
    </div>
    <div style="display:flex;justify-content: center;">
    <button class="button grid-item" id="attachments"><span>&#128206;</span></button>
    <span></span>
    </div>
    <div style="display:flex;justify-content: center;">
    <button style="border-radius:50%;padding:1px 7px 2px;border: 1px solid lightcoral;color: white;background:lightcoral" id="deleteTask" class="button grid-item"><span>&#x2715;</span></button>
    </div>
  </footer>
</div>`;
