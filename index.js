//butons
const randomButton = document.getElementById('random-button')
const copyButton = document.getElementById('copy-button')

//texts
const author = document.getElementById('author-name')
const tagsContainer = document.getElementById('tags-container')
const quoteText = document.getElementById('quote-text')
const alertText = document.getElementById('alert')

//logic
const fetchData = async () => {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json();
    author.textContent = data.author
    quoteText.textContent = `"${data.content}"`
    console.log(data);
    tagsContainer.innerHTML = ''
    data.tags.forEach(elemento => {
        const span = document.createElement('span');
        span.textContent = elemento;
        tagsContainer.appendChild(span);
    });

}

//events
let buttonEnabled = true;

randomButton.addEventListener('click', event => {
    if (buttonEnabled) {
        fetchData();
        buttonEnabled = false;
        setTimeout(() => {
            buttonEnabled = true;
        }, 1000);
    } else {
        console.log("El botón está deshabilitado. No se realizará ninguna acción.");
    }
});

copyButton.addEventListener('click', async () => {
    if (buttonEnabled) {
        navigator.clipboard.writeText(quoteText.textContent);

        alertText.classList.toggle('hidden')
        buttonEnabled = false;
        setTimeout(() => {
            buttonEnabled = true;
            alertText.classList.toggle('hidden')
        }, 2000);
    } else {
        console.log("El botón está deshabilitado. No se realizará ninguna acción.");
    }
});

fetchData();
