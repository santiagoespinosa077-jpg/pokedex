import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ProductosResponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';

interface Props {
  producto: ProductosResponse;
}

export const ProductoCard = ({ producto }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('FormProducto', { ...producto })}
      style={style.container}
    >
      <View style={style.cardContainer}>

        {producto.imagen ? (
          <Image
            style={style.image}
            source={{ uri: `data:image/png;base64,${producto.imagen}` }}
            resizeMode="cover"
          />
        ) : (
          <View style={[style.image, style.placeholderImage]}>
            <Text style={style.placeholderText}>Sin imagen</Text>
          </View>
        )}

        <View style={style.infoContainer}>
          <Text style={style.brandText} numberOfLines={1}>
            {producto.marca}
          </Text>

          <Text style={style.titleText} numberOfLines={2}>
            {producto.nombre_producto}
          </Text>

          <View style={style.footerRow}>
            <Text style={style.priceText}>
              ${producto.precio}
            </Text>
            <Text style={style.priceText}>
              {producto.Estado}
            </Text>
            <View style={style.stockBadge}>
              <Text style={style.stockText}>
                Stock: {producto.existencias}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 8,
    width: 170,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#F7F9FC',
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#A0AEC0',
    fontSize: 12,
  },
  infoContainer: {
    padding: 12,
    justifyContent: 'space-between',
  },
  brandText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2B6CB0',
  },
  stockBadge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4A5568',
  },
});