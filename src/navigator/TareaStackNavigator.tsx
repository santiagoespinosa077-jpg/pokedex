import { createStackNavigator } from "@react-navigation/stack";
import { HomeTareas } from "../screens/tareas/HomeTareas";
import { FormTarea } from "../screens/tareas/FormTarea";
import { FormTareaData } from "../hooks/useTareaForm";

export type StackTareaParams = {
  FormTarea: FormTareaData;
  HomeTareas: undefined;
}

const Stack = createStackNavigator<StackTareaParams>();

export const TareaStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeTareas'
      screenOptions={{
        headerMode:'float',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeTareas"
        component={HomeTareas}
      />
      <Stack.Screen
        name="FormTarea"
        component={FormTarea}
      />
    </Stack.Navigator>
  );
}