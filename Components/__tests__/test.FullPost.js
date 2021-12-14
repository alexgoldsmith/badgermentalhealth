// https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest
import React from 'react';
import renderer from 'react-test-renderer';
import FullPost from '../FullPost';

const mockPost = {
    _id: 3484,
    Title: "Test Title",
    Author: "Test Author",
    Date: new Date(2021, 23, 7),
    Likes: 5,
    NumReplis: 0,
}

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<FullPost post={mockPost}/>)
    .toJSON();
  expect(component).toMatchSnapshot();
});