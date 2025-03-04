import React, {createRef} from 'react';
import {render} from '@testing-library/react-native';
import AnimatedAnotherView from '../src/AnotherView';

const getDefaultStyle = () => ({
  width: 100,
  height: 100,
  opacity: 0,
});

jest.useFakeTimers();

describe('issue3', () => {
  test('toHaveAnimatedStyle should work', async () => {
    const {getByTestId} = render(
      <AnimatedAnotherView style={{backgroundColor: 'red', zIndex: 5}} />,
    );
    const view = getByTestId('animated-view');

    const style = getDefaultStyle();

    expect(view).toHaveAnimatedStyle(style);

    jest.advanceTimersByTime(100);
  });
});
