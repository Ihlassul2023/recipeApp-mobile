import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddMenu from './AddMenu';

const Stack = createNativeStackNavigator();
const MenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddMenu"
        component={AddMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MenuStack;
