import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserReponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';

interface Props {
  user: UserReponse;
}

export const UserCard = ({ user }: Props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('FormUser', { ...user })}
    >
      <View style={style.cardContainer}>

        <View style={style.banner} />

        <View style={style.avatarWrapper}>
          <Image
            style={style.avatar}
            source={{ uri: `data:image/png;base64,${user.imagen}` }}
          />
        </View>

        <Text style={style.username} numberOfLines={1}>
          {user.username}
        </Text>

        <View style={style.infoBlock}>
          <Text style={style.label}>Correo</Text>
          <Text style={style.value} numberOfLines={1}>
            {user.email}
          </Text>
        </View>

        <View style={style.infoBlock}>
          <Text style={style.label}>Última actualización</Text>
          <Text style={style.value} numberOfLines={1}>
            {user.update}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 8,
    minHeight: 210,
    overflow: 'hidden',
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 180,
  },
  banner: {
    backgroundColor: '#3B6FB6',
    height: 60,
    width: '100%',
  },
  avatarWrapper: {
    backgroundColor: 'white',
    borderRadius: 40,
    marginTop: -35,
    padding: 3,
  },
  avatar: {
    backgroundColor: '#E2E8F0',
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  username: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  infoBlock: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: '88%',
  },
  label: {
    color: '#3B6FB6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  value: {
    color: '#334155',
    fontSize: 12,
    textAlign: 'center',
  },
});