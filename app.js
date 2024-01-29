const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json());

const wordsHitMap = [];

app.get('/words/:word', (req, res) => {
    let word = req.params.word;
    let wordCounter = 0;
    if(wordsHitMap[word]){
        wordCounter = wordsHitMap[word];
    }
    console.log(wordCounter);
    res.json({
        message: wordCounter
    });
});

app.post('/words/', async (req, res) => {
    let url = req.body.url;

    fetch(url)
     .then((response) => response.text())
     .then((body) => {
        body = body.replace(/[-\n,]/g, ' ');
        let words = body.split(/\s+/).filter(word => word.length > 0);
             for(let i=0; i < words.length; i++){
                 let fixedWord = words[i].toLowerCase()
                 if(!wordsHitMap[fixedWord]){
                     wordsHitMap[fixedWord] = 1;
                 }
                 else{
                     wordsHitMap[fixedWord] = wordsHitMap[fixedWord]+1;
                 }
             }
     });
    res.json({
        message: 'POST request successful '
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});