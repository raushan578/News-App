import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useTopHeadlines} from '../../hooks/useNewsCall';
import {InterText} from '../../components/InterText';
import {screenWidth} from '../../utils/DeviceInfo';
import {Images} from '../../constants/Images';

const TopHeadLines = () => {
  const {headlines, loading} = useTopHeadlines();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InterText.Bold
        styling={{
          fontWeight: '700',
          fontSize: 20,
          textDecorationLine: 'underline',
          color: '#1b1b1b',
          marginVertical: 12,
          alignSelf: 'flex-start',
        }}>
        Top Headlines
      </InterText.Bold>
      <Carousel
        loop
        width={300}
        height={200}
        autoPlay
        data={headlines}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <View style={styles.carouselItem}>
            <Image
              source={{
                uri: !(item?.urlToImage == null || item?.urlToImage == '')
                  ? item?.urlToImage
                  : 'https://designmodo.com/wp-content/uploads/2014/11/page-load.jpg',
              }}
              style={styles.image}
            />
            <InterText.Medium
              color="#000"
              numberOfLines={2}
              style={styles.title}>
              {item.title}
            </InterText.Medium>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: 280,
    width: screenWidth - 32,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    // margin: 8,
    // width: screenWidth - 32,
    alignSelf: 'center',
    // marginLeft: 50,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
});

export default TopHeadLines;
