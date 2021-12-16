// https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest
import React from 'react';
import renderer from 'react-test-renderer';
import CBReplies from '../../Screens/CBReplies';

const mockRoute = {
    params: {
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

const mockNavigation = {
  addListener: function(demoString, demoFunc) {
  }
}

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<CBReplies navigation={mockNavigation} route={mockRoute}/>)
    .toJSON();
  expect(component).toMatchSnapshot();
});