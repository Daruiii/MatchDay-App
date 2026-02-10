import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { getObjectData, storeObjectData } from '../storage/data';
import type { StoredTeam } from '../types';

/**
 * Context global de l'application
 * Évite le props drilling et centralise l'état
 */

// Types pour les actions
const ActionTypes = {
  SET_TEAMS: 'SET_TEAMS',
  ADD_TEAM: 'ADD_TEAM',
  UPDATE_TEAM: 'UPDATE_TEAM',
  DELETE_TEAM: 'DELETE_TEAM',
  SET_SETTINGS: 'SET_SETTINGS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
} as const;

// Types pour les notifications
export interface NotificationSwitch {
  [key: string]: boolean;
}

// Types pour les settings
export interface Settings {
  notifSwitch: NotificationSwitch;
}

// Type pour l'état de l'application
export interface AppState {
  teams: StoredTeam[];
  settings: Settings;
  isLoading: boolean;
  error: string | null;
}

// Types pour les actions du reducer
type Action =
  | { type: typeof ActionTypes.SET_TEAMS; payload: StoredTeam[] }
  | { type: typeof ActionTypes.ADD_TEAM; payload: StoredTeam }
  | { type: typeof ActionTypes.UPDATE_TEAM; payload: StoredTeam }
  | { type: typeof ActionTypes.DELETE_TEAM; payload: string }
  | { type: typeof ActionTypes.SET_SETTINGS; payload: Partial<Settings> }
  | { type: typeof ActionTypes.SET_LOADING; payload: boolean }
  | { type: typeof ActionTypes.SET_ERROR; payload: string | null };

// Actions disponibles
export interface AppActions {
  addTeam: (team: StoredTeam) => Promise<void>;
  updateTeam: (updatedTeam: StoredTeam) => Promise<void>;
  deleteTeam: (teamName: string) => Promise<void>;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  refetch: () => Promise<void>;
}

// Type du contexte complet
export interface AppContextType extends AppState, AppActions {}

const initialState: AppState = {
  teams: [],
  settings: {
    notifSwitch: { '0': true },
  },
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.SET_TEAMS:
      return { ...state, teams: action.payload };

    case ActionTypes.ADD_TEAM:
      return { ...state, teams: [...state.teams, action.payload] };

    case ActionTypes.UPDATE_TEAM:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.teamName === action.payload.teamName ? action.payload : team
        ),
      };

    case ActionTypes.DELETE_TEAM:
      return {
        ...state,
        teams: state.teams.filter((team) => team.teamName !== action.payload),
      };

    case ActionTypes.SET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async (): Promise<void> => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });

    try {
      const [teams, notifSwitch] = await Promise.all([
        getObjectData<StoredTeam[]>('teams'),
        getObjectData<NotificationSwitch>('notifSwitch'),
      ]);

      if (teams) {
        dispatch({ type: ActionTypes.SET_TEAMS, payload: teams });
      }

      if (notifSwitch) {
        dispatch({
          type: ActionTypes.SET_SETTINGS,
          payload: { notifSwitch },
        });
      } else {
        const defaultNotif: NotificationSwitch = { '0': true };
        await storeObjectData('notifSwitch', defaultNotif);
        dispatch({
          type: ActionTypes.SET_SETTINGS,
          payload: { notifSwitch: defaultNotif },
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const actions: AppActions = {
    addTeam: async (team: StoredTeam) => {
      dispatch({ type: ActionTypes.ADD_TEAM, payload: team });
      await storeObjectData('teams', [...state.teams, team]);
    },

    updateTeam: async (updatedTeam: StoredTeam) => {
      dispatch({ type: ActionTypes.UPDATE_TEAM, payload: updatedTeam });
      const newTeams = state.teams.map((team) =>
        team.teamName === updatedTeam.teamName ? updatedTeam : team
      );
      await storeObjectData('teams', newTeams);
    },

    deleteTeam: async (teamName: string) => {
      dispatch({ type: ActionTypes.DELETE_TEAM, payload: teamName });
      const newTeams = state.teams.filter((team) => team.teamName !== teamName);
      await storeObjectData('teams', newTeams);
    },

    updateSettings: async (newSettings: Partial<Settings>) => {
      dispatch({ type: ActionTypes.SET_SETTINGS, payload: newSettings });

      for (const [key, value] of Object.entries(newSettings)) {
        await storeObjectData(key, value);
      }
    },

    refetch: loadInitialData,
  };

  const value: AppContextType = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};

export const useTeams = () => {
  const { teams, addTeam, updateTeam, deleteTeam } = useApp();
  return { teams, addTeam, updateTeam, deleteTeam };
};

export const useSettings = () => {
  const { settings, updateSettings } = useApp();
  return { settings, updateSettings };
};
