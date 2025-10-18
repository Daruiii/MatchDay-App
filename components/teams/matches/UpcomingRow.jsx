import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';

import styles from './upcomingRow.style'
import { images } from '../../../constants';
const UpcomingRow = React.memo(({ teamData }) => {
    const router = useRouter();
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);

    // hook optimisé avec cache
    const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs);

    // Callbacks memoizés pour éviter re-renders
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
            <View style={styles.eventContainer(teamData?.eventColor)}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.eventContainer(teamData?.eventColor)}>
                <Text style={styles.eventText(teamData?.eventTextColor)}>Erreur de chargement</Text>
            </View>
        )
    }
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            indicatorStyle="black"
            alignItems="center"
            justifyContent="space-between"
            style={styles.scrollContainer}
        >
            {matchesData?.length > 0 ? (
                matchesData.map((match) => {
                    const beginAtDate = new Date(match?.begin_at);
                    beginAtDate.setHours(beginAtDate.getHours() + 0);
                    const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;

                    const now = new Date();
                    const tomorrow = new Date(now);
                    tomorrow.setDate(now.getDate() + 1);
                    const imgName = gamesLogo[match?.videogame?.slug]?.image;

                    return (
                        <View key={match?.id} style={styles.eventContainer(teamData?.eventColor, teamData?.secondColor)}>
                            <Pressable
                                style={styles.eventCompetition(teamData?.secondColor)}
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
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> TBD </Text>
                                        ) : (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[0]?.opponent?.acronym}</Text>
                                        )
                                    ) : (
                                        <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 80, height: 80 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                                {match?.status === 'running' ? (
                                    <Text style={styles.eventTextVS(teamData?.eventTextColor)}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                ) : (
                                    <Text style={styles.eventTextVS(teamData?.eventTextColor)}>VS</Text>
                                )}
                                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}// open modal with team roster here
                                >
                                     {match?.opponents[1]?.opponent?.image_url === null ? (
                                        match?.opponents[1]?.opponent?.acronym === null ? (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> TBD </Text>
                                        ) : (
                                            <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[1]?.opponent?.acronym}</Text>
                                        )
                                    ) : (
                                        <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 80, height: 80 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                            </View>
                            <View style={styles.eventDateTime}>
                                <View style={styles.eventGame}>
                                    {match?.videogame?.slug && gamesLogo[match?.videogame?.slug] && images[imgName] ? (
                                        <View style={styles.eventGameImg(teamData?.secondColor)}>
                                            <Image source={images[imgName]} style={{ width: 25, height: 25, }} resizeMode='contain' />
                                        </View>
                                    ) : (
                                        <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.videogame?.slug}</Text>
                                    )
                                    }
                                </View>
                                <View style={styles.eventDate}>
                                    {match?.status === 'running' ? (
                                        <Pressable onPress={() => router.push(`${match?.streams_list[0]?.raw_url}`)}
                                            style={styles.eventNow}
                                        >
                                            <Text style={styles.eventText("white")}>Now !!</Text>
                                        </Pressable>
                                    ) : (
                                        beginAtDate.getDate() === tomorrow.getDate() && beginAtDate.getMonth() === tomorrow.getMonth() && beginAtDate.getFullYear() === tomorrow.getFullYear()
                                            ? (
                                                <>
                                                    <Text style={styles.eventText(teamData?.eventTextColor)}>Tmrw</Text>
                                                </>
                                            ) : (
                                                beginAtDate.getDate() === now.getDate() && beginAtDate.getMonth() === now.getMonth() && beginAtDate.getFullYear() === now.getFullYear()
                                                    ? (
                                                        <>
                                                            <Text style={styles.eventText(teamData?.eventTextColor)}>Today</Text>
                                                        </>
                                                    ) :
                                                    <>
                                                        <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}/{match?.begin_at?.slice(0, 4)}</Text>
                                                    </>
                                            )
                                    )}
                                </View>

                                <View style={styles.eventTime}>
                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{formattedTime}</Text>
                                </View>
                            </View>
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
        </ScrollView >
    )
});
export default UpcomingRow;