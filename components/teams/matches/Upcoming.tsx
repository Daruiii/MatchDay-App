import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';
import { StoredTeam, Match } from '../../../types/api';

import styles from './upcoming.style';
import icons from '../../../constants/icons';
import { images } from '../../../constants';

interface UpcomingProps {
  teamData: StoredTeam;
}

interface ProcessedMatch extends Match {
  beginAtDate: Date;
  formattedTime: string;
  now: Date;
  tomorrow: Date;
  imgName: string;
}

const Upcoming: React.FC<UpcomingProps> = React.memo(({ teamData }) => {
  const router = useRouter();
  const [notification, setNotification] = useState<boolean>(false);
  const [rosterModalVisible, setRosterModalVisible] = useState<boolean>(false);
  const [tournamentModalVisible, setTournamentModalVisible] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);

  // Cache pour les matches à venir
  const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs, 'upcoming');

  // Memoization des calculs lourds pour tous les matches
  const processedMatches = React.useMemo(() => {
    if (!matchesData?.length) return [];
    
    return matchesData.map((match): ProcessedMatch => {
      const beginAtDate = new Date(match?.begin_at);
      beginAtDate.setHours(beginAtDate.getHours() + 0);
      const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;
      
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const imgName = (gamesLogo as any)[match?.videogame?.slug]?.image;
      
      return {
        ...match,
        beginAtDate,
        formattedTime,
        now,
        tomorrow,
        imgName
      };
    });
  }, [matchesData]);

  const openRosterModal = useCallback((teamId: number) => {
    setSelectedTeamId(teamId);
    setRosterModalVisible(true);
  }, []);

  const openTournamentModal = useCallback((tournamentId: number) => {
    setSelectedTournamentId(tournamentId);
    setTournamentModalVisible(true);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {processedMatches?.length > 0 ? (
        processedMatches.map((match, index) => {
          const { beginAtDate, formattedTime, now, tomorrow, imgName } = match;

          return (
            <View key={`${match?.id}-${index}`} style={(styles.eventContainer as any)(teamData?.eventColor)}>
              {match?.videogame?.slug && (gamesLogo as any)[match?.videogame?.slug] && (images as any)[imgName] ? (
                <View style={(styles.eventGameLogoContainer as any)(teamData?.secondColor)}>
                  <Image source={(images as any)[imgName]} style={{ width: 20, height: 20 }} resizeMode='contain' />
                </View>
              ) : (   
                <></>
              )}
              <Pressable
                style={styles.eventCompetition}
                onPress={() => openTournamentModal(match?.tournament_id)}>
                {match?.league?.image_url === null ? (
                  <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>{match?.league?.name}</Text>
                ) : (
                  <Image source={{ uri: match?.league?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                )}
              </Pressable>

              <View style={styles.eventMatch}>
                <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                  {match?.opponents[0]?.opponent?.image_url === null ? (
                    match?.opponents[0]?.opponent?.acronym === null ? (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>TBD</Text>
                    ) : (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}> {match?.opponents[0]?.opponent?.acronym}</Text>
                    )
                  ) : (
                    <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode='contain' />
                  )}
                </Pressable>
                {match?.status === 'running' ? (
                  <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>{match?.results?.[0]?.score} - {match?.results?.[1]?.score}</Text>
                ) : (
                  <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>VS</Text>
                )}
                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                  {match?.opponents[1]?.opponent?.image_url === null ? (
                    match?.opponents[1]?.opponent?.acronym === null ? (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>TBD</Text>
                    ) : (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}> {match?.opponents[1]?.opponent?.acronym}</Text>
                    )
                  ) : (
                    <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode='contain' />
                  )}
                </Pressable>
              </View>

              <View style={styles.eventDate}>
                {match?.status === 'running' ? (
                  <Pressable onPress={() => router.push(`${match?.streams_list[0]?.raw_url}`)}
                    style={styles.eventNow}
                  >
                    <Text style={styles.eventNowText}>Live</Text>
                  </Pressable>
                ) : (
                  beginAtDate.getDate() === tomorrow.getDate() && beginAtDate.getMonth() === tomorrow.getMonth() && beginAtDate.getFullYear() === tomorrow.getFullYear()
                    ? (
                      <>
                        <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>Tmrw</Text>
                      </>
                    ) : (
                      beginAtDate.getDate() === now.getDate() && beginAtDate.getMonth() === now.getMonth() && beginAtDate.getFullYear() === now.getFullYear()
                        ? (
                          <>
                            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>Today</Text>
                          </>
                        ) :
                        <>
                          <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>{match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}</Text>
                          <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>{match?.begin_at?.slice(0, 4)}</Text>
                        </>
                    )
                )}
              </View>

              <View style={styles.eventTime}>
                <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>{formattedTime}</Text>
              </View>

              {/* notification button */}
            </View>
          );
        })
      ) : (
        <View style={(styles.eventContainer as any)(teamData?.eventColor)}>
          <View style={styles.eventError}>
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>No upcoming matches</Text>
          </View>
        </View>
      )}
      <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible}
        colors={teamData} />
      <TournamentModal tournamentId={selectedTournamentId} tournamentModalVisible={tournamentModalVisible} setTournamentModalVisible={setTournamentModalVisible} colors={teamData} />
    </View>
  );
});

export default Upcoming;
