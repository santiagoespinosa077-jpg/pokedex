import { useRef } from 'react';
import {ActivityIndicator,KeyboardAvoidingView,Platform,ScrollView,StatusBar,StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useLogin } from '../../hooks/useLogin';

// Nueva paleta: Indigo Cyberpunk
const C = {
  fondo: '#090d16',
  superficieInput: '#111827',
  bordeInput: 'rgba(129, 140, 248, 0.25)',
  acento: '#6366f1',
  acentoGlow: 'rgba(99, 102, 241, 0.2)',
  textoPrincipal: '#f8fafc',
  textoSecundario: '#94a3b8',
  placeholder: '#475569'
};

export const LoginUser = () => {
  const { state, isLoading, handleInputChange, handleLogin } = useLogin();
  const passwordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Glow decorativo de fondo superior */}
        <View style={styles.topGlow} />

        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>MoteurStock</Text>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Ingresa con tus credenciales para continuar</Text>
        </View>

        {/* Formulario principal */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={state.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={C.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={passwordRef}
                style={styles.input}
                value={state.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="••••••••"
                placeholderTextColor={C.placeholder}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={() => handleLogin()}
              />
            </View>
          </View>

          {/* Botón de acción */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={() => handleLogin()}
            disabled={isLoading}
            activeOpacity={0.82}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginUser;

const styles = StyleSheet.create({
  root: {
    backgroundColor: C.fondo,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  topGlow: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: C.acentoGlow,
    opacity: 0.8,
  },
  header: {
    marginBottom: 36,
  },
  brandTitle: {
    color: C.acento,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: C.textoPrincipal,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: C.textoSecundario,
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    color: C.textoSecundario,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: C.superficieInput,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.bordeInput,
    overflow: 'hidden',
  },
  input: {
    color: C.textoPrincipal,
    fontSize: 16,
    height: 54,
    paddingHorizontal: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: C.acento,
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: C.acento,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});