import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TareaResponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';

interface Props {
  tarea: TareaResponse;
}


export const TareaCard = ( { tarea }: Props ) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={ () => navigation.navigate('FormTarea',{...tarea}) }
    >
      <View style={style.cardContainer}>

        <Text style={style.title} numberOfLines={2}>
          { tarea.titulo }
        </Text>

        <View style={style.row}>
          <Text style={style.label}>Estado: </Text>
          <Text style={style.value}>{ `${tarea.estado}` }</Text>
        </View>

        <Text style={style.label}>Descripción:</Text>
        <Text style={style.description} numberOfLines={3}>
          { tarea.descripcion }
        </Text>

      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#3B6FB6',
    borderColor: '#F4EBC1',
    borderRadius: 10,
    borderWidth: 2,
    padding: 14,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    color: '#F4EBC1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: 'white',
    fontSize: 16,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 2,
  },
});