import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackUserParams } from '../../navigator/UserStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useLocation } from '../../hooks/useLocation';
import { useUserForm } from '../../hooks/useUserForm';

interface Props extends StackScreenProps<StackUserParams,'FormUser'>{};

export const FormUser = ( { route, navigation }:Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete  } = useUserForm();
  const { location } = useLocation();
  const { image64, pickImage } = useImagePicker()

  useEffect( () => {
    const user = route.params;
    handleInputChange('id_user', user.id_user);
    handleInputChange('username', user.username);
    handleInputChange('email', user.email);
    handleInputChange('imagen', user.imagen);
    handleInputChange('location', `${location?.coords.altitude},${location?.coords.latitude}`);
  },[]);

  useEffect( () => {
    image64 && handleInputChange('imagen', image64);
  },[ image64 ]);

  return(
    <View style={{ flex: 1 }}>
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
        <Text
          style={{
            ...appTheme.text,
            color: '#E0A526',
            borderColor: "yellow",
          }}
        >
          Formulario de usuarios
        </Text>
        <View>
          <View
            style={{
              alignItems:'center',
              alignContent:'center'
            }}
          >
          {
              (state.imagen) && (
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: "yellow",
                  }}
                  source={{
                    uri: `data:image/png;base64,${state.imagen}`
                  }}
                />
              )
            }
            </View>
          <TextInput
            style={{
              ...appTheme.textInput,
              color: 'black',
              borderColor: 'olive',
              fontSize: 18
            }}
            value={ state.username }
            onChangeText={ (text) => handleInputChange('username',text) }
            placeholder='Ingresa el nombre del usuario'
            placeholderTextColor='black'
          />
          <TextInput
            style={{
              ...appTheme.textInput,
              color: 'olive',
              borderColor: 'olive',
              fontSize: 18
            }}
            value={ state.password }
            onChangeText={ (text) => handleInputChange('password',text) }
            placeholder='Contraseña del usuario'
            placeholderTextColor='black'
            keyboardType='default'
            secureTextEntry={true}
          />
          <TextInput
            style={{
              ...appTheme.textInput,
              color: 'black',
              borderColor: 'olive',
              fontSize: 18
            }}
            value={ state.email }
            onChangeText={ (text) => handleInputChange('email',text) }
            placeholder='correo'
            placeholderTextColor='black'
            keyboardType='default'
          />
          <View
            style={{
              alignContent: "center",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BtnTouch
              text='Seleccionar Imagen'
              color='#3B6FB6'
              borderColor='#F4EBC1'
              onPress={ () => pickImage() }
            />
          </View>
          <View
            style={{
              alignContent: "center",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BtnTouch
              text={ ( state.id_user == 0 ) ? 'Crear usuario' : 'Actualizar' }
              color='#3B6FB6'
              borderColor='#F4EBC1'
              onPress={ () => {
                handleSubmit();
                navigation.popToTop();
              }}
            />
            <View>
          {
            ( state.id_user != 0 ) && (
              <BtnTouch
                text='Eliminar'
                color='red'
                borderColor='olive'
                onPress={ () => {
                  handleDelete();
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