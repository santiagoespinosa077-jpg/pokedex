import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";
import { useWindowDimensions } from "react-native";
import { PokemonNavigator } from "./PokemonNavigator";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";

export type RootDrawerParams = {
  StackNavigator: undefined;
  PokemonNavigator: undefined;
  FormScreen: undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName='PokemonNavigator'
      screenOptions={{
        headerShown: true,
        drawerType:  width > 720 ? 'permanent' : 'front',
        drawerPosition: 'right',
        overlayColor: 'rgba(20, 48, 110,0.6)',
        drawerStyle: {
          backgroundColor: '#0B1B4D',
          width: width * 0.75
        },
      }}
      drawerContent={ (props) => <DrawerMenu {...props}/> }
    >
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          headerStyle: { backgroundColor: '#0B1B4D' },
          headerTintColor: '#FFE27A'
          }}
      />
      <Drawer.Screen
        name="PokemonNavigator"
        component={PokemonNavigator}
        options={{
          headerStyle: { backgroundColor: '#0B1B4D' },
          headerTintColor: '#FFE27A'
          }}
      />
      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
        options={{
          headerStyle: { backgroundColor: '#0B1B4D' },
          headerTintColor: '#FFE27A'
          }}
      />
    </Drawer.Navigator>
  );
}