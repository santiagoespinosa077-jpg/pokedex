import { View, Text, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonReponse';
import {pokemonTheme} from "../theme/pokemonTheme"

interface Props {
  pokemon: PokemonDetailResponse;
  color: string[];
}

export const PokemonInfo = ( { pokemon, color }:Props ) => {

  return(
    <ScrollView>

      <View
        style={pokemonTheme.containeritems}
      >

        <View
          style={ pokemonTheme.container }
        >
         <View 
          style={{
            ...pokemonTheme.infocard,
            backgroundColor: color[0]
          }}
        >
          <Text
            style={pokemonTheme.text}
          >
            Base experience:  {pokemon && pokemon.base_experience }
          </Text>
        </View>
        <View
          style={{
            ...pokemonTheme.infocard,
            backgroundColor: color[0],
          }}
        >
          <Text
            style={ pokemonTheme.text }
          >
            Height:  {pokemon && pokemon.height }
          </Text>
        </View>

        <View
          style={{
            ...pokemonTheme.infocard,
            backgroundColor: color[0]
          }}
        >
          <Text
            style={ pokemonTheme.text }
          >
            Is Default:  {pokemon && (pokemon.is_default) ? 'True' : 'False' }
          </Text>
        </View>
        <View
          style={{
            ...pokemonTheme.infocard,
            backgroundColor:color[0]
          }}
        >
          <Text
            style={ pokemonTheme.text }
          >
            Weight:  {pokemon && pokemon.weight }
          </Text>
          
        </View>
      </View>
      <Text style={{
        ...pokemonTheme.title, 
        color: color[0]
      }}
    >
      Stats
    </Text>
    { pokemon.stats?.map( ( { base_stat, stat } ) => (
      <View 
        key={ stat.name } 
        style={ pokemonTheme.statRow }
      >
        <Text 
          style={ pokemonTheme.statLabel }
        >
          { stat.name }: { base_stat }
        </Text>
        <View
          style={pokemonTheme.barBackground}
        >
          <View
            style={{
              ...pokemonTheme.barFill,
              width: `${ Math.min( ( base_stat / 255 ) * 100, 100 ) }%`,
              backgroundColor: color[0]
            }}
          />
        </View>
      </View>
      ))}
    <Text
      style={{
        ...pokemonTheme.title,
        color: color[0]
      }}
    >
      Sprites
    </Text>
    
      <View
        style={pokemonTheme.contima}
      >
      <View
        style={pokemonTheme.imagecard}
      >
        {
          (pokemon.sprites?.front_shiny) && (
            <Image
              style={ pokemonTheme.picture }
              source={{ uri: pokemon.sprites.front_shiny }}
              />)
        }
      </View>
      <View
        style={pokemonTheme.imagecard}
      >
        {
          (pokemon.sprites?.back_shiny) && (
            <Image
              style={ pokemonTheme.picture }
              source={{ uri: pokemon.sprites.back_shiny }}
              />)
        }
      </View>
      <View
        style={pokemonTheme.imagecard}
      >
        {
          (pokemon.sprites?.front_default) && (
            <Image
              style={ pokemonTheme.picture }
              source={{ uri: pokemon.sprites.front_default }}
              />)
        }
      </View>
      <View
        style={pokemonTheme.imagecard}
      >
        {
          (pokemon.sprites?.back_default) && (
            <Image
              style={ pokemonTheme.picture }
              source={{ uri: pokemon.sprites.back_default }}
              />)
        }
      </View>
      </View>
    <Text
      style={{
        ...pokemonTheme.title,
        color: color[0]
      }}
    >
      Abilities
    </Text>
    <View
      style={pokemonTheme.abilityContainer}
    >
      {pokemon.abilities?.map(({ability}) => (
        <View
          key={ability?.name}
          style={{
            ...pokemonTheme.abilityTag,
            backgroundColor: color[0]
          }}
        >
          <Text
            style={pokemonTheme.abilityText}
          >
            {ability?.name}
          </Text>
        </View>
        ))}
    </View>
  </View>

</ScrollView>
);
}