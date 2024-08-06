import {ReactNode} from 'react';
import {GestureResponderEvent, TextStyle} from 'react-native';

export interface TextStyleProps {
  children: string | JSX.Element | ReactNode;
  color?: string;
  fontSize?: number;
  styling?: TextStyle;
  numberOfLines?: number;
  onPress?: (event: GestureResponderEvent) => void;
  center?: boolean;
  y?: number;
}
