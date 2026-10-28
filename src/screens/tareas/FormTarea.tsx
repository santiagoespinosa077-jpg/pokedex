import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackTareaParams } from '../../navigator/TareaStackNavigator';
import { useTareaForm } from '../../hooks/useTareaForm';
import { EstadoTarea, siguienteEstado } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackTareaParams,'FormTarea'>{};


export const FormTarea = ( { route, navigation }:Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete, handleUpdate } = useTareaForm();

  useEffect( () => {
    const tarea = route.params;
    handleInputChange('id_tarea', tarea.id_tarea);
    handleInputChange('titulo', tarea.titulo);
    handleInputChange('descripcion', tarea.descripcion);
    handleInputChange('estado', tarea.estado);
  },[]);

  return(
    <View
      style={{ flex: 1 }}
    >
      <Image
        style={{
          ...StyleSheet.absoluteFill,
          opacity: 0.77
        }}
        resizeMode='cover'
        source={ require('./../../../assets/Van.jpg') }
      />
    <ScrollView
      contentContainerStyle={ appTheme.container }
    >
      <Fab
        title='<-'
        color='olive'
        action={ () => navigation.popToTop() }
        position='left'
      />
      <View
        style={{
          ...appTheme.container,
          Color: 'yellow'
        }}
      >
      <Text
        style={{
          ...appTheme.text,
          color: 'white',
          borderColor: "yellow",
        }}
      >
        Lista de Tareas
      </Text>
      <View>
        <TextInput
          style={{
            ...appTheme.textInput,
            color: 'black',
            borderColor: 'olive',
            fontSize: 18
          }}
          value={ state.titulo }
          onChangeText={ (text) => handleInputChange('titulo', text) }
          placeholder='Ingresa el título de la tarea'
          placeholderTextColor='black'
        />
        <TextInput
          style={{
             ...appTheme.textInput,
            color: 'black',
            borderColor: 'olive',
            fontSize: 18
          }}
          value={ state.descripcion }
          onChangeText={ (text) => handleInputChange('descripcion', text) }
          placeholder='Descripción de la tarea'
          placeholderTextColor='black'
          multiline
        />
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <BtnTouch
            text={ ( state.id_tarea == 0 ) ? 'Crear tarea' : 'Actualizar tarea' }
            color='#3B6FB6'
            borderColor='#F4EBC1'
            onPress={ async () => {
              await handleSubmit();
              navigation.popToTop();
            }}
          />
        </View>
        <View
          style={{
            alignItems:'center',
            alignContent: 'center'
          }}
        >
        {
          ( state.id_tarea != 0 ) && (
            <BtnTouch
              text='Eliminar tarea'
              color='red'
              borderColor='olive'
              onPress={ async () => {
                await handleDelete();
                navigation.popToTop();
              }}
            />
          )
        }
        {
        ( state.id_tarea !== 0 ) && (
          <BtnTouch
            text={ `${siguienteEstado(state.estado)}` }
            color='red'
            borderColor='olive'
            onPress={ async () => {
              await handleUpdate( siguienteEstado(state.estado) );
              navigation.popToTop();
              }}
              />
          )
        }
      </View>
      </View>
    </View>
    </ScrollView>
  </View>
  );
}