// A reducer is simply a function that takes `state` and an `action` and returns a new `state`
const { reducer } = require('suddenly-redux');
const Immutable = require('immutable');
const PhotoActions = require('../actions/photo-actions');


// Immutable stops the state from mutating.
const initial_state = Immutable.fromJS({
    is_loading: false,
    data: {}
});


module.exports = reducer(initial_state, {
    [PhotoActions.LOAD_PHOTO]: (state, action) => {
        return state.merge({
            is_loading: true
        });
    },


    [PhotoActions.LOADED_PHOTO]: (state, action) => {
        return state.merge({
            is_loading: false,
            data: action.payload
        });
    }
});
