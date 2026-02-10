import { StyleSheet, Dimensions, ScaledSize } from 'react-native';

/**
 * Cache des styles pour éviter les recalculs répétitifs
 * et optimiser les performances de rendu
 */

let cachedDimensions: ScaledSize | null = null;
let cachedStyles = new Map<string, any>();

export const getCachedDimensions = (): ScaledSize => {
  if (!cachedDimensions) {
    cachedDimensions = Dimensions.get('window');
  }
  return cachedDimensions;
};

export const invalidateDimensionsCache = (): void => {
  cachedDimensions = null;
  // Clear style cache car les dimensions ont changé
  cachedStyles.clear();
};

export const createCachedStyles = <T>(
  styleFactory: (dimensions: ScaledSize) => T,
  cacheKey: string
): T => {
  if (cachedStyles.has(cacheKey)) {
    return cachedStyles.get(cacheKey);
  }

  const dimensions = getCachedDimensions();
  const styles = StyleSheet.create(styleFactory(dimensions) as any);
  cachedStyles.set(cacheKey, styles);

  return styles as T;
};

export const createCardStyles = (cardType: 'default' | 'large' | 'compact' = 'default') => {
  const cacheKey = `card_${cardType}`;

  return createCachedStyles((dimensions) => {
    const { width, height } = dimensions;
    const isLandscape = width > height;
    const cardWidth = isLandscape ? width * 0.45 : width * 0.9;

    return {
      card: {
        width: cardWidth,
        marginHorizontal: (width - cardWidth) / 2,
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
      },
      cardLarge: {
        width: width * 0.95,
        marginHorizontal: width * 0.025,
        borderRadius: 16,
        padding: 20,
        marginVertical: 10,
      },
      cardCompact: {
        width: cardWidth * 0.8,
        marginHorizontal: (width - cardWidth * 0.8) / 2,
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
      },
    };
  }, cacheKey);
};

export const createLayoutStyles = (layoutType: string = 'default') => {
  const cacheKey = `layout_${layoutType}`;

  return createCachedStyles((dimensions) => {
    const { width, height } = dimensions;
    const isLandscape = width > height;

    return {
      container: {
        flex: 1,
        paddingHorizontal: isLandscape ? 40 : 20,
        paddingVertical: isLandscape ? 20 : 30,
      },
      row: {
        flexDirection: (isLandscape ? 'row' : 'column') as 'row' | 'column',
        justifyContent: 'space-between',
        alignItems: (isLandscape ? 'flex-start' : 'center') as any,
      },
      column: {
        flex: isLandscape ? 1 : 0,
        marginHorizontal: isLandscape ? 10 : 0,
      },
    };
  }, cacheKey);
};

/**
 * Factory pour les styles de texte avec tailles adaptatives
 */
export const createTextStyles = (baseSize: number = 16) => {
  const cacheKey = `text_${baseSize}`;

  return createCachedStyles((dimensions) => {
    const { width } = dimensions;
    const scale = width / 375;
    const fontSize = Math.round(baseSize * Math.min(scale, 1.3)); // Max 30% plus grand

    return {
      title: {
        fontSize: fontSize * 1.5,
        fontWeight: 'bold' as const,
        lineHeight: fontSize * 1.5 * 1.2,
      },
      subtitle: {
        fontSize: fontSize * 1.2,
        fontWeight: '600' as const,
        lineHeight: fontSize * 1.2 * 1.2,
      },
      body: {
        fontSize: fontSize,
        lineHeight: fontSize * 1.4,
      },
      caption: {
        fontSize: fontSize * 0.85,
        lineHeight: fontSize * 0.85 * 1.3,
      },
    };
  }, cacheKey);
};

/**
 * Utilitaire pour créer des styles dynamiques avec memoization
 */
export const createDynamicStyles = <T>(styleProps: T, dependencies: any[] = []): T => {
  const cacheKey = `dynamic_${JSON.stringify({ styleProps, dependencies })}`;

  if (cachedStyles.has(cacheKey)) {
    return cachedStyles.get(cacheKey);
  }

  const styles = StyleSheet.create(styleProps as any);
  cachedStyles.set(cacheKey, styles);

  return styles as T;
};

/**
 * Clear du cache complet (pour libérer la mémoire)
 */
export const clearStyleCache = (): void => {
  cachedStyles.clear();
  cachedDimensions = null;
};

interface StyleCacheStats {
  cacheSize: number;
  hasDimensions: boolean;
  cacheKeys: string[];
}

/**
 * Stats du cache (pour debugging)
 */
export const getStyleCacheStats = (): StyleCacheStats => ({
  cacheSize: cachedStyles.size,
  hasDimensions: !!cachedDimensions,
  cacheKeys: Array.from(cachedStyles.keys()),
});
