import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {GestureResponderEvent, Text, TextStyle} from 'react-native';
import {
  TEXT_PARA_REG,
  TEXT_PARA_BOLD,
  TEXT_PARA_MED,
} from '../constants/TextStyles';
import {TextStyleProps} from '../interfaces/TextInterface';

export const InterText = {
  Regular: ({
    children,
    color = '#E7E1F5',
    fontSize = 14,
    styling,
    numberOfLines = 1,
    onPress = undefined,
    center = false,
    y = 0,
  }: TextStyleProps) => (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        center && {textAlign: 'center'},
        {
          ...TEXT_PARA_REG,
          color,
          fontSize,
          transform: [{translateY: y}],
          ...StyleSheet.flatten(styling),
        },
      ]}>
      {children}
    </Text>
  ),
  Medium: ({
    children,
    color = '#E7E1F5',
    fontSize = 14,
    styling,
    numberOfLines = 1,
    onPress = undefined,
    center = false,
    y = 0,
  }: Props) => (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        center && {textAlign: 'center'},
        {
          ...TEXT_PARA_MED,
          color,
          fontSize,
          transform: [{translateY: y}],
          ...styling,
        },
      ]}>
      {children}
    </Text>
  ),
  Bold: ({
    children,
    color = '#E7E1F5',
    fontSize = 14,
    styling,
    numberOfLines = 1,
    onPress = undefined,
    center = false,
  }: Props) => (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        center && {textAlign: 'center'},
        {
          ...TEXT_PARA_BOLD,
          color,
          fontSize,
          ...styling,
        },
      ]}>
      {children}
    </Text>
  ),
};
