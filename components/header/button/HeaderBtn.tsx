import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import styles from './headerBtn.style';

interface HeaderBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress: () => void;
}

const HeaderBtn: React.FC<HeaderBtnProps> = ({ iconUrl, dimension, handlePress }) => {
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

export default HeaderBtn;
