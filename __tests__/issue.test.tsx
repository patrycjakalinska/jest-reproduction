import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {View} from 'react-native';
import {
  useAnimatedReaction,
  runOnJS,
  withTiming,
  useSharedValue,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

const TestComponent = ({
  headerHeight,
  searchBarHeight,
  scrollY,
  isBackgroundDark,
  setBarStyle,
}: any) => {
  const searchBarAnimation = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return headerHeight && searchBarHeight
        ? scrollY.value > headerHeight - searchBarHeight
        : false;
    },
    (nextValue, prevValue) => {
      if (nextValue === prevValue) return;
      // if we desire to cancel animation when this if statement is true we need to put it in the brackets,
      // if we leave it this way the animation won't start and the test would fail
      // cancelAnimation(searchBarAnimation);

      searchBarAnimation.value = withTiming(nextValue ? 1 : 0, {
        duration: 160,
        easing: Easing.out(Easing.cubic),
      });

      runOnJS(setBarStyle)(
        nextValue === false && isBackgroundDark
          ? 'light-content'
          : 'dark-content',
      );
    },
  );

  // @ts-ignore
  return (
    <View
      testID="search-bar"
      // @ts-ignore
      backgroundTransparencyAnimation={searchBarAnimation}
    />
  );
};

describe('issue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should update animated value after timing', () => {
    const mockSetBarStyle = jest.fn();
    const scrollY = {value: 100};
    const headerHeight = 21;
    const searchBarHeight = 37;
    const isBackgroundDark = true;

    render(
      <TestComponent
        headerHeight={headerHeight}
        searchBarHeight={searchBarHeight}
        scrollY={scrollY}
        isBackgroundDark={isBackgroundDark}
        setBarStyle={mockSetBarStyle}
      />,
    );

    jest.advanceTimersByTime(160);

    expect(
      screen.getByTestId('search-bar').props.backgroundTransparencyAnimation
        .value,
    ).toBe(1);
  });
});
