import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  gap?: number;
  styling?: StyleProp<ViewStyle>;
  enableColumn?: boolean;
  between?: boolean;
}

const Row = ({
  children,
  gap = 12,
  styling,
  enableColumn = false,
  between = false,
}: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: enableColumn ? 'column' : 'row',
          alignItems: 'center',
          ...(between ? {justifyContent: 'space-between'} : {}),
          gap,
        },
        StyleSheet.flatten(styling),
      ]}>
      {children}
    </View>
  );
};

export default Row;
