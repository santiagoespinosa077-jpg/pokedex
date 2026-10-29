import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { InmuebleResponse } from '../interfaces/pandoraApiResponse';
import { StackInmuebleParams } from '../navigator/InmuebleStackNavigator';

interface Props {
  inmueble: InmuebleResponse;
}

// 1500000 -> $1,500,000
const formatPrecio = (precio: number | string): string => {
  const n = Number(precio);
  if (precio === '' || isNaN(n)) return '';
  return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const InmuebleCard = ({ inmueble }: Props) => {

  const navigation = useNavigation<StackNavigationProp<StackInmuebleParams>>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('FormInmueble', { ...inmueble })}
    >
      <View style={style.cardContainer}>

        {inmueble.imagen1 ? (
          <Image
            style={style.cover}
            source={{ uri: `data:image/png;base64,${inmueble.imagen1}` }}
          />
        ) : (
          <View style={style.banner} />
        )}

        <Text style={style.title} numberOfLines={1}>
          {inmueble.titulo}
        </Text>

        <View style={style.infoBlock}>
          <Text style={style.label}>Operación</Text>
          <Text style={style.value} numberOfLines={1}>
            {inmueble.operacion}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Tipo</Text>
          <Text style={style.value} numberOfLines={1}>
            {`${inmueble.tipo}`}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Precio</Text>
          <Text style={style.value} numberOfLines={1}>
            {formatPrecio(inmueble.precio)}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Dirección</Text>
          <Text style={style.value} numberOfLines={2}>
            {inmueble.direccion}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 8,
    minHeight: 210,
    overflow: 'hidden',
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 180,
  },
  banner: {
    backgroundColor: '#3B6FB6',
    height: 90,
    width: '100%',
  },
  cover: {
    backgroundColor: '#E2E8F0',
    height: 90,
    width: '100%',
  },
  title: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 12,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  infoBlock: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: '88%',
  },
  label: {
    color: '#3B6FB6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  value: {
    color: '#334155',
    fontSize: 12,
    textAlign: 'center',
  },
});