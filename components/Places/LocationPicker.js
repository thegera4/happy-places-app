import { StyleSheet, View, Alert } from 'react-native'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { 
  getCurrentPositionAsync, 
  useForegroundPermissions, 
  PermissionStatus } from 'expo-location'

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

  async function verifyPermissions(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResult = await requestPermission()
      return permissionResult.granted
    }
    if(locationPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Permission Denied', 'You need to grant location permissions to use this app.', [
        {text: 'Okay'}
      ])

      return false
    }
    return true
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()
    if(!hasPermission) return; 
    
    try{
      const location = await getCurrentPositionAsync()
      console.log(location)
    } catch (err) {
      console.error(err)
    }

  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}>

      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Get User Location
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  mapPreview:{
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})