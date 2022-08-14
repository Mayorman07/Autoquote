const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// CREATING LOADING FUNCTION AND SHOW IT
function loadingNow(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    }

    // HIDE LOADING
 function completeNow(){
    quoteContainer.hidden = false;
    loader.hidden = true;
 }
/* SHOW NEW QUOTES*/
function newQuote(){
    loadingNow();
    //pick a  random quote from an array of quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling

    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    completeNow();
} 


/*GET NEW QUOTES*/


async function getQuotes(){
    loadingNow();
    const urlApi='https://type.fit/api/quotes';
    try {
        const response = await fetch (urlApi);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //CATCH ERROR HERE 
    }
}

// TWITTER BUTTON

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

/*ON LOAD*/

getQuotes();