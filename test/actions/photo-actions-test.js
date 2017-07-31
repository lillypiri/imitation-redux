const { test } = require('ava');
const { mockStore, mockURL, unmockURLs, mockDOM, unmockDOM } = require('imitation');
const Immutable = require('immutable');

var PhotoActions;
var store;

test.beforeEach(t => {
    mockDOM();

    PhotoActions = require('../../src/actions/photo-actions');
    store = mockStore(Immutable.fromJS({
        photo: {
            is_loading: false,
            data: {}
        }
    }));
});


test.afterEach(t => {
    unmockURLs();
    unmockDOM();
});


test('It can load a photo from NASA API', t => {
    mockURL('https://api.nasa.gov').get('/planetary/apod?api_key=DEMO_KEY').reply(200, {
        date: "2017-07-19",
        explanation: "What created this unusual hill on Mars? Its history has become a topic of research, but its shape and two-tone structure makes it one of the more unusual hills that the robotic Curiosity rover on Mars has rolled near. Dubbed Ireson Hill, the mound rises about 5 meters high and spans about 15 meters across. Ireson Hill is located on the Bagnold Dune field on the slope of Mount Sharp in Gale Crater on Mars. The featured 41-image panorama has been horizontally compressed to include the entire hill. The image was taken on February 2 and released last week. Because Mars is moving behind the Sun as seen from the Earth, NASA will soon stop sending commands to its Martian orbiters and rovers until about August 1. Explore the Universe: Random APOD Generator",
        hdurl: "https://apod.nasa.gov/apod/image/1707/IresonHill_Curiosity_6720.jpg",
        media_type: "image",
        service_version: "v1",
        title: "Ireson Hill on Mars",
        url: "https://apod.nasa.gov/apod/image/1707/IresonHill_Curiosity_960.jpg"
    });

// This runs the action and then we can check what other actions will run.
    return store.dispatch(PhotoActions.loadPhoto()).then(() => {
        let actions = store.getActions();

        t.is(actions[0].type, PhotoActions.LOAD_PHOTO);
        t.is(actions[1].type, PhotoActions.LOADED_PHOTO);
    });
});