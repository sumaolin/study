import axios from 'axios';
import {
  SIGN_UP_SIGN_UP_BEGIN,
  SIGN_UP_SIGN_UP_SUCCESS,
  SIGN_UP_SIGN_UP_FAILURE,
  SIGN_UP_SIGN_UP_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function signUp(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: SIGN_UP_SIGN_UP_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      console.log('request');
      console.log(args);

      const doRequest = axios.post('http://localhost:3001/api/user/signUp', args);
      doRequest.then(
        res => {
          dispatch({
            type: SIGN_UP_SIGN_UP_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: SIGN_UP_SIGN_UP_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSignUpError() {
  return {
    type: SIGN_UP_SIGN_UP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SIGN_UP_SIGN_UP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signUpPending: true,
        signUpError: null,
      };

    case SIGN_UP_SIGN_UP_SUCCESS:
      // The request is success
      return {
        ...state,
        signUpPending: false,
        signUpError: null,
      };

    case SIGN_UP_SIGN_UP_FAILURE:
      // The request is failed
      return {
        ...state,
        signUpPending: false,
        signUpError: action.data.error,
      };

    case SIGN_UP_SIGN_UP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signUpError: null,
      };

    default:
      return state;
  }
}
