/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

//save the key-pair val.
export const saveState = (key, value) => {
  storage.set(key, JSON.stringify(value));
};

// load the val by key
export const loadState = key => {
  const serializedState = storage.getString(key);
  return serializedState ? JSON.parse(serializedState) : undefined;
};

const Main = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Main);
