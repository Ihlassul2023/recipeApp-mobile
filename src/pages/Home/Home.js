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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../../storages/action/auth';
import axios from 'axios';
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
  const [searchMenu, setSearchMenu] = useState('');
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getMenu();
  }, [searchMenu]);
  const getMenu = async () => {
    try {
      const result = await axios.get(
        `https://determined-pink-foal.cyclic.app/recipe?searchBy=title&search=${searchMenu}`,
      );
      setRecipes(result.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  const cekToken = async () => {
    dispatch(logout());
  };
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
            marginVertical: 50,
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
        {searchMenu ? (
          <SafeAreaView>
            <FlatList
              data={recipes}
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
            <Text onPress={cekToken} style={{fontSize: 20}}>
              Popular Recipes
            </Text>
            <Text style={{fontWeight: '900'}}>Populer check</Text>
            <ScrollView
              horizontal
              style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{marginRight: 10}}>
                <Image
                  style={{position: 'relative'}}
                  source={require('../../assets/images/swipe1.png')}
                />
                <Text
                  onPress={() => navigation.navigate('PopularMenu')}
                  style={{
                    position: 'absolute',
                    top: 100,
                    left: 10,
                    color: '#FFF',
                    width: 100,
                    fontWeight: '900',
                    fontSize: 20,
                  }}>
                  Sandwich with Egg
                </Text>
              </View>
              <View>
                <Image
                  style={{position: 'relative'}}
                  source={require('../../assets/images/swipe1.png')}
                />
                <Text
                  onPress={() => navigation.navigate('PopularMenu')}
                  style={{
                    position: 'absolute',
                    top: 100,
                    left: 10,
                    color: '#FFF',
                    width: 100,
                    fontWeight: '900',
                    fontSize: 20,
                  }}>
                  Sandwich with Egg
                </Text>
              </View>
            </ScrollView>
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
            <Text style={{fontSize: 20}}>Popular For you</Text>
            <ScrollView
              horizontal
              style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  position: 'relative',
                  //   borderWidth: 0.5,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginRight: 10,
                }}>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/images/beefSteak.png')}
                />
                <View
                  style={{
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    top: 75,
                    width: '100%',
                    padding: 5,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Beef Steak</Text>
                  <Text>Beef steak with nopales, tartare ....</Text>
                </View>
              </View>
              <View
                style={{
                  position: 'relative',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/images/spagheti.png')}
                />
                <View
                  style={{
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    top: 75,
                    width: '100%',
                    padding: 5,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Spaghetti</Text>
                  <Text>Crbonara sauce with grilled ...</Text>
                </View>
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Home;
