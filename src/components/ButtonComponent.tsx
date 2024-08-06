import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

export interface ButtonComponentProps {
  fitText?: boolean;
  child?: React.ReactNode;
  onPress?: () => void;
  bounce?: boolean;
  animationEffect?: any;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  text?: string;
  textStyles?: object;
  config?: any;
  applyGrad?: boolean;
  gradColors?: string[];
  gradAngle?: number;
  throttle?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  scaleFactor?: number;
  loader?: {
    color: string;
    size: number;
  };
  forwardedScaleValue?: any;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  onLongPress?: () => void;
  Gestures?: any;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  fitText,
  child,
  onPress,
  bounce,
  animationEffect,
  onPressIn,
  onPressOut,
  style,
  buttonContainerStyle,
  text,
  textStyles,
  config,
  applyGrad,
  gradColors = ['#000000', '#FFFFFF'],
  gradAngle = 0,
  throttle,
  icon,
  loading,
  scaleFactor = 1,
  loader = {
    color: '#000000',
    size: 20,
  },
  forwardedScaleValue,
  LeftIcon,
  RightIcon,
  onLongPress,
  Gestures,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.85);
  };

  const handleLongPress = () => {
    scale.value = withSpring(0.85);
    if (onLongPress) onLongPress();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      handleLongPress();
    },
    onEnd: () => {
      handlePressOut();
    },
  });

  const buttonContent = (
    <>
      {LeftIcon && <View style={{marginRight: 8}}>{LeftIcon}</View>}
      {loading ? (
        <ActivityIndicator color={loader.color} size={loader.size} />
      ) : (
        <>
          {icon}
          {text && <Text style={[styles.text, textStyles]}>{text}</Text>}
        </>
      )}
      {RightIcon && <View style={{marginLeft: 8}}>{RightIcon}</View>}
    </>
  );

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        bounce ? animatedStyle : {},
        buttonContainerStyle,
      ]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        disabled={loading} // Disable button during loading state
        {...Gestures}
        {...gestureHandler}>
        {applyGrad ? (
          <LinearGradient
            style={[styles.button, style]}
            colors={gradColors}
            angle={gradAngle}>
            {child || buttonContent}
          </LinearGradient>
        ) : (
          <>{child || buttonContent}</>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // Additional styles for container if needed
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ButtonComponent;
