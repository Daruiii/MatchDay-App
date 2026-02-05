import React, { useMemo } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import gamesLogo from '../../../storage/gamesLogo.json';
import styles from './upcomingRow.style';
import { images } from '../../../constants';
import OptimizedImage from '../../common/OptimizedImage';
import { Match, StoredTeam } from '../../../types/api';

interface DateHelpers {
  now: Date;
  tomorrow: Date;
}

interface MatchItemProps {
  match: Match;
  teamData: StoredTeam;
  dateHelpers: DateHelpers;
  onOpenRosterModal: (teamId: number) => void;
  onOpenTournamentModal: (tournamentId: number) => void;
}

/**
 * Composant Match optimisé avec React.memo
 * Évite les re-renders inutiles
 */
const MatchItem: React.FC<MatchItemProps> = React.memo(({ 
  match, 
  teamData, 
  dateHelpers, 
  onOpenRosterModal, 
  onOpenTournamentModal 
}) => {
  const router = useRouter();

  // Calculs memoizés pour éviter recalculs à chaque render
  const matchInfo = useMemo(() => {
    if (!match?.begin_at) return null;

    const beginAtDate = new Date(match.begin_at);
    const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;
    
    const { now, tomorrow } = dateHelpers;
    
    let dateDisplay: string;
    if (match.status === 'running') {
      dateDisplay = 'NOW';
    } else if (
      beginAtDate.getDate() === tomorrow.getDate() && 
      beginAtDate.getMonth() === tomorrow.getMonth() && 
      beginAtDate.getFullYear() === tomorrow.getFullYear()
    ) {
      dateDisplay = 'Tmrw';
    } else if (
      beginAtDate.getDate() === now.getDate() && 
      beginAtDate.getMonth() === now.getMonth() && 
      beginAtDate.getFullYear() === now.getFullYear()
    ) {
      dateDisplay = 'Today';
    } else {
      dateDisplay = `${match.begin_at.slice(8, 10)}/${match.begin_at.slice(5, 7)}/${match.begin_at.slice(0, 4)}`;
    }

    const imgName = (gamesLogo as any)[match?.videogame?.slug]?.image;
    
    return {
      beginAtDate,
      formattedTime,
      dateDisplay,
      imgName
    };
  }, [match, dateHelpers]);

  if (!matchInfo) return null;

  const handleStreamPress = () => {
    if (match?.streams_list?.[0]?.raw_url) {
      router.push(match.streams_list[0].raw_url);
    }
  };

  return (
    <View key={match.id} style={(styles.eventContainer as any)(teamData?.eventColor, teamData?.secondColor)}>
      {/* Competition */}
      <Pressable
        style={(styles.eventCompetition as any)(teamData?.secondColor)}
        onPress={() => onOpenTournamentModal(match.tournament_id)}
      >
        <OptimizedImage 
          source={{ uri: match?.league?.image_url }} 
          style={{ width: 50, height: 50 }} 
          resizeMode='contain'
          fallbackText={match?.league?.name || 'League'}
          fallbackTextStyle={(styles.eventText as any)(teamData?.eventTextColor)}
        />
      </Pressable>

      {/* Match Teams */}
      <View style={styles.eventMatch}>
        {/* Team 1 */}
        <Pressable onPress={() => onOpenRosterModal(match?.opponents[0]?.opponent?.id)}>
          {match?.opponents[0]?.opponent?.image_url ? (
            <Image 
              source={{ uri: match.opponents[0].opponent.image_url }} 
              style={{ width: 80, height: 80 }} 
              resizeMode='contain' 
            />
          ) : (
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
              {match?.opponents[0]?.opponent?.acronym || 'TBD'}
            </Text>
          )}
        </Pressable>

        {/* Score/VS */}
        {match?.status === 'running' ? (
          <Text style={(styles.eventTextVS as any)(teamData?.eventTextColor)}>
            {match?.results?.[0]?.score} - {match?.results?.[1]?.score}
          </Text>
        ) : (
          <Text style={(styles.eventTextVS as any)(teamData?.eventTextColor)}>VS</Text>
        )}

        {/* Team 2 */}
        <Pressable onPress={() => onOpenRosterModal(match?.opponents[1]?.opponent?.id)}>
          {match?.opponents[1]?.opponent?.image_url ? (
            <Image 
              source={{ uri: match.opponents[1].opponent.image_url }} 
              style={{ width: 80, height: 80 }} 
              resizeMode='contain' 
            />
          ) : (
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
              {match?.opponents[1]?.opponent?.acronym || 'TBD'}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Date/Time Info */}
      <View style={styles.eventDateTime}>
        {/* Game Icon */}
        <View style={styles.eventGame}>
          {match?.videogame?.slug && (gamesLogo as any)[match.videogame.slug] && (images as any)[matchInfo.imgName] ? (
            <View style={(styles.eventGameImg as any)(teamData?.secondColor)}>
              <Image 
                source={(images as any)[matchInfo.imgName]} 
                style={{ width: 25, height: 25 }} 
                resizeMode='contain' 
              />
            </View>
          ) : (
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
              {match?.videogame?.slug}
            </Text>
          )}
        </View>

        {/* Date */}
        <View style={styles.eventDate}>
          {match?.status === 'running' ? (
            <Pressable onPress={handleStreamPress} style={styles.eventNow}>
              <Text style={(styles.eventText as any)("white")}>Live !!</Text>
            </Pressable>
          ) : (
            <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
              {matchInfo.dateDisplay}
            </Text>
          )}
        </View>

        {/* Time */}
        <View style={styles.eventTime}>
          <Text style={(styles.eventText as any)(teamData?.eventTextColor)}>
            {matchInfo.formattedTime}
          </Text>
        </View>
      </View>
    </View>
  );
});

MatchItem.displayName = 'MatchItem';

export default MatchItem;
