import {StyleSheet, Dimensions} from "react-native";

export const pokemonTheme = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  contima: {
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 5
  
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  abilityContainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft: 5
  },
  abilityTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
},
  abilityText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize'
},
  picture: {
    width: 120,
    height: 120,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  infocard: {
    width: '48%',
    marginHorizontal: '1%',
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 17,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5
  },
  containeritems: {
    backgroundColor: '#eef1f6',
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  imagecard: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 5,
    padding: 8,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(47,93,168,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#2F5DA8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 5
  },
  statRow:{
    marginVertical: 6,
    marginHorizontal: 5
  },

  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 3
  },

  barBackground:{
    height: 12,
    backgroundColor: '#dde2ea',
    borderRadius: 6,
    overflow:'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: 6
  }
});