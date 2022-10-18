import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import { 
  launchCameraAsync, 
  useCameraPermissions, //ios permissions
  PermissionStatus //ios permissions
} from 'expo-image-picker'
import { useState } from 'react'
import { Colors } from '../../constants/colors'

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState()
  //ios permissions
  const [cameraPermissionInformation, requestPermission] = 
  useCameraPermissions()

  //ios permissions
  async function verifyPermissions(){
    if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResult = await requestPermission()
      return permissionResult.granted
    }
    if(cameraPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this app.', [
        {text: 'Okay'}
      ])
      return false
    }
    return true
  }


  async function takeImageHandler() {
    const hasPermission = await verifyPermissions() //ios permissions
    if(!hasPermission) return; //ios permissions

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    setPickedImage(image.uri)
  }

  let imagePreview = <Text>No picture taken yet.</Text>

  if(pickedImage){
    imagePreview = <Image styles={styles.image} source={{uri: pickedImage}} />
  }

  return (
    <View>
      <View styles={styles.imagePreview}>
        {imagePreview}
      </View>
      <Button title="Take Photo" onPress={takeImageHandler}/>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image:{
    width: '100%',
    height: '100%',
  },
})