import {Platform} from 'react-native';

const TEXT_COLOR = '#000';

export const TEXT_HEADING = {
  fontSize: 22,
  fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter-Bold',
  color: TEXT_COLOR,
};

export const TEXT_PARA_REG = {
  fontSize: 16,
  fontFamily: Platform.OS === 'ios' ? 'Inter-Regular' : 'Inter-Regular',
  color: TEXT_COLOR,
};

export const TEXT_PARA_MED = {
  fontSize: 16,
  fontFamily: Platform.OS === 'ios' ? 'Inter-Medium' : 'Inter-Medium',
  color: TEXT_COLOR,
};

export const TEXT_PARA_BOLD = {
  fontSize: 16,
  fontFamily: Platform.OS === 'ios' ? 'Inter-Bold' : 'Inter-Bold',
  color: TEXT_COLOR,
};

export const TEXT_PARA_MONO = {
  fontFamily: Platform.OS === 'ios' ? 'Inter-Regular' : 'Inter-Regular',
  color: TEXT_COLOR,
};

export const BUTTON_TEXT_SYNE = {
  fontFamily: Platform.OS === 'ios' ? 'Inter-Bold' : 'Inter-Bold',
  color: TEXT_COLOR,
  fontSize: 16,
};
