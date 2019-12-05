const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');
const path = require('path');
const request = util.promisify(require('request'));

const app = express();
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../../client/build')));

const port = 80;

const wordsDictAsync = async function() {
    let d = {}
    for (w of (await request('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')).body.split(/[\r\n]+/)) {
        if (d[w[0]] == undefined) {
            d[w[0]] = [];
        }
        d[w[0]].push(w);
    }
    return d
}()

const backronym = async function(word, input = []) {
    let wordsDict = await wordsDictAsync;
    let output = input ? input : [];
    let i = 0;
    for (char of word) {
        if (!output[i]) {
            output[i] = wordsDict[char][Math.floor(Math.random() * wordsDict[char].length)];
        }
        i++;
    }
    return output;
}

app.post('/api/:word', async (req, res) => {
    console.log(req.body);
    try {
        res.json(await backronym(req.params['word'].toLowerCase(), req.body));
    } catch (e) {
        res.send(`Error: ${e}`);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
