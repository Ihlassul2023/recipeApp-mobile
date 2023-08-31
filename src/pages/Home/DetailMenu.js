import {View, ImageBackground, Text, Image} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
const DetailMenu = ({route}) => {
  const itemId = route.params?.itemId;
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    getRecipe();
  }, []);
  const getRecipe = async () => {
    try {
      const result = await axios.get(
        `https://determined-pink-foal.cyclic.app/recipe/${itemId}`,
      );
      setRecipe(result.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <View style={{position: 'relative'}}>
      <ImageBackground
        source={{uri: recipe?.photo}}
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 250,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFF',
              backgroundColor: 'rgba(239, 200, 26, 1)',
              borderRadius: 5,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              width: '50%',
            }}>
            {recipe?.title}
          </Text>
          <View style={{flexDirection: 'row', marginLeft: 30}}>
            <Image
              source={require('../../assets/images/save.png')}
              style={{marginRight: 10}}
            />
            <Image source={require('../../assets/images/like.png')} />
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#FFF',
          width: '100%',
          height: 500,
          top: 400,
          borderRadius: 20,
          padding: 20,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Ingredients</Text>

        {recipe?.ingredients.split(',').map((item, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <Text style={{marginRight: 10}}>-</Text>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DetailMenu;
