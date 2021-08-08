import { STORE_PAGE_DATA, STORE_WIDGET_DATA } from './actions';

function apps(state = {  }, action) {
  switch (action.type) {
    case STORE_PAGE_DATA: {
      return {
        ...state,
        pageData: action.data
      }
    }
    case STORE_WIDGET_DATA: {
      return {
        ...state,
        [action.key] : action.data
      }
    }
    default:
      return state
  }
}

export default apps
