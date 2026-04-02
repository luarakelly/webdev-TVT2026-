import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/v1/cats', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Whiskers',
    birthdate: '2019-04-12',
    weight: 4.2,
    owner: 'Alice',
    image: 'https://loremflickr.com/320/240/cat'
  };
  res.json(cat);
});

app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
