import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import PlacesList from '../components/Places/PlacesList'

const AllPlaces = ({route}) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused && route.params){
      setLoadedPlaces((currentPlaces) => [...currentPlaces, route.params.place])
    }
  }, [route, isFocused]);

  return (
    <PlacesList places={loadedPlaces}/>
  )
}

export default AllPlaces

const styles = StyleSheet.create({})