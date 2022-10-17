import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

const PlacesList = ({places}) => {
  if(!places || places.length === 0) {
    return (
      <View style={styles.fallBackntainer}>
        <Text style={styles.fallBackText}>
          No places found. Maybe start adding some?
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={places}
      renderItem={ ({item}) => <PlaceItem place={ item} /> }
      keyExtractor={item => item.id}
    />
  )
}

export default PlacesList

const styles = StyleSheet.create({
  fallBackntainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallBackText: {
    fontSize: 16
  }
})