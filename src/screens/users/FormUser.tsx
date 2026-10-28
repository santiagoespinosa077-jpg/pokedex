import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackUserParams } from '../../navigator/UserStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useLocation } from '../../hooks/useLocation';
import { useUserForm } from '../../hooks/useUserForm';

interface Props extends StackScreenProps<StackUserParams,'FormUser'>{};

const C = {
  fondo: '#090d16',
  superficieInput: '#111827',
  bordeInput: 'rgba(255, 255, 255, 0.1)',
  acento: '#6366f1',
  textoPrincipal: '#f8fafc',
  textoSecundario: '#94a3b8',
  placeholder: '#475569',
  peligro: '#ef4444'
};

export const FormUser = ( { route, navigation }: Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete } = useUserForm();
  const { location } = useLocation();
  const { image64, pickImage } = useImagePicker();

  useEffect(() => {
    const user = route.params;
    handleInputChange('id_user', user.id_user);
    handleInputChange('username', user.username);
    handleInputChange('email', user.email);
    handleInputChange('imagen', user.imagen);
    handleInputChange('location', `${location?.coords.altitude},${location?.coords.latitude}`);
  }, []);

  useEffect(() => {
    image64 && handleInputChange('imagen', image64);
  }, [image64]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      {/* Contenedor con zIndex para asegurar que el FAB reciba toques sin interferir */}
      <View style={styles.fabWrapper} pointerEvents="box-none">
        <Fab
          title="→"
          color={C.acento}
          action={() => navigation.popToTop()}
          position="right"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {state.id_user === 0 ? 'Crear usuario' : 'Editar usuario'}
          </Text>
          <Text style={styles.subtitle}>
            Completa la información del perfil
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => pickImage()} 
            style={styles.avatarTouch}
          >
            {state.imagen ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${state.imagen}` }}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>Añadir foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pickImage()} activeOpacity={0.7}>
            <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>NOMBRE DE USUARIO</Text>
            <TextInput
              style={styles.input}
              value={state.username}
              onChangeText={(text) => handleInputChange('username', text)}
              placeholder="Ingresa el nombre"
              placeholderTextColor={C.placeholder}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <TextInput
              style={styles.input}
              value={state.password}
              onChangeText={(text) => handleInputChange('password', text)}
              placeholder="••••••••"
              placeholderTextColor={C.placeholder}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <TextInput
              style={styles.input}
              value={state.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="correo@ejemplo.com"
              placeholderTextColor={C.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonGroup}>
            <BtnTouch
              text={state.id_user === 0 ? 'Guardar' : 'Actualizar'}
              color={C.acento}
              borderColor="transparent"
              borderWidth={0}
              onPress={() => {
                handleSubmit();
                navigation.popToTop();
              }}
            />

            {state.id_user !== 0 && (
              <View style={styles.deleteWrapper}>
                <BtnTouch
                  text="Eliminar"
                  color="transparent"
                  borderColor={C.peligro}
                  borderWidth={1}
                  onPress={() => {
                    handleDelete();
                    navigation.popToTop();
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FormUser;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.fondo,
  },
  fabWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    elevation: 99,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: C.textoPrincipal,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: C.textoSecundario,
    fontSize: 14,
    marginTop: 4,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarTouch: {
    marginBottom: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: C.bordeInput,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.superficieInput,
    borderWidth: 1,
    borderColor: C.bordeInput,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: C.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
  },
  changePhotoText: {
    color: C.acento,
    fontSize: 13,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    color: C.textoSecundario,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: C.superficieInput,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.bordeInput,
    color: C.textoPrincipal,
    fontSize: 15,
    height: 50,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    marginTop: 16,
    alignItems: 'center'
  },
  deleteWrapper: {
    marginTop: 12,
  }
});