import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {getMenu, getMenuHome} from '../../storages/action/recipe';
const Items = ({id, photo, title, category, navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          style={{height: 100, width: 100, borderRadius: 5}}
          source={{uri: photo}}
        />
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            marginLeft: 10,
          }}>
          <Text
            onPress={() => navigation.navigate('DetailMenu', {itemId: id})}
            style={{fontSize: 16, fontWeight: 'bold'}}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image source={require('../../assets/images/star.png')} />
            <Text>4.3 . {category}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const allMenu = useSelector(state => state.menuReducer);
  const menuHome = useSelector(state => state.menuHomeReducer);
  const [select, setSelect] = useState('');
  const [searchMenu, setSearchMenu] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getMenuHandler();
    console.log(select);
  }, [searchMenu]);
  useEffect(() => {
    !allMenu.isLoading && setRecipes(allMenu.data?.data);
  }, [allMenu.isLoading]);
  const getMenuHandler = () => {
    dispatch(getMenu(searchMenu, select));
    dispatch(getMenuHome());
  };
  const onRefresh = () => {
    setRefreshing(true);
    getMenuHandler();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const sort = ['title', 'ingredients'];
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <TextInput
          style={{
            width: '100%',
            marginTop: 50,
            backgroundColor: 'rgba(239, 239, 239, 1)',
            borderRadius: 10,
            paddingVertical: 10,
            paddingLeft: 10,
            fontWeight: 'bold',
            color: 'rgba(196, 196, 196, 1)',
          }}
          placeholderTextColor={'rgba(196, 196, 196, 1)'}
          placeholder="Search Pasta, Bread, etc"
          value={searchMenu}
          onChange={e => setSearchMenu(e.nativeEvent.text)}
        />
        <View
          style={{
            marginBottom: 30,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 10}}>Search By :</Text>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Image
                source={require('../../assets/images/down-arrow.png')}
                style={{width: 15, height: 15}}
              />
            )}
            buttonStyle={{width: 150, borderRadius: 5, height: 40}}
            buttonTextStyle={{
              fontSize: 16,
              color: 'rgba(196, 196, 196, 1)',
              fontWeight: '800',
            }}
            dropdownIconPosition="right"
            data={sort}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem);
              setSelect(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        {searchMenu ? (
          <SafeAreaView>
            <FlatList
              data={recipes}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => (
                <Items
                  id={item.id}
                  photo={item.photo}
                  title={item.title}
                  category={item.category}
                  navigation={navigation}
                />
              )}
            />
          </SafeAreaView>
        ) : (
          <ScrollView>
            <Text style={{fontSize: 20}}>Popular Recipes</Text>
            <Text style={{fontWeight: '900'}}>Populer check</Text>
            {allMenu.isLoading ? (
              <ActivityIndicator color="rgba(239, 200, 26, 1)" size="large" />
            ) : (
              <SafeAreaView>
                <FlatList
                  horizontal
                  data={recipes}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  style={{flexDirection: 'row', marginTop: 20}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('PopularMenu')}>
                      <View style={{position: 'relative', marginRight: 10}}>
                        <Image
                          style={{
                            position: 'relative',
                            height: 150,
                            width: 150,
                            borderRadius: 10,
                          }}
                          source={{uri: item.photo}}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            width: 150,
                            height: 150,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            paddingLeft: 10,
                            paddingBottom: 10,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '900',
                              fontSize: 20,
                            }}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </SafeAreaView>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 50,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 20}}>New Recipes</Text>
              <Text
                onPress={() => navigation.navigate('NewMenu')}
                style={{color: 'rgba(109, 97, 242, 1)'}}>
                More info
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/soup.png')} />
                <Text>Soup</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/chicken.png')} />
                <Text>Chicken</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/seafood.png')} />
                <Text>Seafood</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/chicken.png')} />
                <Text>Dessert</Text>
              </View>
            </View>
            <Text style={{fontSize: 20}}>New Recipes For you</Text>
            <ScrollView
              horizontal
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
              {menuHome.isLoading ? (
                <ActivityIndicator color="rgba(239, 200, 26, 1)" size="large" />
              ) : (
                <>
                  {menuHome.data.data.map((recipe, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate('DetailMenu', {
                          itemId: recipe.id,
                        })
                      }>
                      <View
                        style={{
                          position: 'relative',
                          borderRadius: 8,
                          overflow: 'hidden',
                          marginRight: 10,
                        }}>
                        <Image
                          resizeMode="cover"
                          style={{width: 150, height: 150}}
                          source={{uri: recipe.photo}}
                        />
                        <View
                          style={{
                            backgroundColor: '#FFF',
                            position: 'absolute',
                            top: 75,
                            width: '100%',
                            height: '50%',
                            padding: 5,
                          }}>
                          <Text style={{fontWeight: 'bold'}}>
                            {recipe.title}
                          </Text>
                          <Text>{recipe.ingredients.slice(0, 20)}...</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Home;
