import {View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const SplashScreen = () => {
  const login = useSelector(state => state.login);
  useEffect(() => {}, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../../assets/images/screen.png')} alt="screen" />
    </View>
  );
};

export default SplashScreen;
