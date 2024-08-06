import DeviceInfo from 'react-native-device-info';
import {Platform, Dimensions} from 'react-native';

export async function getDeviceUID() {
  return new Promise(async resolve => {
    let getDeviceUID = await DeviceInfo.getUniqueId().catch(e => {
      console.log(`Failed to get the deviceUID : ERROR : ${e}`);
    });
    let deviceUID = '';
    try {
      getDeviceUID = JSON.parse(getDeviceUID);
      deviceUID =
        typeof getDeviceUID === 'object' ? getDeviceUID._j : getDeviceUID;
    } catch (e) {
      deviceUID =
        typeof getDeviceUID === 'object' ? getDeviceUID._j : getDeviceUID;
    }
    resolve(deviceUID);
  });
}

export const DeviceData = {
  deviceUID: getDeviceUID(),
  installReferrer: DeviceInfo.getInstallReferrer(),
  carrier: DeviceInfo.getCarrier(),
  manufacturer: DeviceInfo.getManufacturer(),
  ipAddress: DeviceInfo.getIpAddress(),
  model: DeviceInfo.getModel(),
  firstInstallTime: DeviceInfo.getFirstInstallTime(),
  androidVersion: DeviceInfo.getApiLevel(),
  hasNotch: DeviceInfo.hasNotch(),
  isEmulator: DeviceInfo.isEmulatorSync(),
};
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const APP_TYPE = Platform.OS === 'ios' ? 'ios' : 'android';

export async function logEventAnalytics(
  eventName: string,
  eventData: Record<string, any> = {},
) {
  try {
    const response = await analytics().logEvent(
      eventName.replace(/[^a-z0-9]/gi, '_').slice(-40),
      eventData,
    );
    console.log(`Event logged: ${eventName}`, eventData);
    console.log('Firebase Analytics response:', response);
  } catch (e) {
    console.error(`Failed to log event: ${eventName}, ERROR: ${e}`);
  }
}
