import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BecaResponse } from '../interfaces/pandoraApiResponse';

interface Props {
  beca: BecaResponse;
}

export const BecaCard = ({ beca }: Props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={ () => navigation.navigate('FormBeca', { ...beca }) }
    >
      <View style={styles.row}>
        <Text style={styles.nombre}>{beca.nombre}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{beca.tipo.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.detalle}>{beca.matricula} · {beca.carrera}</Text>
      <Text style={styles.detalle}>Semestre {beca.semestre} · Promedio {beca.promedio}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nombre: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  tag: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: '#6366f1',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  detalle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
});