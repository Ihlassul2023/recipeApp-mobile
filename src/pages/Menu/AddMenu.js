import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {instance} from '../../utils/serviceApi';

const AddMenu = ({route}) => {
  const itemId = route.params?.itemId;
  const [dataRecipe, setDataRecipe] = useState({
    title: '',
    ingredients: '',
    photo: '',
    category_id: '',
  });
  useEffect(() => {
    getRecipe();
  }, [itemId]);
  const getRecipe = async () => {
    try {
      const result = await axios.get(
        `https://determined-pink-foal.cyclic.app/recipe/${itemId}`,
      );
      setDataRecipe({...dataRecipe, ...result.data.data});
      setPhoto(result.data.data.photo);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  const login = useSelector(state => state.login);
  const [photo, setPhoto] = useState(null);
  const openImagePicker = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0];
        setPhoto(imageUri);
      }
    });
  };

  const handleInput = (name, value) => {
    setDataRecipe({...dataRecipe, [name]: value});
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('title', dataRecipe.title);
      formData.append('ingredients', dataRecipe.ingredients);
      formData.append('category_id', dataRecipe.category_id);
      formData.append('photo', {
        uri: photo.uri,
        name: photo.fileName,
        type: photo.type,
      });
      if (itemId) {
        const result = await axios.put(
          `https://determined-pink-foal.cyclic.app/recipe/${itemId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${login.data.token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(result.data.msg);
      } else {
        const result = await axios.post(
          `https://determined-pink-foal.cyclic.app/recipe`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${login.data.token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(result.data.msg);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'rgba(239, 239, 239, 1)'}}>
      <View
        style={{marginTop: 100, alignItems: 'center', marginHorizontal: 20}}>
        <Text
          style={{
            color: 'rgba(239, 200, 26, 1)',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Add Your Recipe
        </Text>
        <TextInput
          style={[style.input, {marginTop: 50}]}
          placeholder="Title"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          value={dataRecipe.title}
          onChange={e => handleInput('title', e.nativeEvent.text)}
        />
        <TextInput
          style={{
            height: 200,
            width: '100%',
            marginVertical: 20,
            backgroundColor: '#FFF',
            borderRadius: 10,
            paddingLeft: 10,
            fontWeight: 'bold',
            color: 'rgba(196, 196, 196, 1)',
          }}
          placeholder="Ingredients"
          placeholderTextColor="rgba(196, 196, 196, 1)"
          textAlignVertical="top"
          value={dataRecipe.ingredients}
          onChange={e => handleInput('ingredients', e.nativeEvent.text)}
        />
        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '25%',
              marginRight: 20,
              backgroundColor: '#FFF',
              borderRadius: 10,
              height: 50,
              fontWeight: 'bold',
              color: 'rgba(196, 196, 196, 1)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={openImagePicker}>
            <Text>Add photo</Text>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#FFF',
              borderStyle: 'dashed',
              borderWidth: 1,
              borderRadius: 100,
              borderColor: 'rgba(196, 196, 196, 1)',
              width: 100,
              height: 100,
              fontWeight: 'bold',
              color: 'rgba(196, 196, 196, 1)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {photo ? (
              <Image
                style={{width: 100, height: 100, borderRadius: 100}}
                source={{uri: photo.uri || photo}}
              />
            ) : (
              <Text
                style={{color: 'rgba(196, 196, 196, 1)', textAlign: 'center'}}>
                Preview
              </Text>
            )}
          </View>
        </View>
        <View style={{width: '100%'}}>
          <TextInput
            style={style.input}
            placeholder="Category"
            placeholderTextColor="rgba(196, 196, 196, 1)"
            value={dataRecipe.category_id}
            onChange={e => handleInput('category_id', e.nativeEvent.text)}
          />
          <Text>Ket Category:</Text>
          <Text>1 = main course</Text>
          <Text>2 = desert</Text>
          <Text>3 = appetizer</Text>
        </View>
        {itemId ? (
          <TouchableOpacity style={style.button} onPress={handleSubmit}>
            <Text style={{color: '#FFF'}}>EDIT</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.button} onPress={handleSubmit}>
            <Text style={{color: '#FFF'}}>POST</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'rgba(196, 196, 196, 1)',
  },
  button: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'rgba(239, 200, 26, 1)',
    padding: 20,
    alignItems: 'center',
    marginVertical: 35,
  },
});

export default AddMenu;
