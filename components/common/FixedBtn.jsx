import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './fixedBtn.style'

const FixedBtn = ({ iconUrl, dimension, handlePress, bgColor }) => {
  return (
    <TouchableOpacity style={styles.btnContainer(bgColor)} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='contain'
        style={[styles.btnImg(dimension)]}
      />
    </TouchableOpacity>
  )
}

export default FixedBtn