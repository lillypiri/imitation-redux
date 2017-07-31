const React = require('react');
const { test } = require('ava');

const Sinon = require('sinon');

const { renderToStaticMarkup } = require('react-dom/server');
const { render } = require('react-dom');
const { Simulate } = require('react-dom/test-utils');
const { mockDOM, unmockDOM, mockAssets, unmockAssets } = require('imitation');

var HomeLayout;

test.beforeEach(t => {
    mockDOM(); // only needed if using `window` or `document` in a component
    mockAssets(); // only needed if using images or css modules in a component
    HomeLayout = require('../../src/components/home-layout').HomeLayout; // require the non-redux wrapped component
});


test.afterEach(t => {
    unmockDOM();
    unmockAssets();
});


test("it renders", t => {
    var html = renderToStaticMarkup(<HomeLayout />);
    t.true(html.includes("Hello"));
});
