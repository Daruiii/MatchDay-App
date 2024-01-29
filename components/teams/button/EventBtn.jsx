import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './eventBtn.style'

const EventBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='contain'
        style={[styles.btnImg(dimension)]}
      />
    </TouchableOpacity>
  )
}

export default EventBtn