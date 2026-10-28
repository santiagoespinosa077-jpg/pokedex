import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { BtnTouch } from "./BtnTouch";

interface BtnProps {
  navigate: () => void;
  text: string;
}

const BtnMenu = ({ navigate, text }: BtnProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigate}
      style={style.menuItem}
    >
      <Text style={style.menuText}>{text}</Text>
      <Text style={style.menuArrow}>›</Text>
    </TouchableOpacity>
  );
};

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
  const { authState, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView contentContainerStyle={style.container}>
      {/* Cabecera */}
      <View style={style.header}>
        <View style={style.avatarWrapper}>
          <Image
            style={style.avatar}
            source={
              authState.isLoggedIn
                ? { uri: `data:image/png;base64,${authState.avatar}` }
                : { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqMRKTwf-zYsaWB9QU5hXY8PBNLgQo61e5ML_g6P4NWA&s=10' }
            }
          />
        </View>
        <Text style={style.userText} numberOfLines={1}>
          {authState.username}
        </Text>
        <Text style={style.userLabel}>
          {authState.isLoggedIn ? 'Sesión iniciada' : 'Sin sesión'}
        </Text>
      </View>

      {/* Opciones */}
      <View style={style.menu}>
        <BtnMenu navigate={() => navigation.navigate('StackNavigator')} text="Bolitas y palitos" />
        <BtnMenu navigate={() => navigation.navigate('PokemonNavigator')} text="Pokedex" />
        <BtnMenu navigate={() => navigation.navigate('FormScreen')} text="FormScreen" />
        <BtnMenu navigate={() => navigation.navigate('ImagePickerScreen')} text="Seleccionar Image" />
        <BtnMenu navigate={() => navigation.navigate('LocationScreen')} text="Localización" />
        <BtnMenu navigate={() => navigation.navigate('UserStackNavigator')} text="Gestión de Usuarios" />
        <BtnMenu navigate={() => navigation.navigate('LoginUser')} text="LoginUser" />
        <BtnMenu navigate={() => navigation.navigate('TareaStackNavigator')} text="Tareas" />
        <BtnMenu navigate={() => navigation.navigate('ProductoStackNavigator')} text="Productos" />
      </View>

      {/* Cerrar sesión */}
      {authState.isLoggedIn && (
        <View style={style.footer}>
          <BtnTouch
            text="Cerrar sesión"
            color="red"
            onPress={() => logout()}
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarWrapper: {
    padding: 4,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  userText: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userLabel: {
    marginTop: 2,
    fontSize: 13,
    color: '#94a3b8',
  },
  menu: {
    marginTop: 20,
    paddingHorizontal: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#3b82f6',
  },
  menuText: {
    fontSize: 17,
    color: '#1e293b',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 24,
    color: '#64748b',
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
});