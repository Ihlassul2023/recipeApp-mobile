import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {getMenu} from '../../storages/action/recipe';
import {useDispatch, useSelector} from 'react-redux';

const PopularMenu = ({navigation}) => {
  const [recipes, setRecipes] = useState(null);
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menuReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('DESC');
  useEffect(() => {
    getMenuHandle();
  }, [page, sort]);
  useEffect(() => {
    !menu.isLoading && setRecipes(menu.data?.data);
  }, [menu.isLoading]);
  const getMenuHandle = async () => {
    dispatch(getMenu('', 'title', page, sort));
  };
  const onRefresh = () => {
    setRefreshing(true);
    getMenuHandle();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View
      style={{
        width: '100%',
        marginTop: 50,
        marginHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '60%',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeMain')}>
          <Image source={require('../../assets/images/arrowBack.png')} />
        </TouchableOpacity>

        <Text style={{fontSize: 20, color: 'rgba(239, 200, 26, 1)'}}>
          Popular Menu
        </Text>
      </View>
      <FlatList
        data={recipes}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', marginRight: 50}}>
                <Image
                  style={{width: 100, height: 100, borderRadius: 5}}
                  source={{uri: item.photo}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    height: '100%',
                    marginLeft: 10,
                    width: 150,
                  }}>
                  <Text
                    onPress={() =>
                      navigation.navigate('DetailMenu', {itemId: item.id})
                    }
                    style={{fontSize: 16, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  paddingRight: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/save.png')}
                    style={{marginRight: 5, width: 25, height: 25}}
                  />
                  <Text>{item.saved_count}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/like.png')}
                    style={{width: 25, height: 25}}
                  />
                  <Text>{item.like_count}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      />
      <View
        style={{
          width: '100%',
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(239, 200, 26, 1)',
            borderRadius: 5,
            padding: 5,
          }}
          onPress={() => setPage(page => page - 1)}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 10}}>
          Show {menu.data?.pagination.pageNow}-{menu.data?.pagination.totalPage}{' '}
          from {menu.data?.pagination.totalData}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(239, 200, 26, 1)',
            borderRadius: 5,
            padding: 5,
          }}
          onPress={() => setPage(page => page + 1)}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopularMenu;
