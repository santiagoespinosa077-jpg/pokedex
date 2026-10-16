import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TareaResponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';
interface Props {
  tarea: TareaResponse;
}

export const TareaCard = ( { tarea}: Props ) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={  () => navigation.navigate('FormTarea',{...tarea})  }
    >
    
      <View 
        style={{
          ...style.cardContainer,
          backgroundColor: '#3B6FB6',
          borderColor: '#F4EBC1'
        }}
      >
        <Text 
          style={{ 
            ...style.text,
            color: 'white',
            fontSize: 20,

          }}
        >
          { `Tarea: ${tarea.titulo}` }
        </Text>
        <Text 
          style={{ 
            ...style.text, 
            fontSize: 20 
          }}>
            { `\n Estado:${tarea.estado}` }
            
        </Text>
        <Text
          style={{
            ...style.text,
            fontSize: 20
          }}
        >
          { `\n Descripción: ${tarea.descripcion}` }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'olive',
    borderColor: 'yellow',
    borderRadius: 10,
    borderWidth: 5,
    height: 170,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    overflow: 'hidden',
    width: 300
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  btnEditar: {
    backgroundColor: 'black',
    borderRadius: 8,
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 4
  },
  textEditar: {
    color: 'yellow',
    fontSize: 14
  },
  containerPrincipal:{

  }
});