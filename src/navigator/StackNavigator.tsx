import { createStackNavigator } from "@react-navigation/stack";
import { Screen1 } from "../screens/stack/Screen1";
import { Screen2 } from "../screens/stack/Screen2";
import { Screen3 } from "../screens/stack/Screen3";
import { Screen4 } from "../screens/stack/Screen4";
import { Screen5 } from "../screens/stack/Screen5";
import { Screen6 } from "../screens/stack/Screen6";

export type StackParams = {
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
  Screen4: undefined;
  Screen5: undefined;
  Screen6: undefined;
  
}

const Stack = createStackNavigator<StackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Screen1"
        component={Screen1}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
      />
      <Stack.Screen
        name="Screen3"
        component={Screen3}
      />
      <Stack.Screen
        name="Screen4"
        component={Screen4}
      />
      <Stack.Screen
        name="Screen5"
        component={Screen5}
      />
      <Stack.Screen
        name="Screen6"
        component={Screen6}
      />
    </Stack.Navigator>
  );
}