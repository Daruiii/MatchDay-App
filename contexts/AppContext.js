import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getObjectData, storeObjectData } from '../storage/data';

/**
 * Context global de l'application
 * Évite le props drilling et centralise l'état
 */

const ActionTypes = {
  SET_TEAMS: 'SET_TEAMS',
  ADD_TEAM: 'ADD_TEAM',
  UPDATE_TEAM: 'UPDATE_TEAM',
  DELETE_TEAM: 'DELETE_TEAM',
  SET_SETTINGS: 'SET_SETTINGS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

const initialState = {
  teams: [],
  settings: {
    notifSwitch: { 0: true }
  },
  isLoading: false,
  error: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TEAMS:
      return { ...state, teams: action.payload };
      
    case ActionTypes.ADD_TEAM:
      return { ...state, teams: [...state.teams, action.payload] };
      
    case ActionTypes.UPDATE_TEAM:
      return {
        ...state,
        teams: state.teams.map(team =>
          team.teamName === action.payload.teamName ? action.payload : team
        )
      };
      
    case ActionTypes.DELETE_TEAM:
      return {
        ...state,
        teams: state.teams.filter(team => team.teamName !== action.payload)
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

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);


  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      const [teams, notifSwitch] = await Promise.all([
        getObjectData('teams'),
        getObjectData('notifSwitch')
      ]);

      if (teams) {
        dispatch({ type: ActionTypes.SET_TEAMS, payload: teams });
      }

      if (notifSwitch) {
        dispatch({ 
          type: ActionTypes.SET_SETTINGS, 
          payload: { notifSwitch } 
        });
      } else {
        const defaultNotif = { 0: true };
        await storeObjectData('notifSwitch', defaultNotif);
        dispatch({ 
          type: ActionTypes.SET_SETTINGS, 
          payload: { notifSwitch: defaultNotif } 
        });
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const actions = {
    addTeam: async (team) => {
      dispatch({ type: ActionTypes.ADD_TEAM, payload: team });
      await storeObjectData('teams', [...state.teams, team]);
    },

    updateTeam: async (updatedTeam) => {
      dispatch({ type: ActionTypes.UPDATE_TEAM, payload: updatedTeam });
      const newTeams = state.teams.map(team =>
        team.teamName === updatedTeam.teamName ? updatedTeam : team
      );
      await storeObjectData('teams', newTeams);
    },

    deleteTeam: async (teamName) => {
      dispatch({ type: ActionTypes.DELETE_TEAM, payload: teamName });
      const newTeams = state.teams.filter(team => team.teamName !== teamName);
      await storeObjectData('teams', newTeams);
    },

    updateSettings: async (newSettings) => {
      dispatch({ type: ActionTypes.SET_SETTINGS, payload: newSettings });
      
      for (const [key, value] of Object.entries(newSettings)) {
        await storeObjectData(key, value);
      }
    },

    refetch: loadInitialData
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
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