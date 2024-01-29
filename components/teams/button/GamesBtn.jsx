import { TouchableOpacity, View, Text, Image } from 'react-native'
import getNameAndVideoGame from '../../../hooks/getNameAndVideoGame'
import { useEffect, useState } from 'react'
import { images } from '../../../constants';
import gamesLogo from '../../../storage/gamesLogo.json';

import styles from './gamesbtn.style'

const GamesBtn = ({ slug, handlePress, activated }) => {
  const [name, setName] = useState('')
  const [videoGame, setVideoGame] = useState('')
  const [videoGameSlug, setSlug] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNameAndVideoGame(slug);
      setName(data.teamName);
      setVideoGame(data.videoGame);
      setSlug(data.videoGameSlug);
    };

    fetchData();
  }, [slug]);

  const imgName = gamesLogo[videoGameSlug]?.image;

  return (
    <TouchableOpacity style={styles.btnContainer(activated)} onPress={() => handlePress(slug)}>
      {videoGameSlug && gamesLogo[videoGameSlug] ? (
        <Image source={images[imgName]} style={{ width: 23, height: 23 }} resizeMode='contain' />
      ) : (
        <>
        </>
      )}
      <Text style={styles.text(activated)}>{name}</Text>
      <Text style={styles.text(activated)}> {activated ? '✓' : ''}</Text>
    </TouchableOpacity>

  )
}

export default GamesBtn