import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MantenimientoResponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';

interface Props {
  mantenimiento: MantenimientoResponse;
}


const formatFecha = (fecha: string): string => {
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return '';
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${d.getFullYear()}`;
};

export const MantenimientoCard = ({ mantenimiento }: Props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('FormMantenimiento', { ...mantenimiento })}
    >
      <View style={style.cardContainer}>

        <View style={style.banner} />

        <Text style={style.username} numberOfLines={1}>
          {mantenimiento.equipo}
        </Text>

        <View style={style.infoBlock}>
          <Text style={style.label}>Solicitante</Text>
          <Text style={style.value} numberOfLines={1}>
            {mantenimiento.solicitante}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Estado</Text>
          <Text style={style.value} numberOfLines={1}>
            {`${mantenimiento.estado}`}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Prioridad</Text>
          <Text style={style.value} numberOfLines={1}>
            {`${mantenimiento.prioridad}`}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Fecha</Text>
          <Text style={style.value} numberOfLines={1}>
            {formatFecha(mantenimiento.fecha)}
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
    height: 60,
    width: '100%',
  },
  username: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 14,
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