import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';
import { StoredTeam } from '../../../types/api';

import styles from './upcomingRow.style';
import { images } from '../../../constants';

interface UpcomingRowProps {
  teamData: StoredTeam;
}

const UpcomingRow: React.FC<UpcomingRowProps> = React.memo(({ teamData }) => {
  const router = useRouter();
  const [rosterModalVisible, setRosterModalVisible] = useState<boolean>(false);
  const [tournamentModalVisible, setTournamentModalVisible] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);

  // hook optimisé avec cache
  const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs);

  // Callbacks memoizés pour éviter re-renders
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
      <View style={(styles.eventContainer as any)(teamData?.eventColor)}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      style={styles.scrollContainer}
    >
      {matchesData?.length > 0 ? (
        matchesData.map((match, index) => {
          const beginAtDate = new Date(match?.begin_at);
          beginAtDate.setHours(beginAtDate.getHours() + 0);
          const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;

          const now = new Date();
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          const imgName = (gamesLogo as any)[match?.videogame?.slug]?.image;

          return (
            <View
              key={`${match?.id}-${index}`}
              style={(styles.eventContainer as any)(teamData?.eventColor, teamData?.secondColor)}
            >
              <Pressable
                style={(styles.eventCompetition as any)(teamData?.secondColor)}
                onPress={() => openTournamentModal(match?.tournament_id)}
              >
                {match?.league?.image_url === null ? (
                  <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                    {match?.league?.name}
                  </Text>
                ) : (
                  <Image
                    source={{ uri: match?.league?.image_url }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                )}
              </Pressable>

              <View style={styles.eventMatch}>
                <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                  {match?.opponents[0]?.opponent?.image_url === null ? (
                    match?.opponents[0]?.opponent?.acronym === null ? (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}> TBD </Text>
                    ) : (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                        {' '}
                        {match?.opponents[0]?.opponent?.acronym}
                      </Text>
                    )
                  ) : (
                    <Image
                      source={{ uri: match?.opponents[0]?.opponent?.image_url }}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
                {match?.status === 'running' ? (
                  <Text style={(styles.eventTextVS as any)(teamData?.eventTextColor)}>
                    {match?.results?.[0]?.score} - {match?.results?.[1]?.score}
                  </Text>
                ) : (
                  <Text style={(styles.eventTextVS as any)(teamData?.eventTextColor)}>VS</Text>
                )}
                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                  {match?.opponents[1]?.opponent?.image_url === null ? (
                    match?.opponents[1]?.opponent?.acronym === null ? (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}> TBD </Text>
                    ) : (
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                        {' '}
                        {match?.opponents[1]?.opponent?.acronym}
                      </Text>
                    )
                  ) : (
                    <Image
                      source={{ uri: match?.opponents[1]?.opponent?.image_url }}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              </View>
              <View style={styles.eventDateTime}>
                <View style={styles.eventGame}>
                  {match?.videogame?.slug &&
                  (gamesLogo as any)[match?.videogame?.slug] &&
                  (images as any)[imgName] ? (
                    <View style={(styles.eventGameImg as any)(teamData?.secondColor)}>
                      <Image
                        source={(images as any)[imgName]}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                      {' '}
                      {match?.videogame?.slug}
                    </Text>
                  )}
                </View>
                <View style={styles.eventDate}>
                  {match?.status === 'running' ? (
                    <Pressable
                      onPress={() => router.push(`${match?.streams_list[0]?.raw_url}`)}
                      style={styles.eventNow}
                    >
                      <Text style={(styles.eventText as any)('white')}>Live !!</Text>
                    </Pressable>
                  ) : beginAtDate.getDate() === tomorrow.getDate() &&
                    beginAtDate.getMonth() === tomorrow.getMonth() &&
                    beginAtDate.getFullYear() === tomorrow.getFullYear() ? (
                    <>
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>Tmrw</Text>
                    </>
                  ) : beginAtDate.getDate() === now.getDate() &&
                    beginAtDate.getMonth() === now.getMonth() &&
                    beginAtDate.getFullYear() === now.getFullYear() ? (
                    <>
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>Today</Text>
                    </>
                  ) : (
                    <>
                      <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                        {match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}/
                        {match?.begin_at?.slice(0, 4)}
                      </Text>
                    </>
                  )}
                </View>

                <View style={styles.eventTime}>
                  <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
                    {formattedTime}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={(styles.eventContainer as any)(teamData?.eventColor)}>
          <View style={styles.eventError}>
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
              No upcoming matches
            </Text>
          </View>
        </View>
      )}
      <RosterModal
        teamId={selectedTeamId}
        rosterModalVisible={rosterModalVisible}
        setRosterModalVisible={setRosterModalVisible}
        colors={teamData}
      />
      <TournamentModal
        tournamentId={selectedTournamentId}
        tournamentModalVisible={tournamentModalVisible}
        setTournamentModalVisible={setTournamentModalVisible}
        colors={teamData}
      />
    </ScrollView>
  );
});

export default UpcomingRow;
