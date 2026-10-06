import { View, Text, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { StackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';
import { useEffect, useState } from 'react';


interface Props extends StackScreenProps<StackParams,'Screen5'>{};

export const Screen5 = ( { navigation }:Props ) => {
    const [ hora, setHora ] = useState( new Date() );
    const [ color, setColor ] = useState( 'violet' );

    const colors  = [ 'red', 'azul', 'brown', 'gray', 'purple' ];

    const random = () => {
    const color = colors[ Math.floor( Math.random() * colors.length ) ];
    setColor(color);
  }

  useEffect( () => {
    const interval = setInterval( () => {
      setHora( new Date() );
      return () => clearInterval(interval);
    },1000);

    const intervalColor = setInterval( () => {
      random();
      return () => clearInterval(intervalColor);
    },100);
  },[]);
    return(
        <View
          style={ appTheme.container }
        >
            <Text
              style={{
                ...style.text,
                color: color
              }}
            >
                Screen5
                Fecha y hora: { hora.toLocaleString() }
            </Text>

            <BtnTouch
              text='->'
              onPress={ () => navigation.navigate('Screen6') }
            />
            <BtnTouch
              text='<-'
              onPress={ () => navigation.goBack() }
            />
        </View>
    );
}

const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    color: 'rgba(245, 73, 39, 0.8)',
    textAlign: 'center'
  }
});