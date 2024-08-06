import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
} from 'react-native';
import {useNewsCalls, usePinnedNews} from '../../hooks/useNewsCall';
import {useNavigation} from '@react-navigation/native';
import {InterText} from '../../components/InterText';
import Row from '../../components/Row';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnUI,
  withTiming,
} from 'react-native-reanimated';
import {MMKV} from 'react-native-mmkv';
import {storage, useMmkvStorage} from '../../storage/useStorage/useStorage';
import {Article} from '../../interfaces/Articles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopHeadLines from './TopHeadLines';
import Colors from '../../../resources/colors/Colors';
import PinnedNews from '../../components/PinnedNews';
import {useRecoilState, useRecoilValue} from 'recoil';
import {pinnedNewsAtom} from '../../actions/atoms';
import {showMessage} from 'react-native-flash-message';
import {useDisableBackForDuration} from '../../hooks/useHardwarePress';

const Home = () => {
  //   xxxxxxxx.... Handle back press here ....xxxxxxxxx

  const backPressCount = useRef(0);
  const timeoutRef = useRef(null);

  const handleBackPress = useCallback(() => {
    showMessage({
      message: 'Double tap to exit',
      type: 'info',
    });

    backPressCount.current += 1;

    if (backPressCount.current === 2) {
      BackHandler.exitApp();
      return true;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      backPressCount.current = 0;
    }, 2000);

    return true;
  }, []);

  useDisableBackForDuration(2000);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleBackPress]);

  const {headlines: initialHeadlines, loading, fetchData} = useNewsCalls();
  const [headlines, setHeadlines] = useState(initialHeadlines);
  const navigation = useNavigation();
  const {setItem, getItem} = useMmkvStorage();
  const [pinnedNewsData, setPinnedNewsData] = useRecoilState(pinnedNewsAtom);

  const reversedData = [...pinnedNewsData].reverse();
  const translationX = useSharedValue(-50);

  const animateText = (reset = false) => {
    if (reset) {
      translationX.value = withTiming(0, {damping: 2, stiffness: 80});
    } else {
      translationX.value = withTiming(100, {damping: 2, stiffness: 80});
    }
  };

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });

  useEffect(() => {
    // Animate text from -50 to 0 on page load
    animateText(true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset animation when navigating back to the screen
      animateText(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleSwipe = useCallback(
    (direction: string, item: Article) => {
      if (direction === 'left') {
        console.log('Delete:', item.url);
        const updatedHeadlines = headlines.filter(
          (headline: Article) => headline.url !== item.url,
        );
        setHeadlines(updatedHeadlines);
        setItem('headlines', updatedHeadlines);
        showMessage({
          message: 'Headline Deleted',
          type: 'danger',
        });
      } else if (direction === 'right') {
        let pinnedItems = storage.getString('pinnedHeadlines');

        const pinnedArray = pinnedItems ? JSON.parse(pinnedItems) : [];

        const isAlreadyPinned = pinnedArray.some(
          (pinnedItem: Article) => pinnedItem.url === item.url,
        );

        if (!isAlreadyPinned) {
          pinnedArray.push(item);
          savePinnedHeadlines(pinnedArray);

          storage.set('pinnedHeadlines', JSON.stringify(pinnedArray));

          pinnedItems = storage.getString('pinnedHeadlines');

          console.error('Pin:', pinnedItems?.length);

          showMessage({
            message: 'Pinned Success',
            type: 'success',
          });
        } else {
          console.log('Item already pinned:', item.url);
          showMessage({
            message: 'Headline already pinned',
            type: 'warning',
          });
        }
      }
    },
    [headlines, setHeadlines, setItem],
  );

  useEffect(() => {
    setHeadlines(initialHeadlines);
  }, [initialHeadlines]);

  const renderRightActions = () => (
    <Row styling={styles.rightAction} enableColumn>
      <Pressable onPress={() => handleSwipe('right', item)}>
        <MCIcon color={'#fff'} size={40} name="pin" style={{marginLeft: 5}} />
        <InterText.Medium style={styles.actionText}>Pin News</InterText.Medium>
      </Pressable>
    </Row>
  );

  const renderLeftActions = () => (
    <Row styling={styles.leftAction} enableColumn>
      <Icon color={'#fff'} size={40} name="delete" />
      <InterText.Medium style={styles.actionText}>Delete</InterText.Medium>
    </Row>
  );

  const {
    headlines: pinnedData,
    loading: isPinnedLoading,
    savePinnedHeadlines,
  } = usePinnedNews();

  const renderItem = ({item}: {item: Article}) => (
    <Swipeable
      renderRightActions={() => renderRightActions()}
      renderLeftActions={() => renderLeftActions()}
      onSwipeableLeftOpen={() => handleSwipe('left', item)}
      onSwipeableRightOpen={() => handleSwipe('right', item)}>
      <Pressable
        onPress={() => {
          animateText();
          navigation.navigate('WebView', {
            uri: item.url,
            sourceName: item.source.name,
          });
        }}>
        <View style={styles.itemContainer}>
          <Row styling={{justifyContent: 'flex-start', alignItems: 'stretch'}}>
            {item.urlToImage ? (
              <Image source={{uri: item.urlToImage}} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}

            <Row styling={styles.textContainer} enableColumn gap={2}>
              <Animated.View style={[{width: '100%'}, animatedTextStyle]}>
                <InterText.Bold
                  styling={{
                    fontSize: 14,
                    width: '100%',
                    padding: 3,
                    fontWeight: '700',
                  }}
                  numberOfLines={6}
                  color="#000">
                  {item.title}
                </InterText.Bold>
              </Animated.View>

              <InterText.Regular
                styling={{alignSelf: 'flex-start'}}
                numberOfLines={3}
                color="#888">
                {item.author}
              </InterText.Regular>

              <InterText.Regular
                styling={{alignSelf: 'flex-start'}}
                numberOfLines={1}
                color="#1b1b1b">
                Date - {new Date(item.publishedAt).toLocaleDateString()}
              </InterText.Regular>
            </Row>
          </Row>

          <InterText.Regular
            numberOfLines={3}
            color="#555"
            style={styles.description}>
            {item.description}
          </InterText.Regular>
        </View>
      </Pressable>
    </Swipeable>
  );

  const rotation = useSharedValue(0);

  const rotateIcon = () => {
    rotation.value = withTiming(360, {duration: 300}, () => {
      rotation.value = 0;
    });
    fetchData(true);
  };

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <ScrollView style={{flex: 1}}>
      <TopHeadLines />
      {pinnedNewsData?.length > 0 && !isPinnedLoading && <PinnedNews />}
      <GestureHandlerRootView style={styles.container}>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <InterText.Bold
            styling={{
              fontWeight: '700',
              fontSize: 20,
              textDecorationLine: 'underline',
              color: '#1b1b1b',
              marginVertical: 12,
            }}>
            Latest News
          </InterText.Bold>

          <Pressable style={{marginRight: 12}} onPress={rotateIcon}>
            <Animated.View style={rotateStyle}>
              <MCIcon name="refresh" color={Colors.appMainColor} size={25} />
            </Animated.View>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={headlines}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.url}
            renderItem={renderItem}
          />
        )}
      </GestureHandlerRootView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  description: {
    marginTop: 10,
  },
  rightAction: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    zIndex: 1000,
    margin: 10,
    borderRadius: 12,
    height: '70%',
  },
  leftAction: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    zIndex: 1000,
    margin: 10,
    borderRadius: 12,
    height: '70%',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Home;
