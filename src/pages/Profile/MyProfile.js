import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
const MyProfile = ({navigation}) => {
  const login = useSelector(state => state.login);
  return (
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
          source={{uri: login.data.user.photo_user}}
          style={{width: 100, height: 100, borderRadius: 100}}
        />
        <Text
          style={{
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
          }}>
          {login.data.user.name}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../assets/images/user.png')} />
            <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
              Edit Profile
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../assets/images/ic-chevron.png')} />
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
            <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
              My Recipe
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MyMenu')}>
            <Image source={require('../../assets/images/ic-chevron.png')} />
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
            <Image source={require('../../assets/images/save-profile.png')} />
            <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
              Saved Recipe
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../assets/images/ic-chevron.png')} />
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
            <Text style={{marginLeft: 10, fontSize: 16, fontWeight: '500'}}>
              Liked Recipe
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../assets/images/ic-chevron.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;
