import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser, showUser} from '../../storages/action/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import {ToastProvider} from 'react-native-toast-notifications';
import {logout} from '../../storages/action/auth';
const MyProfile = ({navigation}) => {
  const showMe = useSelector(state => state.getUser);
  const update = useSelector(state => state.updateUser);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: '',
  });
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    dispatch(showUser());
  }, [edit]);
  useEffect(() => {
    !showMe.isLoading && setDataUser({...dataUser, ...showMe.data});
  }, [showMe.isLoading]);
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
    setDataUser({...dataUser, [name]: value});
  };
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('name', dataUser.name);
    photo &&
      formData.append('photo_user', {
        uri: photo?.uri,
        name: photo?.fileName,
        type: photo?.type,
      });
    dispatch(updateUser(formData));
  };
  const cekToken = async () => {
    dispatch(logout());
  };
  return (
    <ToastProvider>
      <View style={{flex: 1, position: 'relative', backgroundColor: '#FFF'}}>
        <View
          style={{
            backgroundColor: 'rgba(239, 200, 26, 1)',
            width: '100%',
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: showMe.data?.photo_user}}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
          <Text
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 10,
            }}>
            {showMe.data?.name}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            width: '95%',
            height: '100%',
            backgroundColor: '#FFF',
            borderRadius: 15,
            top: 250,
            left: 10,
            padding: 20,
          }}>
          {edit ? (
            <View style={{flex: 1}}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '65%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setPhoto(null);
                      setDataUser({
                        name: '',
                      });
                      setEdit(false);
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
                    Edit Profile
                  </Text>
                </View>
                <TextInput
                  style={[style.input, {marginTop: 50, marginBottom: 20}]}
                  placeholder="Name"
                  placeholderTextColor="rgba(239, 200, 26, 1)"
                  value={dataUser.name}
                  onChange={e => handleInput('name', e.nativeEvent.text)}
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
                      backgroundColor: 'rgba(239, 200, 26, 1)',
                      borderRadius: 10,
                      height: 50,
                      fontWeight: 'bold',
                      color: '#FFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={openImagePicker}>
                    <Text style={{color: '#FFF'}}>Add photo</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'rgba(196, 196, 196, 1)',
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderRadius: 100,
                      borderColor: 'rgba(196, 196, 196, 1)',
                      width: 100,
                      height: 100,
                      fontWeight: 'bold',
                      color: '#FFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {photo || showMe.data?.photo_user ? (
                      <Image
                        style={{width: 100, height: 100, borderRadius: 100}}
                        source={{uri: photo?.uri || showMe.data?.photo_user}}
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
                <TouchableOpacity style={style.button} onPress={handleSubmit}>
                  {update.isLoading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <Text style={{color: '#FFF'}}>EDIT</Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/images/user.png')} />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
                    Edit Profile
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Image
                    source={require('../../assets/images/ic-chevron.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/images/award.png')} />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
                    My Recipe
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MyMenu')}>
                  <Image
                    source={require('../../assets/images/ic-chevron.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/save-profile.png')}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
                    Saved Recipe
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SaveRecipe')}>
                  <Image
                    source={require('../../assets/images/ic-chevron.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/images/Vector.png')} />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
                    Liked Recipe
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LikeRecipe')}>
                  <Image
                    source={require('../../assets/images/ic-chevron.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                }}
                onPress={cekToken}>
                <Image source={require('../../assets/images/logoutIcon.png')} />
                <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '900'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ToastProvider>
  );
};
const style = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 20,
    borderColor: 'rgba(239, 200, 26, 1)',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'rgba(239, 200, 26, 1)',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(239, 200, 26, 1)',
    padding: 20,
    alignItems: 'center',
    marginVertical: 35,
  },
});

export default MyProfile;
