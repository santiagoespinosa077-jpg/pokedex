import { createStackNavigator}  from '@react-navigation/stack';
import {HomeInmueble}from '../screens/inmueble/HomeInmueble';
import {FormInmueble} from '../screens/inmueble/FormInmueble';
import {InmuebleResponse} from '../interfaces/pandoraApiResponse';

export type StackInmuebleParams={
    FormInmueble: InmuebleResponse;
    HomeInmueble: undefined;
}

const Stack = createStackNavigator<StackInmuebleParams>();

export const InmuebleStackNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName='HomeInmueble'
        screenOptions={{
            headerMode: 'float',
            headerShown: false
        }}
        >
            <Stack.Screen
                name="HomeInmueble"
                component={HomeInmueble}
            />
            <Stack.Screen
                name="FormInmueble"
                component={FormInmueble}
            />
        </Stack.Navigator>
    )
}

