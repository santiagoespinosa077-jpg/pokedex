import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { InmuebleResponse, Tipo } from '../../interfaces/pandoraApiResponse';
import { useInmuebleApi } from '../../hooks/useInmuebleApi';
import { InmuebleCard } from '../../components/InmuebleCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackInmuebleParams } from '../../navigator/InmuebleStackNavigator';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeInmueble = () => {

  const { isLoading, loadInmueble, listInmueble } = useInmuebleApi();

  const focused = useIsFocused();

  const navigation = useNavigation<StackNavigationProp<StackInmuebleParams>>();

  useEffect(() => {
    (!isLoading) && loadInmueble();
  }, [focused]);

  const create: InmuebleResponse = {
    id_im: 0,
    titulo: '',
    operacion: '',
    tipo: Tipo.residencial,
    precio: '',
    direccion: '',
    superficie: '',
    habitaciones: '',
    banos: '',
    descripcion: '',
    contacto: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
  };

  return (
    <View
      style={appTheme.container}
    >
      <Image
        style={{
          width: 380,
          height: 800,
          position: 'absolute',
          opacity: 0.77,
        }}
        source={require('./../../../assets/black.jpg')}
      />
      <FlatList
        data={listInmueble}
        keyExtractor={(item) => `#${item.id_im}`}
        ListHeaderComponent={(
          <View
            style={appTheme.container}
          >
            <Text
              style={{
                ...appTheme.text,
                color: 'white',
              }}
            >
              Lista de inmuebles
            </Text>
            <BtnTouch
              color='#3B6FB6'
              borderColor='gray'
              text='+ Nuevo'
              borderWidth={2}
              onPress={() => navigation.navigate('FormInmueble', { ...create })}
            />
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadInmueble}
            colors={["olive", "yellow", "black"]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <InmuebleCard
            inmueble={item}
          />
        )}
      />
    </View>
  );
};