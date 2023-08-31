import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';

const PopularMenu = ({navigation}) => {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = async () => {
    try {
      const result = await axios.get(
        `https://determined-pink-foal.cyclic.app/recipe`,
      );
      setRecipes(result.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
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
                <Image
                  source={require('../../assets/images/save.png')}
                  style={{marginRight: 5, width: 25, height: 25}}
                />
                <Image
                  source={require('../../assets/images/like.png')}
                  style={{width: 25, height: 25}}
                />
              </View>
            </View>
          </ScrollView>
        )}
      />
    </View>
  );
};

export default PopularMenu;
