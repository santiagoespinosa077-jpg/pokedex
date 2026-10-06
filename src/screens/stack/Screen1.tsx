import { View, Text } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { StackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';

interface Props extends StackScreenProps<StackParams,'Screen1'>{};

export const Screen1 = ( { navigation }:Props ) => {
    return(
        <View
          style={ appTheme.container }
        >
            <Text
              style={ appTheme.text }
            >
                Screens
            </Text>
            <BtnTouch
              text='Contador'
              onPress={ () => navigation.navigate('Screen4') }
              color='orange'
            />
            <BtnTouch
              text='Efectos'
              onPress={ () => navigation.navigate('Screen5') }
              color='pink'
            />
            <BtnTouch
              text='Posiciones'
              onPress={ () => navigation.navigate('Screen6') }
              color='black'
            />
        </View>
    );
}