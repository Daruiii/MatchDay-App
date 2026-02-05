import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import styles from './colorPickerForm.style';

interface ColorPickerFormProps {
  team: any[];
  teamData: any;
  setTeamData: (data: any) => void;
  text: string;
  color?: string;
  dataToChange: string;
  onChangeText: (text: string) => void;
  onColorChange: (color: string) => void;
}

const ColorPickerForm: React.FC<ColorPickerFormProps> = ({
  team,
  teamData,
  setTeamData,
  text,
  color,
  dataToChange,
  onChangeText,
  onColorChange
}) => {
  return (
    <View>
      <View style={styles.colorPickerContainer}>
        <Text style={styles.headText}>{text}</Text>
        <TextInput 
          style={styles.input}
          placeholder={text}
          value={dataToChange}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.colorPicker}>
        <ColorPicker
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
  );
};

export default ColorPickerForm;
