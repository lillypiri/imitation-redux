const { compose, createStore, applyMiddleware } = require('redux');
const Immutable = require('immutable');
const Thunk = require('redux-thunk').default;
const Reducer = require('./reducers');

let initial_state = Immutable.Map({});

const middleware = compose(applyMiddleware(Thunk));
const store = createStore(Reducer, initial_state, middleware);

module.exports = store;
