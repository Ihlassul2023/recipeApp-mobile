import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {instance} from '../../utils/serviceApi';

const MyMenu = ({navigation}) => {
  const login = useSelector(state => state.login);
  let token = login.data.token;
  const [myRecipe, setMyRecipe] = useState(null);
  useEffect(() => {
    getMyRecipe();
  }, []);
  const getMyRecipe = async () => {
    try {
      const result = await (
        await instance()
      ).get(`https://determined-pink-foal.cyclic.app/recipe/myRecipe`);
      setMyRecipe(result.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  const deleteRecipe = async id => {
    try {
      const result = await (
        await instance()
      ).delete(`https://determined-pink-foal.cyclic.app/recipe/${id}`);
      getMyRecipe();
    } catch (error) {
      console.log(error.response.data.msg);
    }
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
      <FlatList
        data={myRecipe}
        renderItem={({item}) => (
          <ScrollView>
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
                  onPress={() => deleteRecipe(item.id)}>
                  <Text style={{textAlign: 'center'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      />
    </View>
  );
};

export default MyMenu;
