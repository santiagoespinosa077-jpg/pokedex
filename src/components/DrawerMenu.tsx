import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";

interface BtnProps{
  navigate: () => void;
  text: string;
}

const BtnMenu = ( { navigate, text }:BtnProps ) => {
  return(
    <TouchableOpacity
      onPress={ navigate }
    >
      <View
        style={ style.bgText }
      >
        <Text style={ style.text } >
          { text }
        </Text>
      </View> 
    </TouchableOpacity>
  );
}

export const DrawerMenu = ( { navigation }: DrawerContentComponentProps ) => {
  return (
    <DrawerContentScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={ style.borderAvatar }
        >
          <Image
            style={ style.avatar }
            source={{ uri: 'https://imgs.search.brave.com/tpTr632f2rcnYd6JMLvuDcy4SufWWQQAF3J8PMp-8mg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c29waXRhcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTcv/MTIvcGlyYXRhLWN1/bGlhY2FuLmpwZw' }}
          />
        </View>
        <Text
          style={ style.userText }
        >
          User Cachas69
        </Text>
        <View>
          <BtnMenu
            navigate={ () => navigation.navigate('StackNavigator') }
            text="Screens"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('PokemonNavigator') }
            text="Pokedex"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('FormScreen') }
            text="FormScreen"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('ImagePickerScreen') }
            text="Seleccionar Imagen"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('LocationScreen') }
            text="Ubicación"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('UserStackNavigator') }
            text="Gestión de Usuarios"
          />
          <BtnMenu
            navigate={ () => navigation.navigate('TareaStackNavigator') }
            text="Gestión de tareas"
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  bgText: {
    backgroundColor: 'gray',
    marginTop: 10,
    width: 200,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "gray"
  },
  borderAvatar: {
    height: 210,
    width: 205,
    borderWidth: 30,
    borderColor: '#4F86C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  userText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});