import React, { useState, useCallback, ReactNode } from 'react';
import { Image, View, Text, ActivityIndicator, ImageStyle, TextStyle, StyleProp, ImageSourcePropType, ImageResizeMode } from 'react-native';

/**
 * Props pour le composant OptimizedImage
 */
interface OptimizedImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  placeholder?: ReactNode;
  fallbackText?: string;
  fallbackTextStyle?: StyleProp<TextStyle>;
  [key: string]: any; // Pour les autres props Image
}

/**
 * Composant Image optimisé avec :
 * - Cache automatique de React Native
 * - Placeholder pendant chargement
 * - Gestion d'erreurs
 * - Fallback en cas d'échec
 */
const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  source,
  style,
  resizeMode = 'contain',
  placeholder = null,
  fallbackText = '',
  fallbackTextStyle = {},
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const onError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Si erreur de chargement et fallbackText fourni
  if (hasError && fallbackText) {
    return (
      <View style={[style as any, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={fallbackTextStyle}>{fallbackText}</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      <Image
        {...props}
        source={source}
        style={[style, hasError && { display: 'none' }]}
        resizeMode={resizeMode}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
      />
      
      {/* Placeholder pendant chargement */}
      {isLoading && !hasError && (
        <View 
          style={[
            style as any, 
            { 
              position: 'absolute', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#f0f0f0'
            }
          ]}
        >
          {placeholder || <ActivityIndicator size="small" color="#999" />}
        </View>
      )}
    </View>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
