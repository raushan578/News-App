import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {usePinnedNews} from '../hooks/useNewsCall';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {pinnedNewsAtom} from '../actions/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InterText} from './InterText';
import {useMmkvStorage} from '../storage/useStorage/useStorage';
import Colors from '../../resources/colors/Colors';

const PinnedNews: React.FC = () => {
  const {loading, savePinnedHeadlines} = usePinnedNews();
  const [data, setPinnedNewsData] = useRecoilState(pinnedNewsAtom);

  const navigation = useNavigation();

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('WebView', {
          uri: item?.url,
          sourceName: item?.source?.name,
        });
      }}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.description}>{item?.description}</Text>
    </TouchableOpacity>
  );

  const {removeItem} = useMmkvStorage();
  const handleClearPinnedData = () => {
    removeItem('pinnedHeadlines');
    setPinnedNewsData([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InterText.Bold style={[styles.headerText]} color="#000">
          Pinned News
        </InterText.Bold>
        <TouchableOpacity onPress={handleClearPinnedData}>
          <Ionicons
            name="trash-bin"
            size={24}
            color="red"
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.appMainColor} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.url || ''}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pinned news available</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    textDecorationLine: 'underline',
    // color: '#1b1b1b',
    alignSelf: 'flex-start',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});

export default PinnedNews;
