import React, { Suspense, ComponentType } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { COLORS } from '@constants';

/**
 * Composants lazy-loaded pour optimiser le bundle
 * et réduire le temps de chargement initial
 */

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message = 'Chargement...' }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.headerBg,
      padding: 20,
    }}
  >
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text
      style={{
        color: COLORS.lightWhite,
        marginTop: 10,
        textAlign: 'center',
      }}
    >
      {message}
    </Text>
  </View>
);

export const LazyRosterModal = React.lazy(() =>
  import('../teams/modal/RosterModal').then((module) => ({
    default: module.default,
  }))
);

export const LazyTournamentModal = React.lazy(() =>
  import('../teams/modal/TournamentModal').then((module) => ({
    default: module.default,
  }))
);

export const LazyColorPickerForm = React.lazy(() =>
  import('../teams/form/ColorPickerForm').then((module) => ({
    default: module.default,
  }))
);

export const LazyTeamForm = React.lazy(() =>
  import('../teams/form/TeamForm').then((module) => ({
    default: module.default,
  }))
);

export const withSuspense = <P extends object>(
  LazyComponent: React.LazyExoticComponent<ComponentType<P>>,
  fallbackMessage?: string
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense fallback={<LoadingFallback message={fallbackMessage} />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `withSuspense(Component)`;
  return WrappedComponent;
};

export const RosterModal = withSuspense(LazyRosterModal, 'Chargement des joueurs...');
export const TournamentModal = withSuspense(LazyTournamentModal, 'Chargement du tournoi...');
export const ColorPickerForm = withSuspense(LazyColorPickerForm, 'Chargement du sélecteur...');
export const TeamForm = withSuspense(LazyTeamForm, 'Chargement du formulaire...');

export const preloadCriticalComponents = (): void => {
  // Preload après 2 secondes (quand l'app est stable)
  setTimeout(() => {
    import('../teams/modal/RosterModal');
    import('../teams/modal/TournamentModal');
  }, 2000);
};

type ComponentName = 'roster' | 'tournament' | 'form' | 'colorpicker';

export const preloadOnInteraction = (componentName: ComponentName): void => {
  const preloadMap: Record<ComponentName, () => Promise<any>> = {
    roster: () => import('../teams/modal/RosterModal'),
    tournament: () => import('../teams/modal/TournamentModal'),
    form: () => import('../teams/form/TeamForm'),
    colorpicker: () => import('../teams/form/ColorPickerForm'),
  };

  const preloader = preloadMap[componentName];
  if (preloader) {
    preloader();
  }
};
