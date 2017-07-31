require('es6-promise/auto');
require('isomorphic-fetch');

const Immutable = require('immutable');
const { constants } = require('suddenly-redux');

// action types
const Actions = constants([
    'LOAD_PHOTO',
    'LOADED_PHOTO'
]);


Actions.loadPhoto = () => {
    return (dispatch, getState) => {
      // The two following lines stops this action from running again while it is already running.
        let state = getState();
        if (state.getIn(['photo', 'is_loading'])) return;
        // action creator
        dispatch({ type: Actions.LOAD_PHOTO });
        // preparing/fetching action payload
        return fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(r => r.json()).then(photo => {
            photo = Immutable.fromJS(photo);
            dispatch(Actions.loadedPhoto(photo));
        }).catch(error => {
            console.log('Error:', error)
        });
    }
};

// This is the "action creator"
Actions.loadedPhoto = (payload) => {
    return {
        type: Actions.LOADED_PHOTO,
        payload
    };
};


module.exports = Actions;
