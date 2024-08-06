import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './NavigationHandler/StackNavigator';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';
import SplashScreen from 'react-native-splash-screen';
import Colors from './resources/colors/Colors';
import FlashMessage from 'react-native-flash-message';

function App() {
  React.useEffect(() => {
    SplashScreen?.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Colors.appMainColor} />
      <RecoilRoot>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </RecoilRoot>
      <FlashMessage position="bottom" />
    </>
  );
}

export default App;
