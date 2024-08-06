import React from 'react';
import {GestureResponderEvent, ViewStyle} from 'react-native';

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
