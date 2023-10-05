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
import {postLogin} from '../../storages/action/auth';
import {useDispatch} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';

const Login = ({navigation}) => {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleInput = (name, value) => {
    setDataUser({...dataUser, [name]: value});
  };
  const handleSubmit = async () => {
    try {
      dispatch(postLogin(dataUser));
    } catch (error) {
      console.log(error.response.data.msg);
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
            Log in to your exiting account.
          </Text>
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
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
            }}>
            <Text>Forgot Password ?</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{color: '#FFF'}}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{color: 'rgba(196, 196, 196, 1)'}}>
            Don’t have an account?
            <Text
              style={{color: 'rgba(239, 200, 26, 1)'}}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
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

export default Login;
