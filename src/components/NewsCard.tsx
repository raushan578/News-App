import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NewsCard = ({item, onPress}) => {
  const scale = useSharedValue(1);

  const renderRightActions = () => {
    const animatedStyle = useAnimatedStyle(
      () => ({
        transform: [{scale: withSpring(scale.value)}],
      }),
      [scale.value],
    );

    return (
      <Animated.View style={[styles.rightAction, animatedStyle]}>
        <Icon name="star" size={30} color="white" />
        <Text style={styles.actionText}>Pin</Text>
      </Animated.View>
    );
  };

  const renderLeftActions = () => {
    const animatedStyle = useAnimatedStyle(
      () => ({
        transform: [{scale: withSpring(scale.value)}],
      }),
      [scale.value],
    );

    return (
      <Animated.View style={[styles.leftAction, animatedStyle]}>
        <Icon name="delete" size={30} color="white" />
        <Text style={styles.actionText}>Delete</Text>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableWillOpen={() => (scale.value = 1.2)}
      onSwipeableWillClose={() => (scale.value = 1)}>
      <Pressable onPress={onPress}>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.urlToImage}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.date}>
              Date - {new Date(item.publishedAt).toLocaleDateString()}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    width: '50%',
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  author: {
    fontSize: 12,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#1b1b1b',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    width: 100,
    height: '100%',
  },
  rightAction: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 100,
    height: '100%',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default NewsCard;
