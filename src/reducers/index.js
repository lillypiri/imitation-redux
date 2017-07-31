const { combineReducers } = require('redux-immutable');
// In a normal app, you will combine many reducers, here we are just using one.
module.exports = combineReducers({
    photo: require('./photo-reducer')
});
