import { View, Text } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { StackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';
import{useCounterReducer} from '../../hooks/useCounterReducer';


interface Props extends StackScreenProps<StackParams,'Screen4'>{};

export const Screen4 = ( { navigation }:Props ) => {
    const{state, add, decrement, reset, add2, decrement2 }= useCounterReducer ({count:0});
    return(
        <View
          style={ appTheme.container }
        >
            <Text
              style={ appTheme.text }
            >
               Screen:
               Contador:{state.count}
            </Text>

            <BtnTouch
              text='->'
              onPress={ () => navigation.navigate('Screen5') }
              color='#fb2bd1'
            />
            <BtnTouch
              text='<-'
              onPress={ () => navigation.goBack() }
            />

            <BtnTouch
                text='add'
                onPress={()=>add()}
                color='green'
            />
            <BtnTouch
                text='add +2'
                onPress={()=>add2()}
            />
            <BtnTouch
                text='restar'
                onPress={()=>decrement()}
                color='orange'
            />
            <BtnTouch
                text='restar-2'
                onPress={()=>decrement2()}
                color='#ffbf00'
            />
            <BtnTouch
                text='reiniciar'
                onPress={()=>reset()}
                color='#00ffff'
            />
        </View>
    );
}