
// API generates random quotes, storing API 
const RANDOM_QUOTE_API = 'https://api.quotable.io/random'
// selecting HTML emelent that displays the quote
const quoteDisplay = document.getElementById('quoteDisplay')
// HTML elemenet that takes user input input
const quoteInput = document.getElementById('quoteInput')
// grab timer element
const timer = document.getElementById('timer')

// tracking mistakes & calculating WPM feature implemintation left
// let mistakes = 0

// Event to handle user input and compare to the quote displayed
quoteInput.addEventListener('input', () => {
    // storing the quote in var
    const arrQuote = quoteDisplay.querySelectorAll('span')
    // storing input in a var after split()
    const arrValue = quoteInput.value.split('')

    let correct = true
    arrQuote.forEach((characterSpan, index) => {
        const character = arrValue[index]

        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) renderNewQuote()
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
    quoteDisplay.innerText = ''
    // splits the text into an array then puts every character into a span tag
    quote.split('').forEach (character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)
    })
    // initial textarea is empty
    quoteInput.value = null
    startTimer()
    // console.log(quote)
}

// currently set to xx secs for debugging <<------------------------------------
let startTime
// func for timer
function startTimer () {
    timer.innerText = 0
    startTime = new Date()
    let countStart = setInterval(() => {
        timer.innerText = getTimerTime()
        if (getTimerTime() == 60) {
            clearInterval(countStart)
            timer.innerText = "Times Up!"
            quoteInput.disabled = true;
        }
    }, 1000);
}

function getTimerTime () {
    return Math.floor((new Date() - startTime) / 1000)
}

// let count = 60
// function startTimer() {
//     timer.innerText = count

//     const now = performance.now()
//     const finishTime = now + 60000 // 60 secs

//     const handle = setInterval(() => {
//         newCount = count --
//         timer.innerText = newCount
//         if (performance.now() >= finishTime) {
//             quoteInput.disabled = true;
//             clearInterval(handle); // kill timer
//         }
//     }, 1000)
// }

// Adding dark mode into the webpage
// function toggleDarkMode () {
//     var elemenet = document.body
//     elemenet.classList.toggle('dark-mode')
// }

renderNewQuote()

