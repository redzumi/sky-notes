import express from 'express'

import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import App from './components/App'

const PORT = 3000;
const BODY_CODE = fs.readFileSync('./index.html', 'utf-8')

const getRenderedPage = () => {
  const markup = ReactDOMServer.renderToString(<App />)
  const withMarkup = `<div id="root">${markup}</div>`
  return BODY_CODE.replace('<div id="root"></div>', withMarkup)
}

const app = express()

app.use('/assets', express.static('assets'));

app.get('/*', (req, res) => {
  res.send(getRenderedPage())
})

app.listen(PORT, () => {
  console.log(`[APP] Started on ${PORT}`);
});