import { useRef } from 'react';
import {ActivityIndicator,KeyboardAvoidingView,Platform,ScrollView,StatusBar,StyleSheet,Text,TextInput,TouchableOpacity} from 'react-native';
import { useLogin } from '../../hooks/useLogin';

const C = {
  fondo:  '#030a06',
  borde:  'rgba(226,232,240,0.2)',
  acento: '#059669',
  texto:  '#e2e8f0',
  suave:  '#94a3b8'
};

export const LoginUser = () => {
  const { state, isLoading, handleInputChange, handleLogin } = useLogin();
  const passwordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={ styles.root }
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={ styles.content }
        keyboardShouldPersistTaps="handled"
      >
        <Text style={ styles.title }>Iniciar sesión</Text>
        <Text style={ styles.subtitle }>Entra con tu correo y contraseña</Text>

        <Text style={ styles.label }>Correo</Text>
        <TextInput
          style={ styles.input }
          value={ state.email }
          onChangeText={ (text) => handleInputChange('email', text) }
          placeholder="tucorreo@ejemplo.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={ false }
          returnKeyType="next"
          onSubmitEditing={ () => passwordRef.current?.focus() }
        />

        <Text style={ styles.label }>Contraseña</Text>
        <TextInput
          ref={ passwordRef }
          style={ styles.input }
          value={ state.password }
          onChangeText={ (text) => handleInputChange('password', text) }
          placeholder="••••••••"
          placeholderTextColor="#64748b"
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={ () => handleLogin() }
        />

        <TouchableOpacity
          style={[ styles.button, isLoading && styles.buttonDisabled ]}
          onPress={ () => handleLogin() }
          disabled={ isLoading }
          activeOpacity={0.85}
        >
          {
            isLoading
              ? <ActivityIndicator color={ C.texto } />
              : <Text style={ styles.buttonText }>Entrar</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginUser;

const styles = StyleSheet.create({
  root: {
    backgroundColor: C.fondo,
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28
  },
  title: {
    color: C.texto,
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    color: C.suave,
    fontSize: 14,
    marginBottom: 28,
    marginTop: 4
  },
  label: {
    color: C.suave,
    fontSize: 12,
    marginBottom: 6
  },
  input: {
    borderColor: C.borde,
    borderRadius: 10,
    borderWidth: 1,
    color: C.texto,
    fontSize: 16,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  button: {
    alignItems: 'center',
    backgroundColor: C.acento,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 14
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: C.texto,
    fontSize: 16,
    fontWeight: '700'
  }
});