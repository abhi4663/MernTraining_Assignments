// javascript for create.html
const form = document.querySelector('form');

const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    title: form.title.value,
    author:form.author.value,
    price:form.price.value,
    pages:form.pages.value,
    body: form.body.value,
    cover:form.cover.value,
    votes: 0,
    rating:0
  }

  await fetch('http://localhost:5000/books', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('http://127.0.0.1:5500/BooksFetch/index.html')
}

form.addEventListener('submit', createPost);