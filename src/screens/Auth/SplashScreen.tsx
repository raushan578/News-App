import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../constants/Images';
import {screenWidth, screenHeight} from '../../utils/DeviceInfo';
import Colors from '../../../resources/colors/Colors';

const {screenWidth: SCREEN_WIDTH, screenHeight: SCREEN_HEIGHT} = {
  screenWidth,
  screenHeight,
};

const SplashScreen = () => {
  const navigation = useNavigation();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    scale.value = withTiming(
      150 / Math.min(SCREEN_WIDTH, SCREEN_HEIGHT),
      {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      },
      finished => {
        if (finished) {
          runOnJS(navigateToHome)();
        }
      },
    );
  }, []);

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Images[0].logo}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appMainColor,
  },
  logo: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default SplashScreen;
