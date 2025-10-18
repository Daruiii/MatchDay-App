import React, { useState, useCallback } from 'react';
import { Image, View, Text, ActivityIndicator } from 'react-native';

/**
 * Composant Image optimisé avec :
 * - Cache automatique de React Native
 * - Placeholder pendant chargement
 * - Gestion d'erreurs
 * - Fallback en cas d'échec
 */
const OptimizedImage = React.memo(({
  source,
  style,
  resizeMode = 'contain',
  placeholder = null,
  fallbackText = '',
  fallbackTextStyle = {},
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
      <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
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
        // Cache automatique de React Native activé
        cache="force-cache"
      />
      
      {/* Placeholder pendant chargement */}
      {isLoading && !hasError && (
        <View 
          style={[
            style, 
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