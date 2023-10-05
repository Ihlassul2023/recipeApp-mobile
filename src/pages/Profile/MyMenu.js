import {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMyMenu, deleteMenu} from '../../storages/action/recipe';

const MyMenu = ({navigation}) => {
  const dispatch = useDispatch();
  const myMenu = useSelector(state => state.myMenu_Reducer);
  const [myRecipe, setMyRecipe] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getMyRecipe();
  }, []);
  useEffect(() => {
    !myMenu.isLoading && setMyRecipe(myMenu.data);
  }, [myMenu.isLoading]);
  const getMyRecipe = async () => {
    dispatch(getMyMenu());
  };
  const onRefresh = () => {
    setRefreshing(true);
    getMyRecipe();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const alertDeleteMenu = (menu, id) => {
    Alert.alert('Delete Menu', `ingin menghapus ${menu}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(deleteMenu(id))},
    ]);
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
        My Recipe
      </Text>
      {myMenu.isLoading ? (
        <ActivityIndicator color="rgba(239, 200, 26, 1)" size="large" />
      ) : (
        <FlatList
          data={myRecipe}
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
                        itemId: item.id,
                      })
                    }
                    style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 16}}>{item.category}</Text>
                </View>
              </View>
              <View style={{paddingRight: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(48, 192, 243, 1)',
                    padding: 15,
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('Menu', {itemId: item.id})
                  }>
                  <Text style={{margin: 0, textAlign: 'center'}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(245, 126, 113, 1)',
                    padding: 15,
                    borderRadius: 5,
                  }}
                  onPress={() => alertDeleteMenu(item.title, item.id)}>
                  <Text style={{textAlign: 'center'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyMenu;
