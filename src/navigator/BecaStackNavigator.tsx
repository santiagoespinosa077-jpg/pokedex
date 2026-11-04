import { createStackNavigator } from "@react-navigation/stack";
import {HomeBecas} from "../screens/becas/HomeBecas";
import {FormBeca} from "../screens/becas/FormBeca";
import {FormBecaData} from "../hooks/useBecaForm";

export type StackBecaParams={
	FormBeca: FormBecaData;
	HomeBecas: undefined;
}

const Stack=createStackNavigator<StackBecaParams>();


export const BecaStackNavigator=()=>{
	return(
	<Stack.Navigator
      initialRouteName='HomeBecas'
      screenOptions={{
        headerMode:'float',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeBecas"
        component={HomeBecas}
      />
      <Stack.Screen
        name="FormBeca"
        component={FormBeca}
      />
    </Stack.Navigator>
	);
}