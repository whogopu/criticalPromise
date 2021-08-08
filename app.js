import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import timeout from 'connect-timeout';
import configureStore from './src/redux/configureStore'
import { fetchPageData } from './src/redux/actions'
import PromiseAllSettled from './src/utils'


const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');

// set global timeout
app.use(timeout('5s'));

// start the server
app.listen(process.env.PORT || 3000);

// server rendered home page
app.get('/', (req, res) => {
  let store = configureStore();

  const promises = store.dispatch(fetchPageData({ query: req.query }))

  // Promise.all(promises)
  PromiseAllSettled(promises, { critcalIndexes: [0] })
  .then((values) => {
    const { preloadedState, content } = ssr(store.getState())
    const response = template("Server Rendered Page", preloadedState, content)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response);
  })
  .catch(_ => res.send('Something went wrong'))
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
