import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';

const PORT = 3001;

const DB = [
  {
    id: '00d9d442-0d54-4f27-ae30-c1ed6b9c8637',
    level: 0,
    text: '12312',
    timestamp: 1532022012589,
    title: 'asdasd',
  },
];

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/notes', (req, res) => {
  res.send(JSON.stringify(DB));
});

app.post('/api/note', (req, res) => {
  const note = { ...req.body, id: uuid(), timestamp: Date.now() };
  DB.push(note);
  res.send({ success: true });
});

app.delete('/api/note', (req, res) => {
  const note = req.body;
  DB.splice(DB.indexOf(note), 1);
  res.send({ success: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`[API] Started on ${PORT}`);
});
