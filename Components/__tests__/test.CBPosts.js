// https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest
import React from 'react';
import renderer from 'react-test-renderer';
import CBPosts from '../../Screens/CBPosts';

// TODO: find out if I need to mock the getPosts hook
const mockNavigation = {
  addListener: function(demoString, demoFunc) {

  }
}

it('renders correctly with defaults', async() => {
  const component = await renderer
    .create(<CBPosts navigation = {mockNavigation}/>)
    .toJSON();
  expect(component).toMatchSnapshot();
});