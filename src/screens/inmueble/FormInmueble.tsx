import { useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TextInputProps, ScrollView, Image,
  StyleSheet, StatusBar, TouchableOpacity, Alert, StyleProp, ViewStyle,
} from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackInmuebleParams } from '../../navigator/InmuebleStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useInmuebleForm, FormInmuebleData } from '../../hooks/useInmuebleForm';
import { Tipo, Operacion } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackInmuebleParams, 'FormInmueble'> {};

type ImagenKey = 'imagen1' | 'imagen2' | 'imagen3' | 'imagen4';

const REQUERIDOS: (keyof FormInmuebleData)[] = [
  'titulo', 'operacion', 'precio', 'direccion', 'contacto',
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
  morado: '#8a36d2',
};

const OPCIONES_OPERACION = [
  { valor: Operacion.venta, color: C.acento },
  { valor: Operacion.renta, color: C.exito },
];

const OPCIONES_TIPO = [
  { valor: Tipo.residencial, color: C.acento },
  { valor: Tipo.comercial, color: C.aviso },
  { valor: Tipo.industriales, color: C.exito },
  { valor: Tipo.rusticos, color: C.morado },
];

interface SelectorProps<T extends string> {
  label: string;
  opciones: { valor: T; color: string }[];
  seleccionado: T;
  onSelect: (valor: T) => void;
}


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

interface FotoProps {
  imagen: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  onPick: () => void;
  onRemove: () => void;
}

