import { ViewStyle, ImageStyle } from 'react-native';

const styles = {
  btnContainer: (bgColor: string): ViewStyle => ({
    width: 60,
    height: 60,
    backgroundColor: bgColor,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 90,
    right: 10,
  }),
  btnImg: (dimension: number): ImageStyle => ({
    width: dimension,
    height: dimension,
  }),
};

export default styles;
