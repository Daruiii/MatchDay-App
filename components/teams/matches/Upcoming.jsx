import React, { useState, useCallback } from 'react'
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import EventBtn from '../button/EventBtn';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';


import styles from './upcoming.style'
import icons from '../../../constants/icons';
import { images } from '../../../constants';

const Upcoming = React.memo(({ teamData }) => {
    const router = useRouter();
    const [notification, setNotification] = useState(false);
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);

    // Cache pour les matches à venir
    const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs, 'upcoming');

    // Memoization des calculs lourds pour tous les matches
    const processedMatches = React.useMemo(() => {
        if (!matchesData?.length) return [];
        
        return matchesData.map((match) => {
            const beginAtDate = new Date(match?.begin_at);
            beginAtDate.setHours(beginAtDate.getHours() + 0);
            const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;
            
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            const imgName = gamesLogo[match?.videogame?.slug]?.image;
            
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

    const openRosterModal = useCallback((teamId) => {
        setSelectedTeamId(teamId);
        setRosterModalVisible(true);
    }, []);

    const openTournamentModal = useCallback((tournamentId) => {
        setSelectedTournamentId(tournamentId);
        setTournamentModalVisible(true);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {processedMatches?.length > 0 ? (
                processedMatches.map((match, index) => {
                    const { beginAtDate, formattedTime, now, tomorrow, imgName } = match;

                    return (
                        <View key={`${match?.id}-${index}`} style={styles.eventContainer(teamData?.eventColor)}>
                            {match?.videogame?.slug && gamesLogo[match?.videogame?.slug] && images[imgName] ? (
                                <View style={styles.eventGameLogoContainer(teamData?.secondColor)}>
                                <Image source={images[imgName]} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                </View>
                            ) : (   
                                <>
                                </>
                            )}
                            <Pressable
                                style={styles.eventCompetition}
                                onPress={() => openTournamentModal(match?.tournament_id)}>
                                {match?.league?.image_url === null ? (
                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.league?.name}</Text>
                                ) : (
                                    <Image source={{ uri: match?.league?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                )}
                            </Pressable>

                            <View style={styles.eventMatch}>
                                <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}// open modal with team roster here
                                >
                                    {match?.opponents[0]?.opponent?.image_url === null ? (
                                        match?.opponents[0]?.opponent?.acronym === null ? (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}>TBD</Text>
                                        ) : (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[0]?.opponent?.acronym}</Text>
                                        )
                                    ) : (
                                        <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                                {match?.status === 'running' ? (
                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                ) : (
                                    <Text style={styles.eventText(teamData?.eventTextColor)}>VS</Text>
                                )}
                                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}// open modal with team roster here
                                >
                                    {match?.opponents[1]?.opponent?.image_url === null ? (
                                        match?.opponents[1]?.opponent?.acronym === null ? (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}>TBD</Text>
                                        ) : (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[1]?.opponent?.acronym}</Text>
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
                                    beginAtDate.getDate() === tomorrow.getDate() & beginAtDate.getMonth() === tomorrow.getMonth() & beginAtDate.getFullYear() === tomorrow.getFullYear()
                                        ? (
                                            <>
                                                <Text style={styles.eventText(teamData?.eventTextColor)}>Tmrw</Text>
                                            </>
                                        ) : (
                                            beginAtDate.getDate() === now.getDate() & beginAtDate.getMonth() === now.getMonth() & beginAtDate.getFullYear() === now.getFullYear()
                                                ? (
                                                    <>
                                                        <Text style={styles.eventText(teamData?.eventTextColor)}>Today</Text>
                                                    </>
                                                ) :
                                                <>
                                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}</Text>
                                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.begin_at?.slice(0, 4)}</Text>
                                                </>
                                        )
                                )}
                            </View>

                            <View style={styles.eventTime}>
                                <Text style={styles.eventText(teamData?.eventTextColor)}>{formattedTime}</Text>
                            </View>

                            {/* notification button */}
                        </View>
                    )
                })
            ) : (
                <View style={styles.eventContainer(teamData?.eventColor)}>
                    <View style={styles.eventError}>
                        <Text style={styles.eventText(teamData?.eventTextColor)}>No upcoming matches</Text>
                    </View>
                </View>
            )}
            <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible}
                colors={teamData} />
            <TournamentModal tournamentId={selectedTournamentId} tournamentModalVisible={tournamentModalVisible} setTournamentModalVisible={setTournamentModalVisible} colors={teamData} />
        </View>
    )
});

export default Upcoming;
