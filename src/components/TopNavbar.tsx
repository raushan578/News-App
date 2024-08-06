import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenWidth} from '../utils/DeviceInfo';
import ButtonComponent from './ButtonComponent';

interface TopNavbarProps {
  containerStyle?: ViewStyle;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  backStyle?: ViewStyle;
  back?: boolean;
  backButtonColor?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  left,
  center,
  right,
  back,
  containerStyle,
  backStyle,
  backButtonColor,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      {back && (
        <View style={[styles.back, backStyle]}>
          <ButtonComponent
            onPress={handleBack}
            child={
              <Icon
                name="arrow-left"
                color={backButtonColor ? backButtonColor : '#000'}
                size={25}
              />
            }
          />
        </View>
      )}
      <View
        style={[
          styles.container,
          containerStyle,
          {width: back ? screenWidth * 0.9 : screenWidth},
        ]}>
        {left && <View style={styles.left}>{left}</View>}
        {center && <View style={styles.center}>{center}</View>}
        {right && <View style={styles.right}>{right}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
  },
  back: {
    width: screenWidth * 0.12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default TopNavbar;
