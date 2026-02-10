import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getAllSlugs, getTeamLogo } from '../hooks/getAllSlugs';
import defaultTeamsData from './defaultTeams.json';
import type { StoredTeam } from '../types';

export const defaultTeams = defaultTeamsData as StoredTeam[];

export const getTeams = async (): Promise<StoredTeam[] | null> => {
  try {
    const teams = await AsyncStorage.getItem('teams');
    return teams != null ? JSON.parse(teams) : null;
  } catch (error) {
    return null;
  }
};

export const deleteTeam = async (teamName: string): Promise<void> => {
  try {
    const teams = await AsyncStorage.getItem('teams');
    const teamsParsed: StoredTeam[] = JSON.parse(teams || '[]');

    const teamIndex = teamsParsed.findIndex((team) => team.teamName === teamName);

    if (teamIndex !== -1) {
      teamsParsed.splice(teamIndex, 1);
      await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
    }
  } catch (error) {
    // Error deleting team
  }
};

export const addTeam = async (
  teamName: string,
  backgroundColor: string,
  secondColor: string,
  eventColor: string,
  eventTextColor: string,
  real_slugs?: string[],
  image?: string
): Promise<void> => {
  try {
    const teams = await AsyncStorage.getItem('teams');
    const teamsParsed: StoredTeam[] = JSON.parse(teams || '[]');
    if (teamsParsed.find((team) => team.teamName === teamName)) {
      Toast.show({
        type: 'error',
        text1: 'Team Already Exists',
        text2: 'This team is already in your list',
      });
      return;
    }

    const id = teamsParsed.length > 0 ? teamsParsed[teamsParsed.length - 1].id + 1 : 1;
    const slugs = real_slugs ? real_slugs : await getAllSlugs(teamName);
    const image_url = image ? image : await getTeamLogo(teamName);
    const disableSlugs: string[] = [];
    const notificate = true;

    teamsParsed.push({
      id: id,
      teamName: teamName,
      backgroundColor: backgroundColor,
      secondColor: secondColor,
      eventColor: eventColor,
      eventTextColor: eventTextColor,
      slugs: slugs,
      disableSlugs: disableSlugs,
      image_url: image_url || '',
      notificate: notificate,
    });

    await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
  } catch (error) {
    // Error adding team
  }
};

export const updateTeam = async (
  teamName: string,
  backgroundColor: string,
  secondColor: string,
  eventColor: string,
  eventTextColor: string,
  slugs: string[],
  disableSlugs: string[],
  image_url: string,
  notificate: boolean
): Promise<void> => {
  try {
    const teams = await AsyncStorage.getItem('teams');
    const teamsParsed: StoredTeam[] = JSON.parse(teams || '[]');

    const teamIndex = teamsParsed.findIndex((team) => team.teamName === teamName);

    if (teamIndex !== -1) {
      teamsParsed[teamIndex] = {
        id: teamsParsed[teamIndex].id,
        teamName: teamName,
        backgroundColor: backgroundColor,
        secondColor: secondColor,
        eventColor: eventColor,
        eventTextColor: eventTextColor,
        slugs: slugs,
        disableSlugs: disableSlugs,
        image_url: image_url,
        notificate: notificate,
      };
      await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
    }
  } catch (error) {
    // Error updating team
  }
};
