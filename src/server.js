import express from 'express'

import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import APIClient from './helpers/apiClient'

import 'babel-polyfill'

const PORT = 3000;
const PAGE = fs.readFileSync('./index.html', 'utf-8')
const API = new APIClient({
  host: 'localhost',
  port: 3001,
})

/*
pipline: 
1. load without initial state
2. non global vars for initial state
3. handle get request
4. create initial state for request
5. render App with global initial state
6. inject this into page
7. done?
*/

// for prod in webpack is mode: 'production'
// for prod in SSR is this line
process.env.NODE_ENV = 'production'

// initial state as example
global.window = {}

const loadInitinalState = async () => {
  const notes = await API.getNotes()
  global.window.__INITIAL_STATE__ = {
    notes: notes
  }
}

const getRenderedPage = async () => {
  const App = require('./components/App').default
  const renderWithWindow = ReactDOMServer.renderToString.bind({ test: 123 });
  const markup = renderWithWindow(<App />)
  const withMarkup = injectMarkup(PAGE, markup)

  await loadInitinalState()

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
app.get('/*', async (req, res) => {
  res.send(await getRenderedPage())
})

app.listen(PORT, () => {
  console.log(`[APP] Started on ${PORT}`)
});