import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { MantenimientoResponse } from '../../interfaces/pandoraApiResponse';
import { EstadoMantenimiento, Prioridad } from '../../interfaces/pandoraApiResponse';
import { useMantenimientoApi } from '../../hooks/useMantenimientoApi';
import { MantenimientoCard } from '../../components/MantenimientoCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeMantenimiento = () => {

  const { isLoading, loadMantenimiento, listMantenimiento } = useMantenimientoApi();

  const focused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    (!isLoading) && loadMantenimiento();
  }, [focused]);

  const create: MantenimientoResponse = {
    id_in: 0,
    solicitante: '',
    area: '',
    ubicacion: '',
    tipo_mantenimiento: '',
    equipo: '',
    descripcion: '',
    prioridad: Prioridad.normal,
    fecha: new Date().toISOString(),
    tecnico: '',
    estado: EstadoMantenimiento.pendiente,
    observaciones: '',
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
        data={listMantenimiento}
        keyExtractor={(item) => `#${item.id_in}`}
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
              Solicitudes de mantenimiento
            </Text>
            <BtnTouch
              color='#3B6FB6'
              borderColor='gray'
              text='+ Nueva'
              borderWidth={2}
              onPress={() => navigation.navigate('FormMantenimiento', { ...create })}
            />
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadMantenimiento}
            colors={["olive", "yellow", "black"]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <MantenimientoCard
            mantenimiento={item}
          />
        )}
      />
    </View>
  );
};
