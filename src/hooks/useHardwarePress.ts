import {useFocusEffect} from '@react-navigation/native';
import {DependencyList, useCallback, useEffect, useRef} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';

export const useHardwareBackPress = (
  cb: () => boolean | undefined,
  deps: DependencyList = [],
) => {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', cb);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', cb);
      };
    }, deps),
  );
};

export function useHardwareBackPressCB(cb: () => void) {
  useHardwareBackPress(() => {
    cb();
    return true;
  });
}

export function useDisableBackForDuration(duration: number = 2000) {
  let backHandler = useRef<NativeEventSubscription | null>(null);
  let lastBackPressTime = useRef(0);

  function handleBackEvent() {
    let t = Date.now();
    let diff = lastBackPressTime.current
      ? t - lastBackPressTime.current
      : duration;

    if (diff < duration) return false;

    lastBackPressTime.current = t;
    return true;
  }

  useEffect(() => {
    backHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackEvent,
    );
    return backHandler.current.remove;
  }, []);
}

// FOR CLASS COMP...
export function DisableBackPressForDuration({duration}: {duration?: number}) {
  useDisableBackForDuration(duration);
  return null;
}
