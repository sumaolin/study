import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SIGN_IN_POST_SIGN_IN_BEGIN,
  SIGN_IN_POST_SIGN_IN_SUCCESS,
  SIGN_IN_POST_SIGN_IN_FAILURE,
  SIGN_IN_POST_SIGN_IN_DISMISS_ERROR,
} from '../../../../src/features/sign-in/redux/constants';

import {
  postSignIn,
  dismissPostSignInError,
  reducer,
} from '../../../../src/features/sign-in/redux/postSignIn';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sign-in/redux/postSignIn', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postSignIn succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postSignIn())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SIGN_IN_POST_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', SIGN_IN_POST_SIGN_IN_SUCCESS);
      });
  });

  it('dispatches failure action when postSignIn fails', () => {
    const store = mockStore({});

    return store.dispatch(postSignIn({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SIGN_IN_POST_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', SIGN_IN_POST_SIGN_IN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostSignInError', () => {
    const expectedAction = {
      type: SIGN_IN_POST_SIGN_IN_DISMISS_ERROR,
    };
    expect(dismissPostSignInError()).toEqual(expectedAction);
  });

  it('handles action type SIGN_IN_POST_SIGN_IN_BEGIN correctly', () => {
    const prevState = { postSignInPending: false };
    const state = reducer(
      prevState,
      { type: SIGN_IN_POST_SIGN_IN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postSignInPending).toBe(true);
  });

  it('handles action type SIGN_IN_POST_SIGN_IN_SUCCESS correctly', () => {
    const prevState = { postSignInPending: true };
    const state = reducer(
      prevState,
      { type: SIGN_IN_POST_SIGN_IN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postSignInPending).toBe(false);
  });

  it('handles action type SIGN_IN_POST_SIGN_IN_FAILURE correctly', () => {
    const prevState = { postSignInPending: true };
    const state = reducer(
      prevState,
      { type: SIGN_IN_POST_SIGN_IN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postSignInPending).toBe(false);
    expect(state.postSignInError).toEqual(expect.anything());
  });

  it('handles action type SIGN_IN_POST_SIGN_IN_DISMISS_ERROR correctly', () => {
    const prevState = { postSignInError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SIGN_IN_POST_SIGN_IN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postSignInError).toBe(null);
  });
});

