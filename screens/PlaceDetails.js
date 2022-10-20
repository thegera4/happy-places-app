import { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, ScrollView, Image, View, Alert } from 'react-native'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/colors'
import { fetchPlaceDetails, deletePlace } from '../util/database';
import IconButton from '../components/UI/IconButton';

const PlaceDetails = ({ route, navigation }) => {
  const selectedPlaceId = route.params.placeId;
  const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    async function loadPlaceData(){
      const place = await fetchPlaceDetails(selectedPlaceId)
      setSelectedPlace(place)
      navigation.setOptions({title: place.title})
    }
    loadPlaceData();
  }, [selectedPlaceId])

  async function deletePlaceHanlder(){
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this place?',
      [
        {text: 'No', style: 'default'},
        {text: 'Yes', style: 'destructive', 
        onPress: async () => {
          await deletePlace(selectedPlace.id);
          navigation.goBack();
        }}
      ]
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="trash"
          size={24}
          color={tintColor}
          onPress={deletePlaceHanlder}
        />
      )
    })
  }, [navigation, deletePlaceHanlder])

  function showOnMapHandler(){
    navigation.navigate('Map', {
      initialLat: selectedPlace.location.lat,
      initialLng: selectedPlace.location.lng
    })
  }

  if(!selectedPlace){
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {selectedPlace.address}
          </Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
  fallback:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: '100%',
    height: '35%',
    minHeight: 300,
  },
  locationContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address:{
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})