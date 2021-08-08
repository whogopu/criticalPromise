
import axios from 'axios'

export const STORE_PAGE_DATA = 'STORE_PAGE_DATA'
export const STORE_WIDGET_DATA = 'STORE_WIDGET_DATA';

export function fetchPageData(paramsSet) {
  return (dispatch, getState) => {
    let promiseArr = [];

    promiseArr.push(fetchBookDetails({ ...paramsSet, dispatch }))

    promiseArr = promiseArr.concat(getWidgetsData(paramsSet, dispatch))

    // promiseArr
    // [
    //   fetch(`http://localhost:8080/book/details/123`),
    //   fetch(`http://localhost:8080/api/api2`),
    //   fetch(`http://localhost:8080/api/api3`),
    // ]
    return promiseArr;
  }
}

export function fetchBookDetails({ query, dispatch }) {
  const { delay1 = 0 } = query;

  return axios({ url: `http://localhost:8080/book/details/123?delay1=${delay1}`, method: 'GET', timeout: 3000 })
    .then(res => {
      const { data } = res;
      dispatch({ type: STORE_PAGE_DATA, data })
      return Promise.resolve()
    })
    .catch(error => {
      console.log('erro2', error)
      return Promise.reject()
    })
}

export function fetchDataFromFailingService({ apiParams, key, dispatch }) {

  // let url = 'http://localhost:8080/api/api2'
  let url = `http://localhost:8080/api${apiParams}`;

  return axios({ url, method: 'GET', timeout: 2000 })
    .then(res => {
      const { data } = res;
      dispatch({ type: STORE_WIDGET_DATA, key, data })
      return Promise.resolve();
    })
    .catch(error => {
      console.log('erro1', error)
      return Promise.reject();
    })
}

function getWidgetsData(paramsSet, dispatch) {

  let promiseArr = []

  const { query: { call = '', delay2 = 0, delay3 = 0, delay4 = 0 } = {} } = paramsSet;

  if (!call) return promiseArr;

  (call || '').split(',').forEach(key => {
    let api = '';
    let delay = '';

    switch (key) {
      case 'api2': api = key; delay = `delay2=${delay2}`; break;
      case 'api3': api = key; delay = `delay3=${delay3}`; break;
      case 'api4': api = key; delay = `delay4=${delay4}`; break;
      default: api = key; delay = `delay2=${delay2}`; break;
    }

    let apiParams = `/${api}?${delay}`
    promiseArr.push(fetchDataFromFailingService({ apiParams, key, dispatch }))
  })

  return promiseArr;
}



