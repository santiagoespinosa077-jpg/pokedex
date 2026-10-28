import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Image} from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { UserReponse } from '../../interfaces/pandoraApiResponse';
import { useUserApi } from '../../hooks/useUserApi';
import { UserCard } from '../../components/UserCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {BtnTouch} from '../../components/BtnTouch';
import { FormUserData } from '../../hooks/useUserForm';


export const HomeUser = () => {

  const { isLoading, loadUsers, listUser } = useUserApi();

  const focused = useIsFocused();

  const navigation = useNavigation();

  useEffect( ()  => {
    (!isLoading) && loadUsers(); 
  },[ focused ]);

  const create: UserReponse = {
    id_user: 0,
    username: '',
    password: '',
    email: '',
    imagen: '',
    location: '',
    update: new Date()
  }


  return(
    <View
      style={ appTheme.container }
    >
      <Image
      style={{
          width: 380,
          height: 800,
          position: 'absolute',
          opacity: 0.77
        }}
        source={ require('./../../../assets/Van.jpg') }
      />
      <FlatList
        data={ listUser }
        keyExtractor={ (item) => `#${item.id_user}` }
        ListHeaderComponent={(
          <View
            style={ appTheme.container }
          >
            <Text
              style={{
                ...appTheme.text,
                color: '#E0A526'
              }}
            >
              Lista de usuarios
            </Text>
            <BtnTouch
              color='#3B6FB6'
              borderColor='yellow'
              text='Crear usuario'
              borderWidth={2}
              onPress={ () => navigation.navigate('FormUser',{...create}) }
            />
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadUsers }
            colors={[ "olive", "yellow", "black" ]}
            progressBackgroundColor='black'
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={ ({ item }) => (
          <UserCard
            user={ item }
          />
        )}
      />
    </View>
  );
}