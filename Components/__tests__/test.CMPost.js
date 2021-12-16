
// https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest
import React from 'react';
import renderer from 'react-test-renderer';
import CMPost from '../../Screens/CMPost';

const mockNavigation = {
  addListener: function(demoString, demoFunc) {

  }
}

const mockRoute = {
    params: {
        mode: true,
        post:  {
            _id: 3484,
            Title: "Test Title",
            Author: "Test Author",
            Date: new Date(2021, 23, 7),
            Likes: 5,
            NumReplis: 0,
        }
    }
}

it('renders correctly with defaults', async() => {
  const component = await renderer
    .create(<CMPost navigation={mockNavigation} route={mockRoute}/>)
    .toJSON();
  expect(component).toMatchSnapshot();
});