import { StyleSheet, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

const OutlinedButton = ({onPress, icon, children}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons 
        style={styles.icon}
        name={icon} 
        size={18} 
        color={Colors.primary500} 
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default OutlinedButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  }

})