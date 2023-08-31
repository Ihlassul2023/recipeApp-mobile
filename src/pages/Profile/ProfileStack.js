import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import MyMenu from './MyMenu';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyMenu"
        component={MyMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
