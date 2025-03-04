import React, {forwardRef, useEffect} from 'react';
import {ViewProps} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnotherView = forwardRef<Animated.View, ViewProps>((props, ref) => {
  const opacity = useSharedValue(0);
  const {style, ...rest} = props;

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 100});
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const combined = [style];

  return (
    <Animated.View
      testID="animated-view"
      ref={ref}
      style={[{width: 100, height: 100}, animatedStyle, combined]}
      {...rest}
    />
  );
});

const AnimatedAnotherView = Animated.createAnimatedComponent(AnotherView);

export default AnimatedAnotherView;
