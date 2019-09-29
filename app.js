const express = require('express');
const app = express();
const records = require('./records');

app.use(express.json());

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch (err) {
    res.json({message: err.message})
  }
});
// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    res.json(quote);
  } catch(err) {
    res.json({message: err.message});
  }
});

// Send a POST request to /quotes to CREATE a new quote
app.post('/quotes', async (req, res) => {
  try {
    const quote = await records.createQuote({
      quote: req.body.quote,
      author: req.body.author,
    });
    res.json(quote);
  } catch(err) {
    res.json({message: err.message});
  }

});
// Send a PUT request to /quotes/:id to UPDATE(edit) a quotes
// Send a DELETE request to /quotes/:id to DELETE a quote
// Send a GET request to /quotes/quote/random to READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
