import { useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TextInputProps, ScrollView, Image,
  StyleSheet, StatusBar, TouchableOpacity, Alert,
} from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackMantenimientoParams } from '../../navigator/MantenimientoStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useMantenimientoForm, FormMantenimientoData } from '../../hooks/useMantenimientoForm';
import { EstadoMantenimiento, Prioridad } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackMantenimientoParams, 'FormMantenimiento'> {};

type ImagenKey = 'imagen1' | 'imagen2' | 'imagen3' | 'imagen4';
const IMAGENES: ImagenKey[] = ['imagen1', 'imagen2', 'imagen3', 'imagen4'];

const REQUERIDOS: (keyof FormMantenimientoData)[] = [
  'solicitante', 'area', 'ubicacion', 'tipo_mantenimiento', 'equipo', 'descripcion',
];

const C = {
  fondo: '#090d16',
  superficieInput: '#111827',
  bordeInput: 'rgba(255, 255, 255, 0.1)',
  acento: '#6366f1',
  textoPrincipal: '#f8fafc',
  textoSecundario: '#94a3b8',
  placeholder: '#475569',
  inactivo: '#64748b',
  peligro: '#ef4444',
  exito: '#22c55e',
  aviso: '#f59e0b',
};

const OPCIONES_ESTADO = [
  { valor: EstadoMantenimiento.pendiente, color: C.aviso },
  { valor: EstadoMantenimiento.en_proceso, color: C.acento },
  { valor: EstadoMantenimiento.completado, color: C.exito },
];

const OPCIONES_PRIORIDAD = [
  { valor: Prioridad.baja, color: C.exito },
  { valor: Prioridad.normal, color: C.acento },
  { valor: Prioridad.alta, color: C.peligro },
];

interface SelectorProps<T extends string> {
  label: string;
  opciones: { valor: T; color: string }[];
  seleccionado: T;
  onSelect: (valor: T) => void;
}

// Todas las opciones visibles: la elegida se enciende con su color, las demás quedan en gris
const Selector = <T extends string>({ label, opciones, seleccionado, onSelect }: SelectorProps<T>) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chipsRow}>
      {opciones.map(({ valor, color }) => {
        const activo = valor === seleccionado;
        return (
          <TouchableOpacity
            key={valor}
            activeOpacity={0.8}
            onPress={() => onSelect(valor)}
            style={[styles.chip, activo && { backgroundColor: color, borderColor: color }]}
          >
            <Text style={[styles.chipText, activo && styles.chipTextActive]}>
              {valor}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export const FormMantenimiento = ( { route, navigation }: Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete } = useMantenimientoForm();
  const { image64, pickImage } = useImagePicker();
  const slotActual = useRef<ImagenKey>('imagen1');

  useEffect(() => {
    const m = route.params;
    handleInputChange('id_in', m.id_in);
    handleInputChange('solicitante', m.solicitante);
    handleInputChange('area', m.area);
    handleInputChange('ubicacion', m.ubicacion);
    handleInputChange('tipo_mantenimiento', m.tipo_mantenimiento);
    handleInputChange('equipo', m.equipo);
    handleInputChange('descripcion', m.descripcion);
    handleInputChange('prioridad', m.prioridad);
    handleInputChange('estado', m.estado);
    handleInputChange('tecnico', m.tecnico ?? '');
    handleInputChange('observaciones', m.observaciones ?? '');
    IMAGENES.forEach((k) => handleInputChange(k, m[k] ?? ''));
  }, []);

  useEffect(() => {
    image64 && handleInputChange(slotActual.current, image64);
  }, [image64]);

  const elegirImagen = (key: ImagenKey) => {
    slotActual.current = key;
    pickImage();
  };

  const esNuevo = state.id_in === 0;

  const guardar = async () => {
    const faltantes = REQUERIDOS.filter((k) => !String(state[k] ?? '').trim());
    if (faltantes.length > 0) {
      Alert.alert('Faltan campos', `Completa: ${faltantes.join(', ')}`);
      return;
    }
    await handleSubmit();
    navigation.popToTop();
  };

  const campo = (
    label: string,
    field: keyof FormMantenimientoData,
    placeholder: string,
    extra?: TextInputProps,
  ) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, extra?.multiline && styles.textArea]}
        value={String(state[field] ?? '')}
        onChangeText={(text) => handleInputChange(field, text)}
        placeholder={placeholder}
        placeholderTextColor={C.placeholder}
        {...extra}
      />
    </View>
  );

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
            {esNuevo ? 'Nueva solicitud' : 'Editar solicitud'}
          </Text>
          <Text style={styles.subtitle}>
            {esNuevo
              ? 'Completa la información de la solicitud'
              : 'Edita la información de la solicitud'}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {campo('SOLICITANTE', 'solicitante', 'Nombre del solicitante')}
          {campo('ÁREA', 'area', 'Escribe el área')}
          {campo('UBICACIÓN', 'ubicacion', 'Escribe la ubicación')}
          {campo('TIPO DE MANTENIMIENTO', 'tipo_mantenimiento', 'Preventivo, correctivo...')}
          {campo('EQUIPO', 'equipo', 'Escribe el equipo')}
          {campo('TÉCNICO', 'tecnico', 'Técnico asignado')}
          {campo('DESCRIPCIÓN', 'descripcion', 'Describe el problema...', {
            multiline: true,
            textAlignVertical: 'top',
          })}
          {campo('OBSERVACIONES', 'observaciones', 'Observaciones...', {
            multiline: true,
            textAlignVertical: 'top',
          })}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>IMÁGENES</Text>
            <View style={styles.imagesGrid}>
              {IMAGENES.map((key) => (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  onPress={() => elegirImagen(key)}
                  style={styles.imageSlot}
                >
                  {state[key] ? (
                    <Image
                      style={styles.image}
                      source={{ uri: `data:image/png;base64,${state[key]}` }}
                    />
                  ) : (
                    <Text style={styles.imagePlaceholderText}>+ Foto</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Estado y prioridad: solo al editar */}
          {!esNuevo && (
            <>
              <Selector
                label="ESTADO"
                opciones={OPCIONES_ESTADO}
                seleccionado={state.estado}
                onSelect={(valor) => handleInputChange('estado', valor)}
              />
              <Selector
                label="PRIORIDAD"
                opciones={OPCIONES_PRIORIDAD}
                seleccionado={state.prioridad}
                onSelect={(valor) => handleInputChange('prioridad', valor)}
              />
            </>
          )}

          {/* Grupo de Botones de Acción */}
          <View style={styles.buttonGroup}>
            <BtnTouch
              text={esNuevo ? 'Crear solicitud' : 'Actualizar solicitud'}
              color={C.acento}
              borderColor="transparent"
              borderWidth={0}
              onPress={guardar}
            />

            {!esNuevo && (
              <View style={styles.actionMargin}>
                <BtnTouch
                  text="Eliminar solicitud"
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

export default FormMantenimiento;

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
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: C.superficieInput,
    borderColor: C.bordeInput,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipText: {
    color: C.inactivo,
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextActive: {
    color: 'white',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageSlot: {
    width: '47%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.bordeInput,
    backgroundColor: C.superficieInput,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholderText: {
    color: C.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
  },
  buttonGroup: {
    marginTop: 16,
  },
  actionMargin: {
    marginTop: 12,
  },
});