//import { PositionScreen } from "./src/screens/PositionScreen";
//import { BoxObjectModelScreen } from "./src/screens/BoxObjectModelScreen";
//import { CounterScreen } from "./src/screens/CounterScreen";
//import { CounterReducerScreen } from "./src/screens/CounterReducerScreen";
//import { UseEffectScreen } from "./src/screens/UseEffectScreen";
//import { StackNavigator } from "./src/navigator/StackNavigator";
import { ReactNode } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </AppState>
  );
}

const AppState = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}

export default App;