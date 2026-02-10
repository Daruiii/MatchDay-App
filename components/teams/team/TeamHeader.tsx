import React from 'react';
import { Text, View, Image } from 'react-native';
import { images } from '../../../constants';

import styles from './teamHeader.style';

interface TeamHeaderProps {
  secondColor: string;
  logo?: string;
  data: string[];
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ secondColor, logo, data }) => {
  return (
    <>
      {logo ? (
        <View style={(styles.container as any)(secondColor)}>
          <Image source={{ uri: logo }} style={{ width: 50, height: 50 }} resizeMode="contain" />
        </View>
      ) : (
        <View style={(styles.container as any)(secondColor)}>
          <Image
            source={images.unknownTeam}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.headerContainer}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.headerItem}>
              <Text style={(styles.headText as any)(secondColor)}> {item} </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default TeamHeader;
