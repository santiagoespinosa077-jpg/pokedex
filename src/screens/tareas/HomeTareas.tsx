import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { TareaResponse, EstadoTarea } from '../../interfaces/pandoraApiResponse';
import { useTareaApi } from '../../hooks/useTareaApi';
import { TareaCard } from '../../components/TareaCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeTareas = () => {

  const { isLoading, loadTarea, listTarea, updateTarea } = useTareaApi();

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

    <View
      style={ appTheme.container }
    >
      <Image
      style={{
          width: 380,
          height: 800,
          position: 'absolute',
          opacity: 0.77
        }}
        source={ require('./../../../assets/Van.jpg') }
      />
      <FlatList
        data={ listTarea }
        keyExtractor={ (item) => `#${item.id_tarea}` }
        ListHeaderComponent={(
          <View
            style={ appTheme.container }
          >
            <Text
              style={{
                ...appTheme.text,
                color: '#E0A526'
              }}
            >
              Lista de tareas
            </Text>
            <BtnTouch
              color='#1F4E9C'
              borderColor='#F4EBC1'
              text='Crear tarea'
              onPress={ () => navigation.navigate('FormTarea', { ...create }) }
            />
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