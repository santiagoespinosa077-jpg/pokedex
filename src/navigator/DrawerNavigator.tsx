import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import { PokemonNavigator } from "./PokemonNavigator";
import { StackNavigator } from "./StackNavigator";
import { UserStackNavigator } from "./UserStackNavigator";
import { useWindowDimensions } from "react-native";
import {TareaStackNavigator} from './TareaStackNavigator'
export type RootDrawerParams = {
  StackNavigator:     undefined;
  PokemonNavigator:   undefined;
  FormScreen:         undefined;
  ImagePickerScreen:  undefined;
  LocationScreen:     undefined;
  UserStackNavigator: undefined;
  TareaStackNavigator:undefined;

}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName='UserStackNavigator'
      screenOptions={{
        headerShown: true,
        drawerType:  width > 720 ? 'permanent' : 'front',
        drawerPosition: 'right',
        overlayColor: '#14264F',
        drawerStyle: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: width * 0.75
        }
      }}
      drawerContent={ (props) => <DrawerMenu {...props}/> }
    >
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        color="#1F4E9C"
      />
      <Drawer.Screen
        name="PokemonNavigator"
        component={PokemonNavigator}
      />
      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
      />
      <Drawer.Screen
        name="ImagePickerScreen"
        component={ImagePickerScreen}
      />
      <Drawer.Screen
        name="LocationScreen"
        component={LocationScreen}
      />
      <Drawer.Screen
        name="UserStackNavigator"
        component={UserStackNavigator}
      />
      <Drawer.Screen
        name="TareaStackNavigator"
        component={TareaStackNavigator}
        color="#1F4E9C"
      />
    </Drawer.Navigator>
  );
}