import { useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, StatusBar,
  TouchableOpacity, KeyboardTypeOptions,
} from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackBecaParams } from '../../navigator/BecaStackNavigator';
import { useBecaForm, FormBecaData } from '../../hooks/useBecaForm';
import { TipoBeca } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackBecaParams, 'FormBeca'> {};

const C = {
  fondo: '#090d16',
  superficieInput: '#111827',
  bordeInput: 'rgba(255, 255, 255, 0.1)',
  acento: '#6366f1',
  textoPrincipal: '#f8fafc',
  textoSecundario: '#94a3b8',
  placeholder: '#475569',
  peligro: '#ef4444',
  tagBg: 'rgba(99, 102, 241, 0.15)',
};

interface Campo {
  key:          keyof FormBecaData;
  label:        string;
  placeholder:  string;
  keyboard?:    KeyboardTypeOptions;
  multiline?:   boolean;
}

// Se define una sola vez para no repetir el mismo bloque 9 veces
const campos: Campo[] = [
  { key: 'nombre',        label: 'NOMBRE COMPLETO', placeholder: 'Escribe tu nombre' },
  { key: 'matricula',     label: 'MATRÍCULA',       placeholder: 'Escribe tu matrícula' },
  { key: 'carrera',       label: 'CARRERA',         placeholder: 'Escribe tu carrera' },
  { key: 'promedio',      label: 'PROMEDIO',        placeholder: 'Ej. 9.2', keyboard: 'decimal-pad' },
  { key: 'semestre',      label: 'SEMESTRE',        placeholder: 'Ej. 5', keyboard: 'number-pad' },
  { key: 'email',         label: 'CORREO',          placeholder: 'correo@ejemplo.com', keyboard: 'email-address' },
  { key: 'telefono',      label: 'TELÉFONO',        placeholder: 'Escribe tu teléfono', keyboard: 'phone-pad' },
  { key: 'justificacion', label: 'JUSTIFICACIÓN',   placeholder: 'Explica por qué necesitas la beca...', multiline: true },
  { key: 'documentacion', label: 'DOCUMENTACIÓN',   placeholder: 'Nombre o ruta del documento' },
];

export const FormBeca = ( { route, navigation }: Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete } = useBecaForm();

  useEffect(() => {
    const beca = route.params;
    (Object.keys(beca) as (keyof FormBecaData)[]).forEach( campo => {
      handleInputChange(campo, beca[campo]);
    });
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      {/* Fab con wrapper sin colisión de eventos */}
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
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {state.id_beca === 0 ? 'Nueva beca' : 'Editar beca'}
          </Text>
          <Text style={styles.subtitle}>
            Captura los datos de la solicitud de beca
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>

          {campos.map( campo => (
            <View key={campo.key} style={styles.fieldGroup}>
              <Text style={styles.label}>{campo.label}</Text>
              <TextInput
                style={[styles.input, campo.multiline && styles.textArea]}
                value={String(state[campo.key])}
                onChangeText={(text) => handleInputChange(campo.key, text)}
                placeholder={campo.placeholder}
                placeholderTextColor={C.placeholder}
                keyboardType={campo.keyboard}
                autoCapitalize={campo.key === 'email' ? 'none' : 'sentences'}
                multiline={campo.multiline}
                textAlignVertical={campo.multiline ? 'top' : 'center'}
              />
            </View>
          ))}

          {/* Tipo de beca */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>TIPO DE BECA</Text>
            <View style={styles.tipoRow}>
              {Object.values(TipoBeca).map( tipo => {
                const activo = state.tipo === tipo;
                return (
                  <TouchableOpacity
                    key={tipo}
                    activeOpacity={0.8}
                    style={[styles.chip, activo && styles.chipActivo]}
                    onPress={() => handleInputChange('tipo', tipo)}
                  >
                    <Text style={[styles.chipText, activo && styles.chipTextActivo]}>
                      {tipo}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Grupo de Botones de Acción */}
          <View style={styles.buttonGroup}>
            <BtnTouch
              text={state.id_beca === 0 ? 'Crear beca' : 'Actualizar beca'}
              color={C.acento}
              borderColor="transparent"
              borderWidth={0}
              onPress={async () => {
                await handleSubmit();
                navigation.popToTop();
              }}
            />

            {state.id_beca !== 0 && (
              <View style={styles.actionMargin}>
                <BtnTouch
                  text="Eliminar beca"
                  color="transparent"
                  borderColor={C.peligro}
                  borderWidth={1}
                  onPress={async () => {
                    await handleDelete();
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

export default FormBeca;

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
  textArea: {
    height: 110,
    paddingTop: 14,
    paddingBottom: 14,
  },
  tipoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.bordeInput,
    backgroundColor: C.superficieInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActivo: {
    backgroundColor: C.tagBg,
    borderColor: C.acento,
  },
  chipText: {
    color: C.textoSecundario,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActivo: {
    color: C.acento,
  },
  buttonGroup: {
    marginTop: 16,
  },
  actionMargin: {
    marginTop: 12,
  }
});