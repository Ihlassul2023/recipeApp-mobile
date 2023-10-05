import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {getLike} from '../../storages/action/likeSave';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
const LikeRecipe = ({navigation}) => {
  const dataLike = useSelector(state => state.getLikeReducer);
  const dispatch = useDispatch();
  const [like, setLike] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    !dataLike.isLoading && setLike(dataLike.data);
  }, [dataLike.isLoading]);

  const getData = () => {
    dispatch(getLike());
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={{marginHorizontal: 20, flex: 1, marginTop: 100}}>
      <Text
        style={{
          color: 'rgba(239, 200, 26, 1)',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Recipe Like
      </Text>
      {dataLike.isLoading ? (
        <ActivityIndicator color="rgba(239, 200, 26, 1)" size="large" />
      ) : (
        <FlatList
          data={like}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 50,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.photo}}
                  style={{width: 100, height: 100, borderRadius: 5}}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                    width: 100,
                  }}>
                  <Text
                    onPress={() =>
                      navigation.navigate('DetailMenu', {
                        screen: 'Home',
                        itemId: item.recipe_id,
                      })
                    }
                    style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 16}}>{item.category}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assets/images/user.png')} />
                    <Text>{item.author}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LikeRecipe;
