import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import getNameAndVideoGame from '../../../hooks/getNameAndVideoGame';
import { images } from '../../../constants';
import gamesLogo from '../../../storage/gamesLogo.json';

import styles from './gamesbtn.style';

interface GamesBtnProps {
  slug: string;
  handlePress: (slug: string) => void;
  activated: boolean;
}

const GamesBtn: React.FC<GamesBtnProps> = ({ slug, handlePress, activated }) => {
  const [name, setName] = useState<string>('');
  const [videoGame, setVideoGame] = useState<string>('');
  const [videoGameSlug, setSlug] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNameAndVideoGame(slug);
      if (data) {
        setName(data.teamName);
        setVideoGame(data.videoGame);
        setSlug(data.videoGameSlug);
      }
    };

    fetchData();
  }, [slug]);

  const imgName = (gamesLogo as any)[videoGameSlug]?.image;

  return (
    <TouchableOpacity
      style={(styles.btnContainer as any)(activated)}
      onPress={() => handlePress(slug)}
    >
      {videoGameSlug && (gamesLogo as any)[videoGameSlug] ? (
        <Image
          source={(images as any)[imgName]}
          style={{ width: 23, height: 23 }}
          resizeMode="contain"
        />
      ) : null}
      <Text style={(styles.text as any)(activated)}>{name}</Text>
      <Text style={(styles.text as any)(activated)}> {activated ? '✓' : ''}</Text>
    </TouchableOpacity>
  );
};

export default GamesBtn;
