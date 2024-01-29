import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../../../constants';

import styles from './colorPickerForm.style'

const ColorPickerForm = ({
  team,
  teamData,
  setTeamData,
  text,
  color,
  dataToChange,
  onChangeText,
  onColorChange
}) => {
  const router = useRouter()

  return (
    <View>
      <View style={styles.colorPickerContainer}>
        <Text style={styles.headText}>{text}</Text>
        <TextInput style={styles.input}
          placeholder={text}
          value={dataToChange}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.colorPicker}>
        <ColorPicker
          style={{
            width: 150,
          }}
          color={color}
          onColorChange={onColorChange}
          thumbSize={40}
          sliderSize={20}
          noSnap={true}
          row={true}
          swatches={false}
        />
      </View>
    </View>
  )
}

export default ColorPickerForm