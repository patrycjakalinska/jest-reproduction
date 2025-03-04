import React, {createRef} from 'react';
import {render} from '@testing-library/react-native';
import Animated, {getAnimatedStyle} from 'react-native-reanimated';
import AnimatedEnhancedView from '../src/EnhancedView';

jest.useFakeTimers();

describe('issue2', () => {
  test('should apply the animated style correctly', async () => {
    const ref = createRef<Animated.View>();
    const {getByTestId} = render(
      <AnimatedEnhancedView ref={ref} style={{backgroundColor: 'red'}} />,
    );
    const view = getByTestId('animated-view');

    let animatedStyle = getAnimatedStyle(view);
    expect(animatedStyle.opacity).toBe(0);
    expect(animatedStyle.opacity).toBe(0);

    jest.advanceTimersByTime(100);

    animatedStyle = getAnimatedStyle(view);
    expect(animatedStyle.opacity).toBe(1);
  });
});
