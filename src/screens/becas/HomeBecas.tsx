import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BecaResponse, TipoBeca } from '../../interfaces/pandoraApiResponse';
import { useBecaApi } from '../../hooks/useBecaApi';
import { BecaCard } from '../../components/BecaCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeBecas = () => {

  const { isLoading, loadBeca, listBeca } = useBecaApi();

  const focused = useIsFocused();

  const navigation = useNavigation();

  useEffect( () => {
    (!isLoading) && loadBeca();
  }, [ focused ]);

  const create: BecaResponse = {
    id_beca: 0,
    nombre: '',
    matricula: '',
    carrera: '',
    promedio: '',
    semestre: '',
    email: '',
    telefono: '',
    justificacion: '',
    documentacion: '',
    tipo: TipoBeca.escolar
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
        source={ require('./../../../assets/black.jpg') }
      />
      <View style={styles.overlay} />

      <FlatList
        data={ listBeca }
        keyExtractor={ (item) => `#${item.id_beca}` }
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
              Lista de becas
            </Text>
            <View style={styles.buttonContainer}>
              <BtnTouch
                color='#1F4E9C'
                borderColor='gray'
                text='Crear beca'
                borderWidth={2}
                onPress={ () => navigation.navigate('FormBeca', { ...create }) }
              />
            </View>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadBeca }
            colors={[ 'olive', 'yellow', 'black' ]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={ ({ item }) => (
          <BecaCard
            beca={ item }
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