
// API generates random quotes, storing API 
const RANDOM_QUOTE_API = 'https://api.quotable.io/random'
// selecting HTML emelent that displays the quote
const quoteDisplay = document.getElementById('quoteDisplay')
// HTML elemenet that takes user input input
const quoteInput = document.getElementById('quoteInput')

// Event to handle user input and compare to the quote displayed
quoteInput.addEventListener('input', () => {

    const arrQuote = quoteDisplay.querySelectorAll('span')
    const arrValue = quoteInput.value.split('')

})

// getting data from API 
function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(data => data.content)
}

// Async await function that renders API data on the site
async function renderNewQuote () {
    // data stored in a variable
    const quote = await getRandomQuote()
    quoteDisplay.innerText = quote
    // splits the text into an array then puts every character into a span tag
    quote.split('').forEach (character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)
    })
    // initial textarea is empty
    quoteInput.value = null
    // console.log(quote)
}

renderNewQuote()

