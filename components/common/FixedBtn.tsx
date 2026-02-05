import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import styles from './fixedBtn.style';

interface FixedBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress: () => void;
  bgColor?: string;
}

const FixedBtn: React.FC<FixedBtnProps> = ({ iconUrl, dimension, handlePress, bgColor }) => {
  return (
    <TouchableOpacity 
      style={(styles.btnContainer as any)(bgColor)} 
      onPress={handlePress}
    >
      <Image
        source={iconUrl}
        resizeMode='contain'
        style={[(styles.btnImg as any)(dimension)]}
      />
    </TouchableOpacity>
  );
};

export default FixedBtn;
