// https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest
// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import CopingCard from '../CopingCard';

const mockCopingCard = {
    emotion: "Test emotion",
    text: "Test text",
}

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<CopingCard ccard = {mockCopingCard} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});