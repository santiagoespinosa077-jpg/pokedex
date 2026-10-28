import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackTareaParams } from '../../navigator/TareaStackNavigator';
import { useTareaForm } from '../../hooks/useTareaForm';
import { EstadoTarea, siguienteEstado } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackTareaParams, 'FormTarea'> {};

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

export const FormTarea = ( { route, navigation }: Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete, handleUpdate } = useTareaForm();

  useEffect(() => {
    const tarea = route.params;
    handleInputChange('id_tarea', tarea.id_tarea);
    handleInputChange('titulo', tarea.titulo);
    handleInputChange('descripcion', tarea.descripcion);
    handleInputChange('estado', tarea.estado);
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
            {state.id_tarea === 0 ? 'Nueva tarea' : 'Editar tarea'}
          </Text>
          <Text style={styles.subtitle}>
            Gestiona el estado y los detalles de tu tarea
          </Text>
          
          {state.id_tarea !== 0 && state.estado && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                ESTADO ACTUAL: {String(state.estado).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>TÍTULO DE LA TAREA</Text>
            <TextInput
              style={styles.input}
              value={state.titulo}
              onChangeText={(text) => handleInputChange('titulo', text)}
              placeholder="Escribe el título"
              placeholderTextColor={C.placeholder}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>DESCRIPCIÓN</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={state.descripcion}
              onChangeText={(text) => handleInputChange('descripcion', text)}
              placeholder="Escribe una breve descripción..."
              placeholderTextColor={C.placeholder}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Grupo de Botones de Acción */}
          <View style={styles.buttonGroup}>
            <BtnTouch
              text={state.id_tarea === 0 ? 'Crear tarea' : 'Actualizar tarea'}
              color={C.acento}
              borderColor="transparent"
              borderWidth={0}
              onPress={async () => {
                await handleSubmit();
                navigation.popToTop();
              }}
            />

            {state.id_tarea !== 0 && (
              <>
                <View style={styles.actionMargin}>
                  <BtnTouch
                    text={`${siguienteEstado(state.estado)}`}
                    color="transparent"
                    borderColor={C.acento}
                    borderWidth={1}
                    onPress={async () => {
                      await handleUpdate(siguienteEstado(state.estado));
                      navigation.popToTop();
                    }}
                  />
                </View>

                <View style={styles.actionMargin}>
                  <BtnTouch
                    text="Eliminar tarea"
                    color="transparent"
                    borderColor={C.peligro}
                    borderWidth={1}
                    onPress={async () => {
                      await handleDelete();
                      navigation.popToTop();
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FormTarea;

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
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  statusText: {
    color: C.acento,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  buttonGroup: {
    marginTop: 16,
  },
  actionMargin: {
    marginTop: 12,
  }
});