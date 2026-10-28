import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { StackProductoParams } from '../../navigator/PrductoStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useProductoForm } from '../../hooks/useProductoForm';
import { EstadoProducto, nextState } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackProductoParams, 'FormProductos'> {}

export const FormProducto = ({ route, navigation }: Props) => {
  const { state, handleInputChange, handleSubmit, handleDelete, handleUpdate } = useProductoForm();
  const { image64, pickImage } = useImagePicker();

  useEffect(() => {
    const producto = route.params;
    handleInputChange('id_producto', producto.id_producto);
    handleInputChange('sku', producto.sku);
    handleInputChange('nombre_producto', producto.nombre_producto);
    handleInputChange('categoria', producto.categoria);
    handleInputChange('marca', producto.marca);
    handleInputChange('precio', producto.precio);
    handleInputChange('existencias', producto.existencias);
    handleInputChange('descripcion', producto.descripcion);
    handleInputChange('provedor', producto.provedor);
    handleInputChange('estado', producto.estado);
    handleInputChange('imagen', producto.imagen);
  }, []);

  useEffect(() => {
    image64 && handleInputChange('imagen', image64);
  }, [image64]);

  const isEditing = state.id_producto !== 0;

  return (
    <View style={styles.mainContainer}>
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        source={require('./../../../assets/Van.jpg')}
      />

      <View style={styles.overlay} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Cabecera interna con el FAB alineado dentro de la tarjeta */}
          <View style={styles.headerRow}>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => navigation.popToTop()} 
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => pickImage()}
            style={styles.imagePickerContainer}
          >
            {state.imagen ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${state.imagen}` }}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>+ Cargar Foto</Text>
              </View>
            )}
            <View style={styles.imageBadge}>
              <Text style={styles.imageBadgeText}>Cambiar</Text>
            </View>
          </TouchableOpacity>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Nombre del Producto</Text>
            <TextInput
              style={styles.input}
              value={state.nombre_producto}
              onChangeText={(text) => handleInputChange('nombre_producto', text)}
              placeholder="Ej. Tenis Deportivos"
              placeholderTextColor="#A0AEC0"
            />

            <View style={styles.row}>
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>SKU</Text>
                <TextInput
                  style={styles.input}
                  value={state.sku}
                  onChangeText={(text) => handleInputChange('sku', text)}
                  placeholder="SKU-10203"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Marca</Text>
                <TextInput
                  style={styles.input}
                  value={state.marca}
                  onChangeText={(text) => handleInputChange('marca', text)}
                  placeholder="Marca"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Precio</Text>
                <TextInput
                  style={styles.input}
                  value={String(state.precio ?? '')}
                  keyboardType="decimal-pad"
                  onChangeText={(text) => handleInputChange('precio', text)}
                  placeholder="$0.00"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Existencias</Text>
                <TextInput
                  style={styles.input}
                  value={String(state.existencias ?? '')}
                  keyboardType="numeric"
                  onChangeText={(text) => handleInputChange('existencias', text)}
                  placeholder="0"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Categoría</Text>
            <TextInput
              style={styles.input}
              value={state.categoria}
              onChangeText={(text) => handleInputChange('categoria', text)}
              placeholder="Categoría del producto"
              placeholderTextColor="#A0AEC0"
            />

            <Text style={styles.inputLabel}>Proveedor</Text>
            <TextInput
              style={styles.input}
              value={state.provedor}
              onChangeText={(text) => handleInputChange('provedor', text)}
              placeholder="Nombre del proveedor"
              placeholderTextColor="#A0AEC0"
            />

            <Text style={styles.inputLabel}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={state.descripcion}
              onChangeText={(text) => handleInputChange('descripcion', text)}
              placeholder="Descripción detallada..."
              placeholderTextColor="#A0AEC0"
              multiline
              numberOfLines={3}
            />

            <View style={styles.actionsContainer}>
              <BtnTouch
                text={isEditing ? 'Guardar' : 'Crear'}
                color="#3B6FB6"
                borderColor="transparent"
                onPress={() => {
                  handleSubmit();
                  navigation.popToTop();
                }}
              />

              {isEditing && (
                <>
                  <BtnTouch
                    text={`${nextState(state.estado)}`}
                    color="#4A5568"
                    borderColor="transparent"
                    onPress={() => {
                      handleUpdate(nextState(state.estado));
                      navigation.popToTop();
                    }}
                  />

                  <BtnTouch
                    text="Eliminar"
                    color="#E53E3E"
                    borderColor="transparent"
                    onPress={() => {
                      handleDelete();
                      navigation.popToTop();
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B6FB6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3748',
    textAlign: 'center',
  },
  imagePickerContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#3B6FB6',
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EDF2F7',
    borderWidth: 2,
    borderColor: '#CBD5E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    color: '#718096',
    fontSize: 12,
    fontWeight: '600',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B6FB6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 4,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1A202C',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flexItem: {
    flex: 1,
  },
  actionsContainer: {
    marginTop: 24,
    gap: 10,
    alignItems: 'center',
  },
});