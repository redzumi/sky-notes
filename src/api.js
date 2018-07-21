import express from 'express'

const PORT = 3001;

const DB = [
  {
    id: "00d9d442-0d54-4f27-ae30-c1ed6b9c8637",
    level: 0,
    text: "12312",
    timestamp: 1532022012589,
    title: "asdasd"
  }
]

const app = express()

app.get('/api/notes', (req, res) => {
  res.send(JSON.stringify(DB))
})

app.get('/api/note', (req, res) => {
  console.log(req.query)
  res.send('set note')
})

app.listen(PORT, () => {
  console.log(`[API] Started on ${PORT}`)
});