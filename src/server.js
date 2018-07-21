import express from 'express'

import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'

import 'babel-polyfill'

const PORT = 3000;
const PAGE = fs.readFileSync('./index.html', 'utf-8')

// for prod in webpack is mode: 'production'
// for prod in SSR is this line
process.env.NODE_ENV = 'production'

// And for disable styles import on server
global.window = {}
global.window.IS_SSR = true

// initial state as example
global.window.__INITIAL_STATE__ = {
  isSSR: true,
  notes: []
}

const getRenderedPage = () => {
  const App = require('./components/App').default
  const markup = ReactDOMServer.renderToString(<App />)
  const withMarkup = injectMarkup(PAGE, markup)
  return injectInitialState(withMarkup)
}

const injectMarkup = (page, markup) => {
  const wrapped = `<div id="root">${markup}</div>`
  return page.replace('<div id="root"></div>', wrapped)
}

const injectInitialState = (page) => {
  const jsonState = JSON.stringify(global.window.__INITIAL_STATE__) 
  const initialState = `<script>
    window.__INITIAL_STATE__ = JSON.parse('${jsonState}')
  </script></head>`
  return page.replace('</head>', initialState)
}

const app = express()

app.use('/assets', express.static('assets'))
app.get('/*', (req, res) => {
  res.send(getRenderedPage())
})

app.listen(PORT, () => {
  console.log(`[APP] Started on ${PORT}`)
});