import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LoaderKit from 'react-native-loader-kit';

import Colors from '../../resources/colors/Colors';
import TopNavbar from '../components/TopNavbar';
import {RootStackParamList} from '../types/types';
type Props = NativeStackScreenProps<RootStackParamList, 'WebView'> & {
  customStyle?: any;
  onBack?: () => void;
  loaderColor?: string;
};

const WebViewScreen: React.FC<Props> = ({navigation, route, loaderColor}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    console.log('back btn pressed');
    navigation.goBack();
    return true;
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  const sourceURI = route?.params?.uri;
  const sourceName = route?.params?.sourceName;

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.appMainColor} />
      <TopNavbar
        back
        left={
          <>
            {sourceName ? (
              <Text style={{width: 1200, color: '#fff'}} numberOfLines={1}>
                {sourceName}
              </Text>
            ) : (
              ''
            )}
          </>
        }
        center={<></>}
        right={
          isLoading ? <Loader1 color={loaderColor || Colors.PURPLE} /> : <></>
        }
        containerStyle={{backgroundColor: '#252727'}}
        backStyle={{backgroundColor: '#252727'}}
        backButtonColor={'#fff'}
      />
      {/* {isLoading === true ? (
        <Loader2 />
      ) : ( */}
      <WebView
        source={{uri: sourceURI || 'https://joinjumbo.com/'}}
        domStorageEnabled={true}
        onLoad={onLoad}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

const Loader1 = ({color}: any) => {
  // Replace this with your loader component
  return (
    <LoaderKit
      style={{width: 50, height: 50}}
      name={'BallClipRotatePulse'}
      color={color}
    />
  );
};
const Loader2 = () => {
  // Replace this with your loader component
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'BallGridBeat'}
        color={Colors.darkGrey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewScreen;
