import { View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { StackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';

interface Props extends StackScreenProps<StackParams,'Screen6'>{};
export const Screen6 = ( { navigation }:Props ) => {

  
  const {height, width} = useWindowDimensions();

  return (
    <View
      style={ appTheme.container }
    >
      <View 
        style={{
          ...style.boxViolet,//mandamos extraer al elemento hijo con los tres puntos
          backgroundColor: 'red',
          borderRadius: 100,
          height: width * 0.2,
          left: -20,//Ajusta la imagen más arriba del marco
          position: 'absolute',
          top: -20,
          width: width * 0.2
        }}
      />
      <View 
        style={{
          ...style.boxViolet,
          //width: width,
          //height: height * 0.4,
        }}
      />
      <View 
        style={{
          ...style.boxBlack,
          //width: width,
          //height: height * 0.2,
        }}
      />
      <View 
        style={{
          ...style.boxBrown,
          //width: width,
          //height: height * 0.4,
        }}
      />

      <BtnTouch
        text='Home'
        onPress={()=>navigation.popToTop()}
        />

      <BtnTouch
        text='<-'
        onPress={()=>navigation.navigate('Screen5')}
      />
    </View>
  );
}
const style=StyleSheet.create({
container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly'
  },
  boxViolet: {
    //alignSelf: 'flex-start',
    backgroundColor: 'violet',
    height: 100,
    width: 100
  },
  boxBlack: {
    backgroundColor: 'black',
    height: 100,
    width: 100,
  },
  boxBrown: {
    //alignSelf: 'flex-end',
    backgroundColor: 'brown',
    height: 100,
    width: 100
  }
});