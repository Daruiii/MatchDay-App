import React, { useState, useCallback } from 'react'
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import EventBtn from '../button/EventBtn';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';

import styles from './next.style'
import icons from '../../../constants/icons';

const Next = React.memo(({ teamData }) => {
    const router = useRouter();
    const [notification, setNotification] = useState(false);
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);

    // Cache pour le prochain match
    const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs, 'next');
    const matchData = matchesData?.[0]; // Le prochain match est le premier

    const openRosterModal = useCallback((teamId) => {
        setSelectedTeamId(teamId);
        setRosterModalVisible(true);
    }, []);

    const openTournamentModal = useCallback((tournamentId) => {
        setSelectedTournamentId(tournamentId);
        setTournamentModalVisible(true);
    }, []);

    // Memoization des calculs de date
    const { beginAtDate, formattedTime, now, tomorrow } = React.useMemo(() => {
        if (!matchData?.begin_at) return { beginAtDate: null, formattedTime: '', now: new Date(), tomorrow: new Date() };
        
        const beginAtDate = new Date(matchData.begin_at);
        beginAtDate.setHours(beginAtDate.getHours() + 0);
        const formattedTime = `${String(beginAtDate.getHours()).padStart(2, '0')}:${String(beginAtDate.getMinutes()).padStart(2, '0')}`;
        
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        
        return { beginAtDate, formattedTime, now, tomorrow };
    }, [matchData?.begin_at]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {matchData ? (
                <View key={matchData?.id} style={styles.eventContainer(teamData?.eventColor)}>
                    <Pressable
                        style={styles.eventCompetition}
                        onPress={() => openTournamentModal(matchData?.tournament_id)}
                    >
                        {matchData?.league?.image_url === null ? (
                            <Text style={styles.eventText(teamData?.eventTextColor)}>{matchData?.league?.name}</Text>
                        ) : (
                            <Image source={{ uri: matchData?.league?.image_url }} style={{ width: 50, height: 50 }} resizeMode="contain" />
                        )}
                    </Pressable>

                    <View style={styles.eventMatch}>
                        <Pressable onPress={() => openRosterModal(matchData?.opponents[0]?.opponent?.id)}>
                            {matchData?.opponents[0]?.opponent?.image_url === null ? (
                                <Text style={styles.eventText(teamData?.eventTextColor)}> {matchData?.opponents[0]?.opponent?.acronym}</Text>
                            ) : (
                                <Image source={{ uri: matchData?.opponents[0]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode="contain" />

                            )
                            }
                        </Pressable>
                        {matchData?.status === 'running' ? (
                            <Text style={styles.eventText(teamData?.eventTextColor)}>{matchData?.results[0]?.score} - {matchData?.results[1]?.score}</Text>
                        ) : (
                            <Text style={styles.eventText(teamData?.eventTextColor)}>VS</Text>
                        )}
                        <Pressable onPress={() => openRosterModal(matchData?.opponents[1]?.opponent?.id)}>
                            {matchData?.opponents[1]?.opponent?.image_url === null ? (
                                <Text style={styles.eventText(teamData?.eventTextColor)}> {matchData?.opponents[1]?.opponent?.acronym}</Text>
                            ) : (
                                <Image source={{ uri: matchData?.opponents[1]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode="contain" />
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.eventDate}>
                        {matchData?.status === 'running' ? (
                            <Pressable onPress={() => router.push(matchData?.streams_list[0]?.raw_url)} style={styles.eventNow}>
                                <Text style={styles.eventText("white")}>Live !!</Text>
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
                                        ) : (
                                            <>
                                                <Text style={styles.eventText(teamData?.eventTextColor)}>{matchData?.begin_at?.slice(8, 10)}/{matchData?.begin_at?.slice(5, 7)}</Text>
                                                <Text style={styles.eventText(teamData?.eventTextColor)}>{matchData?.begin_at?.slice(0, 4)}</Text>
                                            </>
                                        ))
                        )}
                    </View>

                    <View style={styles.eventTime}>
                        <Text style={styles.eventText(teamData?.eventTextColor)}>
                            {formattedTime}
                        </Text>
                    </View>

                    {/* notification button */}
                    {notification ? (
                        <EventBtn
                            iconUrl={icons.notification}
                            handlePress={() => {
                                setNotification(!notification);
                                // Activer la notification ici
                            }}
                            dimension="80%"
                        />
                    ) : (
                        <EventBtn
                            iconUrl={icons.notificationOff}
                            handlePress={() => {
                                setNotification(!notification);
                                // Désactiver la notification ici
                            }}
                            dimension="80%"
                        />
                    )}
                </View>
            ) : (
                <View style={styles.eventContainer(teamData?.eventColor)}>
                    <View style={styles.eventError}>
                        <Text style={styles.eventText(teamData?.eventTextColor)}>No upcoming matches</Text>
                    </View>
                </View>
            )}
            <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible} colors={teamData} />
            <TournamentModal tournamentId={selectedTournamentId} tournamentModalVisible={tournamentModalVisible} setTournamentModalVisible={setTournamentModalVisible} colors={teamData} />
        </View>
    );
});

export default Next;
