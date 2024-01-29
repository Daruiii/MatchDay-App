import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './navbarBtn.style'

const NavbarBtn = ({ iconUrl, dimension, handlePress }) => {
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

export default NavbarBtn