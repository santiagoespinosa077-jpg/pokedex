import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { TareaResponse, EstadoTarea } from '../../interfaces/pandoraApiResponse';
import { useTareaApi } from '../../hooks/useTareaApi';
import { TareaCard } from '../../components/TareaCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BtnTouch } from '../../components/BtnTouch';
import {FormTareaData} from "../../hooks/useTareaForm";

export const HomeTareas = () => {

  const { isLoading, loadTarea, listTarea } = useTareaApi();

  const focused = useIsFocused();

  const navigation = useNavigation();

  useEffect( () => {
    (!isLoading) && loadTarea();
  }, [ focused ]);

  const create: TareaResponse = {
    id_tarea: 0,
    titulo: '',
    descripcion: '',
    estado: EstadoTarea.pendiente
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
        source={ require('./../../../assets/loto.jpg') }
      />
      <View style={styles.overlay} />

      <FlatList
        data={ listTarea }
        keyExtractor={ (item) => `#${item.id_tarea}` }
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
              Lista de tareas
            </Text>
            <View style={styles.buttonContainer}>
              <BtnTouch
                color='#1F4E9C'
                borderColor='#F4EBC1'
                text='Crear tarea'
                borderWidth={2}
                onPress={ () => navigation.navigate('FormTarea', { ...create }) }
              />
            </View>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadTarea }
            colors={[ 'olive', 'yellow', 'black' ]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={ ({ item }) => (
          <TareaCard
            tarea={ item }
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