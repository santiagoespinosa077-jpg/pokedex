import { createStackNavigator } from '@react-navigation/stack';
import { HomeMantenimiento } from '../screens/mantenimiento/HomeMantenimiento';
import { FormMantenimiento } from '../screens/mantenimiento/FormMantenimiento';
import { MantenimientoResponse } from '../interfaces/pandoraApiResponse';

export type StackMantenimientoParams = {
    FormMantenimiento: MantenimientoResponse;
    HomeMantenimiento: undefined;
}

const Stack = createStackNavigator<StackMantenimientoParams>();

export const MantenimientoStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='HomeMantenimiento'
            screenOptions={{
                headerMode: 'float',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeMantenimiento"
                component={HomeMantenimiento}
            />
            <Stack.Screen
                name="FormMantenimiento"
                component={FormMantenimiento}
            />
        </Stack.Navigator>
    );
};