const Foto = ({ imagen, label, style, onPick, onRemove }: FotoProps) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPick} style={[styles.foto, style]}>
    {imagen ? (
      <>
        <Image
          style={styles.fotoImg}
          source={{ uri: `data:image/png;base64,${imagen}` }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRemove}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.fotoQuitar}
        >
          <Text style={styles.fotoQuitarText}>✕</Text>
        </TouchableOpacity>
      </>
    ) : (
      <View style={styles.fotoVacia}>
        <Text style={styles.fotoMas}>+</Text>
        <Text style={styles.imagePlaceholderText}>{label}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export const FormInmueble = ( { route, navigation }: Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete } = useInmuebleForm();
  const { image64, pickImage } = useImagePicker();
  const slotActual = useRef<ImagenKey>('imagen1');

  useEffect(() => {
    const i = route.params;
    handleInputChange('id_im', i.id_im);
    handleInputChange('titulo', i.titulo);
    handleInputChange('operacion', i.operacion);
    handleInputChange('tipo', i.tipo);
    handleInputChange('precio', i.precio ? String(i.precio) : '');
    handleInputChange('direccion', i.direccion);
    handleInputChange('superficie', i.superficie ? String(i.superficie) : '');
    handleInputChange('habitaciones', i.habitaciones ? String(i.habitaciones) : '');
    handleInputChange('banos', i.banos ? String(i.banos) : '');
    handleInputChange('descripcion', i.descripcion ?? '');
    handleInputChange('contacto', i.contacto ?? '');
    handleInputChange('imagen1', i.imagen1 ?? '');
    handleInputChange('imagen2', i.imagen2 ?? '');
    handleInputChange('imagen3', i.imagen3 ?? '');
    handleInputChange('imagen4', i.imagen4 ?? '');
  }, []);

  useEffect(() => {
    image64 && handleInputChange(slotActual.current, image64);
  }, [image64]);

  const elegirImagen = (key: ImagenKey) => {
    slotActual.current = key;
    pickImage();
  };

  const esNuevo = state.id_im === 0;

  const guardar = async () => {
    const faltantes = REQUERIDOS.filter((k) => !String(state[k] ?? '').trim());
    if (faltantes.length > 0) {
      Alert.alert('Faltan campos', `Completa: ${faltantes.join(', ')}`);
      return;
    }
    try {
      await handleSubmit();
      navigation.popToTop();
    } catch (e: any) {
      Alert.alert('No se pudo guardar', 'Revisa los datos e inténtalo de nuevo.');
    }
  };

  const eliminar = async () => {
    try {
      await handleDelete();
      navigation.popToTop();
    } catch (e: any) {
      Alert.alert('No se pudo eliminar', 'Inténtalo de nuevo.');
    }
  };

  const campo = (
    label: string,
    field: keyof FormInmuebleData,
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
            {esNuevo ? 'Nuevo inmueble' : 'Editar inmueble'}
          </Text>
          <Text style={styles.subtitle}>
            {esNuevo
              ? 'Completa la información del inmueble'
              : 'Edita la información del inmueble'}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {campo('TÍTULO', 'titulo', 'Casa en el centro')}
          {campo('DIRECCIÓN', 'direccion', 'Calle, número, colonia')}
          {campo('PRECIO', 'precio', '0', { keyboardType: 'numeric' })}
          {campo('SUPERFICIE (M²)', 'superficie', '0', { keyboardType: 'numeric' })}
          {campo('HABITACIONES', 'habitaciones', '0', { keyboardType: 'numeric' })}
          {campo('BAÑOS', 'banos', '0', { keyboardType: 'numeric' })}
          {campo('CONTACTO', 'contacto', 'Teléfono o correo')}
          {campo('DESCRIPCIÓN', 'descripcion', 'Describe el inmueble...', {
            multiline: true,
            textAlignVertical: 'top',
          })}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>IMÁGENES</Text>
            

            <Foto
              imagen={state.imagen1}
              label="Agregar portada"
              style={styles.portada}
              onPick={() => elegirImagen('imagen1')}
              onRemove={() => handleInputChange('imagen1', '')}
            />

            <View style={styles.miniaturas}>
              {(['imagen2', 'imagen3', 'imagen4'] as ImagenKey[]).map((key, i) => (
                <Foto
                  key={key}
                  imagen={state[key]}
                  label={`Foto ${i + 2}`}
                  style={[styles.miniatura, i > 0 && styles.miniaturaSeparada]}
                  onPick={() => elegirImagen(key)}
                  onRemove={() => handleInputChange(key, '')}
                />
              ))}
            </View>
          </View>

          <Selector
            label="OPERACIÓN"
            opciones={OPCIONES_OPERACION}
            seleccionado={state.operacion}
            onSelect={(valor) => handleInputChange('operacion', valor)}
          />
          <Selector
            label="TIPO"
            opciones={OPCIONES_TIPO}
            seleccionado={state.tipo}
            onSelect={(valor) => handleInputChange('tipo', valor)}
          />

          <View style={styles.buttonGroup}>
            <BtnTouch
              text={esNuevo ? 'Crear' : 'Actualizar'}
              color={C.acento}
              borderColor="transparent"
              borderWidth={0}
              onPress={guardar}
            />

            {!esNuevo && (
              <View style={styles.actionMargin}>
                <BtnTouch
                  text="Eliminar"
                  color="transparent"
                  borderColor={C.peligro}
                  borderWidth={1}
                  onPress={eliminar}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FormInmueble;

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
  hint: {
    color: C.placeholder,
    fontSize: 12,
    marginBottom: 10,
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
  foto: {
    backgroundColor: C.superficieInput,
    borderColor: C.bordeInput,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  portada: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 8,
  },
  miniaturas: {
    flexDirection: 'row',
  },
  miniatura: {
    flex: 1,
    aspectRatio: 1,
  },
  miniaturaSeparada: {
    marginLeft: 8,
  },
  fotoImg: {
    width: '100%',
    height: '100%',
  },
  fotoVacia: {
    alignItems: 'center',
  },
  fotoMas: {
    color: C.textoSecundario,
    fontSize: 24,
    fontWeight: '300',
  },
  fotoQuitar: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 13,
    height: 26,
    justifyContent: 'center',
    position: 'absolute',
    right: 6,
    top: 6,
    width: 26,
  },
  fotoQuitarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
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