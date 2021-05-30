// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {
  const res = await fetch('http://localhost:5000/books/' + id);
  if (!res.ok) {
    window.location.replace("/");
  }
  const post = await res.json();
  const template = `  
  <div class="details">   
  <div class="detailscover">
      <img src="${post.cover}"</img>
      </div>
      <div class="detailstext">
    <h1>${post.title}</h1>
    <p>${post.tags}</p>
    <p style="text-align: justify;">${post.description}</p>
    </div></div>
  `
  container.innerHTML = template;
}

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:5000/books/' + id, {
    method: 'DELETE'
  });
 window.location.replace("http://127.0.0.1:5500/BooksFetch/index.html");
})

window.addEventListener('DOMContentLoaded', renderDetails);
