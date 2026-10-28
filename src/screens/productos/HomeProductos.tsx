import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { ProductoResponse, EstadoProducto } from '../../interfaces/pandoraApiResponse';
import { useProductosApi } from '../../hooks/useProductosApi';
import { ProductoCard } from '../../components/ProductoCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BtnTouch } from '../../components/BtnTouch';
import {FormProductoForm} from '../../hooks/useProductoForm'

export const HomeProductos = () => {

  const { isLoading, loadProducto, listProducto } = useProductosApi();

  const focused = useIsFocused();

  const navigation = useNavigation();

  useEffect( () => {
    (!isLoading) && loadProducto();
  }, [ focused ]);

  const create: ProductoResponse = {
    id_producto: 0,
    sku:    '',
    nombre_producto: '',
    descripcion: '',
    categoria: '',
    marca: '',
    existencias: '',
    descripcion: '',
    provedor: '',
    estado:      EstadoProducto.normal,
    imagen: ''
  }

  return (

    <View style={styles.mainContainer}>
      <Image
        style={{
          width: 380,
          height: 800,
          position: 'absolute',
          opacity: 0.77
        }}
        source={ require('./../../../assets/Van.jpg') }
      />
      <View style={styles.overlay} />

      <FlatList
        data={ listProducto }
        keyExtractor={ (item) => `#${item.id_producto}` }
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ () => <View style={styles.separator} /> }
        ListHeaderComponent={(
          <View style={styles.headerContainer}>
            <Text
              style={{
                ...appTheme.text,
                ...styles.headerTitle,
              }}
            >
              Lista de Productos
            </Text>
            <View style={styles.buttonContainer}>
              <BtnTouch
                color='#1F4E9C'
                borderColor='#F4EBC1'
                text='Crear producto'
                onPress={ () => navigation.navigate('FormProducto', { ...create }) }
              />
            </View>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadProducto }
            colors={[ 'olive', 'yellow', 'black' ]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={ ({ item }) => (
          <ProductoCard
            producto={ item }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.77,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#F4EBC1',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  separator: {
    height: 10,
  },
});