import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import bgAuth from '../../assets/images/bgAuth.png';
import {postRegister} from '../../storages/action/auth';
import {useDispatch} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
const Register = ({navigation}) => {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    phone: '081524302289',
    password: '',
  });
  const handleInput = (name, value) => {
    setDataUser({...dataUser, [name]: value});
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      dispatch(postRegister(dataUser, navigation));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ToastProvider>
      <View style={[styles.containerBg, {color: 'rgba(196, 196, 196, 1)'}]}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          style={[
            styles.containerBg,
            {
              height: '100%',
              width: '100%',
              borderRadius: 5,
              paddingTop: StatusBar.currentHeight,
            },
          ]}
          source={bgAuth}
          resizeMode="cover"></ImageBackground>
        <View style={[styles.container, {alignItems: 'center'}]}>
          <Text
            style={{
              color: 'rgba(239, 200, 26, 1)',
              fontSize: 25,
              fontWeight: '800',
            }}>
            Welcome!
          </Text>
          <Text style={{color: 'rgba(196, 196, 196, 1)', marginBottom: 30}}>
            Register to Recipe App
          </Text>
          <View style={{width: '90%'}}>
            <TextInput
              style={[styles.styleInput]}
              placeholder="myname"
              placeholderTextColor={'rgba(239, 200, 26, 1)'}
              value={dataUser.name}
              onChange={e => handleInput('name', e.nativeEvent.text)}
            />
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.image}
            />
          </View>
          <View style={{width: '90%'}}>
            <TextInput
              style={[styles.styleInput]}
              placeholder="examplexxx@gmail.com"
              placeholderTextColor={'rgba(239, 200, 26, 1)'}
              value={dataUser.email}
              onChange={e => handleInput('email', e.nativeEvent.text)}
            />
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.image}
            />
          </View>
          <View style={{width: '90%'}}>
            <TextInput
              style={[styles.styleInput]}
              placeholder="Password"
              placeholderTextColor={'rgba(239, 200, 26, 1)'}
              value={dataUser.password}
              onChange={e => handleInput('password', e.nativeEvent.text)}
            />
            <Image
              source={require('../../assets/images/lock.png')}
              style={styles.image}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{color: '#FFF'}}>REGISTER</Text>
          </TouchableOpacity>
          <Text style={{color: 'rgba(196, 196, 196, 1)'}}>
            have an account?
            <Text
              style={{color: 'rgba(239, 200, 26, 1)'}}
              onPress={() => navigation.navigate('Login')}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </ToastProvider>
  );
};
const styles = StyleSheet.create({
  containerBg: {
    flex: 1,
  },
  container: {
    flex: 2,
  },
  styleInput: {
    marginVertical: 15,
    paddingLeft: 50,
    paddingVertical: 15,
    borderColor: 'rgba(239, 200, 26, 1)',
    borderWidth: 2,
    width: '100%',
    borderRadius: 8,
    position: 'relative',
    color: 'rgba(239, 200, 26, 1)',
    fontSize: 16,
  },
  image: {
    position: 'absolute',
    top: 33,
    left: 10,
  },
  button: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'rgba(239, 200, 26, 1)',
    padding: 20,
    alignItems: 'center',
    marginVertical: 35,
  },
});

export default Register;
