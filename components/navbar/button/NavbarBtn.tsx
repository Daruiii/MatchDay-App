import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import styles from './navbarBtn.style';

interface NavbarBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress: () => void;
}

const NavbarBtn: React.FC<NavbarBtnProps> = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='contain'
        style={[(styles.btnImg as any)(dimension)]}
      />
    </TouchableOpacity>
  );
};

export default NavbarBtn;
