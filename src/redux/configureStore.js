import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'


export default function configureStore(preloadedState) {
  let store = null;

  if (typeof window !== "undefined" && window.document) {
    store = createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(
          thunkMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
          : f => f
      )
    )
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunkMiddleware),
    )
  }
  return store;
}
