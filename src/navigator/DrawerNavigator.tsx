import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import { PokemonNavigator } from "./PokemonNavigator";
import { StackNavigator } from "./StackNavigator";
import { UserStackNavigator } from "./UserStackNavigator";
import { TareaStackNavigator } from "./TareaStackNavigator";
import { ProductoStackNavigator } from "./ProductoStackNavigator";
import { AuthContext } from "../context/AuthContext";
import { LoginUser } from "../screens/users/LoginUser";
import { MantenimientoStackNavigator } from "./MantenimientoStackNavigator";
import { InmuebleStackNavigator } from "./InmuebleStackNavigator";


export type RootDrawerParams = {
  StackNavigator:         undefined;
  PokemonNavigator:       undefined;
  FormScreen:             undefined;
  ImagePickerScreen:      undefined;
  LocationScreen:         undefined;
  UserStackNavigator:     undefined;
  TareaStackNavigator:    undefined;
  ProductoStackNavigator: undefined;
  MantenimientoStackNavigator: undefined;
  InmuebleStackNavigator: undefined;

}

const Drawer = createDrawerNavigator<RootDrawerParams>();

const Navigator = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName='UserStackNavigator'
      screenOptions={{
        headerShown: true,
        drawerType: width > 720 ? 'permanent' : 'front',
        drawerPosition: 'right',
        drawerStyle: {
          width: width * 0.75
        }
      }}
      drawerContent={ (props) => <DrawerMenu {...props}/> }
    >
      <Drawer.Screen 
        name="StackNavigator" 
        component={StackNavigator} 
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
      />
      <Drawer.Screen 
        name="ProductoStackNavigator" 
        component={ProductoStackNavigator}  
      />
      <Drawer.Screen
        name="MantenimientoStackNavigator"
        component={MantenimientoStackNavigator}
      />
      <Drawer.Screen
        name="InmuebleStackNavigator"
        component={InmuebleStackNavigator}
      />
    </Drawer.Navigator>
  );
}


export const DrawerNavigator = () => {
  const { authState } = useContext( AuthContext );
  return ( authState.isLoggedIn ) ? <Navigator /> : <LoginUser />;
}