import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { useApiUrl } from '../hooks/useApiUrl';

const C = {
  fondo: '#0e1116',
  tarjeta: '#171c24',
  borde: '#2a3340',
  texto: '#f3f4f6',
  suave: '#9aa4b2',
  frio: '#2dd4bf',
  verde: '#7bdc6c',
};

export const ConfigServidorScreen = () => {
  const { apiUrl, guardarApiUrl } = useApiUrl();
  const [url, setUrl] = useState(apiUrl);
  const [mensaje, setMensaje] = useState('');

  const guardar = async () => {
    Keyboard.dismiss();
    const guardada = await guardarApiUrl(url);
    setUrl(guardada);
    setMensaje('Dirección guardada. Las pantallas de datos se recargan solas.');
  };

  return (
    <ScrollView
      style={style.pantalla}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={style.encabezado}>
        <Text style={style.header}>Servidor</Text>
        <Text style={style.sub}>Dirección de la API para todas las pantallas</Text>
      </View>

      <View style={style.tarjeta}>
        <Text style={style.titulo}>URL de la API</Text>
        <Text style={style.subtitulo}>Ejemplo: http://192.168.1.15:3000</Text>

        <TextInput
          style={style.input}
          value={url}
          onChangeText={text => {
            setUrl(text);
            setMensaje('');
          }}
          placeholder="http://192.168.1.15:3000"
          placeholderTextColor={C.suave}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <Pressable style={style.boton} onPress={guardar}>
          <Text style={style.botonTexto}>Guardar</Text>
        </Pressable>

        {mensaje !== '' && <Text style={style.mensaje}>{mensaje}</Text>}

        <Text style={style.actual}>En uso: {apiUrl}</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: C.fondo },
  encabezado: { marginBottom: 12 },
  header: { color: C.texto, fontSize: 26, fontWeight: 'bold' },
  sub: { color: C.suave, fontSize: 14, marginTop: 2 },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 15
  },
  titulo: { color: C.texto, fontSize: 17, fontWeight: 'bold' },
  subtitulo: { color: C.suave, fontSize: 13, marginTop: 2, marginBottom: 14 },
  input: {
    color: C.texto,
    borderColor: C.borde,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12
  },
  boton: { backgroundColor: C.frio, borderRadius: 10, padding: 12, alignItems: 'center' },
  botonTexto: { color: C.fondo, fontWeight: 'bold' },
  mensaje: { color: C.verde, fontSize: 13, marginTop: 12 },
  actual: { color: C.suave, fontSize: 12, marginTop: 12 }
});