import { localQuotes } from './quotes.js';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// SHOW LOADER
function loadingNow() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// HIDE LOADER
function completeNow() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// SHOW NEW QUOTE
function newQuote() {
    loadingNow();
    // Pick a random quote from either apiQuotes or localQuotes
    const quotesSource = apiQuotes.length > 0 ? apiQuotes : localQuotes;
    const quote = quotesSource[Math.floor(Math.random() * quotesSource.length)];
    
    // Set author name or 'Unknown'
    authorText.textContent = quote.author ? quote.author : 'Unknown';

    // Check quote length to apply styling
    if (quote.text && quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote text
    quoteText.textContent = quote.text ? quote.text : 'No quote available';
    completeNow();
}

// GET QUOTES FROM API
async function getQuotes() {
    loadingNow();
    const urlApi = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(urlApi);
        apiQuotes = await response.json();
        if (apiQuotes.length === 0) {
            throw new Error('No quotes found');
        }
        newQuote();
    } catch (error) {
        console.error('Failed to fetch quotes', error);
        // Fallback to localQuotes if API fetch fails
        apiQuotes = [];  // Ensure apiQuotes is empty
        newQuote();       // Load a quote from localQuotes
    }
}

// TWEET QUOTE
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON LOAD
getQuotes();
