import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import styles from './eventBtn.style';

interface EventBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress: () => void;
}

const EventBtn: React.FC<EventBtnProps> = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} resizeMode="contain" style={(styles.btnImg as any)(dimension)} />
    </TouchableOpacity>
  );
};

export default EventBtn;
