import { createStackNavigator } from "@react-navigation/stack";
import { HomeProductos } from "../screens/productos/HomeProductos";
import { FormProducto } from "../screens/productos/FormProducto";
import { FormProductoData } from "../hooks/useProductoForm";

export type StackProductoParams = {
  FormProducto: FormProductoData;
  HomeProductos: undefined;
}

const Stack = createStackNavigator<StackTareaParams>();

export const ProductoStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeProductos'
      screenOptions={{
        headerMode:'float',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeProductos"
        component={HomeProductos}
      />
      <Stack.Screen
        name="FormProducto"
        component={FormProducto}
      />
    </Stack.Navigator>
  );
}