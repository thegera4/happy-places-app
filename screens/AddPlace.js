import { StyleSheet } from 'react-native'
import React from 'react'
import PlaceForm from '../components/Places/PlaceForm'
import { insertPlace } from '../util/database'

const AddPlace = ({navigation}) => {
  
  async function createPlaceHandler(place){
    try {
      await insertPlace(place)
      navigation.navigate('AllPlaces')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}

export default AddPlace

const styles = StyleSheet.create({})