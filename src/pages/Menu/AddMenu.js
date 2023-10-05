import {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {
  postMenu,
  getMenuDetail,
  updateMenu,
} from '../../storages/action/recipe';
import SelectDropdown from 'react-native-select-dropdown';

const AddMenu = ({route, navigation}) => {
  const itemId = route.params?.itemId;
  const [dataRecipe, setDataRecipe] = useState({
    title: '',
    ingredients: '',
    photo: '',
    category_id: '',
  });
  const sort = ['main course', 'desert', 'appetizer'];
  const categoryValue = {main_course: '1', desert: '2', appetizer: '3'};
  const update = useSelector(state => state.put_menuReducer);
  const post = useSelector(state => state.post_menuReducer);
  const getDetail = useSelector(state => state.detail_menuReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    itemId && getRecipe();
  }, [itemId]);
  useEffect(() => {
    !getDetail.isLoading && setDataRecipe({...dataRecipe, ...getDetail.data});
    console.log(update.isLoading);
  }, [getDetail.isLoading]);
  const getRecipe = async () => {
    dispatch(getMenuDetail(itemId));
  };
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
      photo &&
        formData.append('photo', {
          uri: photo?.uri,
          name: photo?.fileName,
          type: photo?.type,
        });

      if (itemId) {
        dispatch(updateMenu(formData, itemId));
      } else {
        dispatch(postMenu(formData));
        setDataRecipe({
          title: '',
          ingredients: '',
          photo: '',
          category_id: '',
        });
        setPhoto(null);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <ToastProvider>
      {getDetail.isLoading ? (
        <ActivityIndicator color="rgba(239, 200, 26, 1)" size="large" />
      ) : (
        <ScrollView style={{backgroundColor: 'rgba(239, 239, 239, 1)'}}>
          <View
            style={{
              marginTop: 100,
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            {itemId ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 100,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setDataRecipe({
                      title: '',
                      ingredients: '',
                      photo: '',
                      category_id: '',
                    });
                    setPhoto(null);
                    navigation.navigate('Menu');
                  }}>
                  <Image
                    source={require('../../assets/images/arrowBack.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'rgba(239, 200, 26, 1)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Edit Your Recipe
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  color: 'rgba(239, 200, 26, 1)',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Add Your Recipe
              </Text>
            )}

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
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
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
                {photo || dataRecipe.photo ? (
                  <Image
                    style={{width: 100, height: 100, borderRadius: 100}}
                    source={{uri: photo?.uri || dataRecipe.photo}}
                  />
                ) : (
                  <Text
                    style={{
                      color: 'rgba(196, 196, 196, 1)',
                      textAlign: 'center',
                    }}>
                    Preview
                  </Text>
                )}
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <SelectDropdown
                defaultButtonText="Select Category"
                renderDropdownIcon={() => (
                  <Image
                    source={require('../../assets/images/down-arrow.png')}
                    style={{width: 15, height: 15}}
                  />
                )}
                buttonStyle={{
                  width: 170,
                  borderRadius: 5,
                  height: 50,
                  backgroundColor: '#FFF',
                }}
                buttonTextStyle={{
                  fontSize: 16,
                  color: 'rgba(196, 196, 196, 1)',
                  fontWeight: '800',
                }}
                dropdownIconPosition="right"
                data={sort}
                onSelect={(selectedItem, index) => {
                  console.log(categoryValue[selectedItem.split(' ').join('_')]);
                  setDataRecipe({
                    ...dataRecipe,
                    category_id:
                      categoryValue[selectedItem.split(' ').join('_')],
                  });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            {itemId ? (
              <TouchableOpacity style={style.button} onPress={handleSubmit}>
                {update.isLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={{color: '#FFF'}}>EDIT</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={style.button} onPress={handleSubmit}>
                {post.isLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={{color: '#FFF'}}>POST</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </ToastProvider>
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
