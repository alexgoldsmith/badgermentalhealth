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

// TODO: find out if I need to mock the getPosts hook

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<CBReplies route={mockRoute}/>)
    .toJSON();
  expect(component).toMatchSnapshot();
});