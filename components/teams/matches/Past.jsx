import React, { useState, useCallback } from 'react'
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useMatchesCache } from '../../../hooks/useMatchesCache';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';

import styles from './past.style'
import { COLORS, SHADOWS } from '../../../constants/theme';
import { icons } from '../../../constants';
import { images } from '../../../constants';

const Past = React.memo(({ teamData }) => {
    const router = useRouter();
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);

    // Cache pour les matches passés
    const { matches: matchesData, isLoading, error } = useMatchesCache(teamData?.slugs, 'past');

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
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {matchesData?.length > 0 ? (
                matchesData.map((match, index) => {
                    const imgName = gamesLogo[match?.videogame?.slug]?.image;

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
                                onPress={() => openTournamentModal(match?.tournament_id)} >
                                {match?.league?.image_url === null ? (
                                    <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.league?.name}</Text>
                                ) : (
                                    <Image source={{ uri: match?.league?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                )}
                            </Pressable>
                            <View style={styles.eventMatch}>
                                <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                                    {match?.opponents[0]?.opponent?.image_url === null ? (
                                        <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[0]?.opponent?.acronym}</Text>
                                    ) : (
                                        <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                                {match?.winner?.slug.includes(teamData?.teamName) ? (
                                    <Text style={styles.eventText("#17B169")}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                ) : (
                                    <Text style={styles.eventText("#960018")}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                )}
                                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}
                                >
                                    {match?.opponents[1]?.opponent?.image_url === null ? (
                                        <Text style={styles.eventText(teamData?.eventTextColor)}> {match?.opponents[1]?.opponent?.acronym}</Text>
                                    ) : (
                                        <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 40, height: 40 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                            </View>
                            <View style={styles.eventReplay}>
                                <Pressable onPress={() => router.push(`https://www.youtube.com/results?search_query=${match?.serie?.slug}+${match?.opponents[1]?.opponent?.acronym}+vs+${match?.opponents[0]?.opponent?.acronym}`)}>
                                    <Image source={icons.youtube} style={{ width: 30, height: 30 }} resizeMode='contain' />
                                </Pressable>
                            </View>
                            <View style={styles.eventDate}>
                                <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}</Text>
                                <Text style={styles.eventText(teamData?.eventTextColor)}>{match?.begin_at?.slice(0, 4)}</Text>
                            </View>
                        </View>
                    )
                })
            ) : (
                <View style={styles.eventContainer(teamData?.eventColor)}>
                    <View style={styles.eventError}>
                        <Text style={styles.eventText(teamData?.eventTextColor)}>No past matches</Text>
                    </View>
                </View>
            )}

            <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible}
                colors={teamData} />
            <TournamentModal tournamentId={selectedTournamentId} tournamentModalVisible={tournamentModalVisible} setTournamentModalVisible={setTournamentModalVisible} colors={teamData} />
        </View>
    );
});

export default Past;
