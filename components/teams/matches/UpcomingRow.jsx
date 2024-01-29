import React from 'react'
import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUpcomingMatches } from '../../../hooks/getMatches';
import EventBtn from '../button/EventBtn';
import RosterModal from '../modal/RosterModal';
import TournamentModal from '../modal/TournamentModal';
import gamesLogo from '../../../storage/gamesLogo.json';

import styles from './upcomingRow.style'
import icons from '../../../constants/icons';
import { images } from '../../../constants';
const UpcomingRow = (team) => {
    const router = useRouter();
    const [slugs, setSlugs] = useState([]);
    const [matchesData, setMatchesData] = useState([]);
    const [notification, setNotification] = useState(false);
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const openRosterModal = (teamId) => {
        console.log(teamId)
        setSelectedTeamId(teamId);
        setRosterModalVisible(true);
    }

    const openTournamentModal = (tournamentId) => {
        console.log(tournamentId)
        setSelectedTournamentId(tournamentId);
        setTournamentModalVisible(true);
    }

    useEffect(() => {
        if (team?.teamData?.slugs) {
            setSlugs(team?.teamData?.slugs)
        }
    }, [team?.teamData?.slugs])

    useEffect(() => {
        if (slugs.length > 0) {
            getUpcomingMatches(slugs).then((data) => {
                setMatchesData(data)
                setLoaded(true)
            })
        }
        else {
            setTimeout(() => {
                setLoaded(true)
            } , 2000)
        }
    }, [slugs])

    if (!loaded) {
        return (
            <View style={styles.eventContainer(team?.teamData?.eventColor)}>
                <ActivityIndicator size="large" color="#ffffff" />
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
                        <View key={match?.id} style={styles.eventContainer(team?.teamData?.eventColor, team?.teamData?.secondColor)}>
                            <Pressable
                                style={styles.eventCompetition(team?.teamData?.secondColor)}
                                onPress={() => openTournamentModal(match?.tournament_id)}>
                                {match?.league?.image_url === null ? (
                                    <Text style={styles.eventText(team?.teamData?.eventTextColor)}>{match?.league?.name}</Text>
                                ) : (
                                    <Image source={{ uri: match?.league?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                )}
                            </Pressable>

                            <View style={styles.eventMatch}>
                                <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}// open modal with team roster here
                                >
                                    {match?.opponents[0]?.opponent?.image_url === null ? (
                                        match?.opponents[0]?.opponent?.acronym === null ? (
                                            <Text style={styles.eventText(team?.teamData?.eventTextColor)}> TBD </Text>
                                        ) : (
                                            <Text style={styles.eventText(team?.teamData?.eventTextColor)}> {match?.opponents[0]?.opponent?.acronym}</Text>
                                        )
                                    ) : (
                                        <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 80, height: 80 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                                {match?.status === 'running' ? (
                                    <Text style={styles.eventTextVS(team?.teamData?.eventTextColor)}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                ) : (
                                    <Text style={styles.eventTextVS(team?.teamData?.eventTextColor)}>VS</Text>
                                )}
                                <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}// open modal with team roster here
                                >
                                     {match?.opponents[1]?.opponent?.image_url === null ? (
                                        match?.opponents[1]?.opponent?.acronym === null ? (
                                            <Text style={styles.eventText(team?.teamData?.eventTextColor)}> TBD </Text>
                                        ) : (
                                            <Text style={styles.eventText(team?.teamData?.eventTextColor)}> {match?.opponents[1]?.opponent?.acronym}</Text>
                                        )
                                    ) : (
                                        <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 80, height: 80 }} resizeMode='contain' />
                                    )}
                                </Pressable>
                            </View>
                            <View style={styles.eventDateTime}>
                                <View style={styles.eventGame}>
                                    {/* <Image source={icons[match?.videogame?.slug]} style={{ width: 50, height: 50 }} resizeMode='contain' /> */}

                                    {match?.videogame?.slug && gamesLogo[match?.videogame?.slug] && images[imgName] ? (
                                        <View style={styles.eventGameImg(team?.teamData?.secondColor)}>
                                            <Image source={images[imgName]} style={{ width: 25, height: 25, }} resizeMode='contain' />
                                        </View>
                                    ) : (
                                        <Text style={styles.eventText(team?.teamData?.eventTextColor)}> {match?.videogame?.slug}</Text>
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
                                        beginAtDate.getDate() === tomorrow.getDate() & beginAtDate.getMonth() === tomorrow.getMonth() & beginAtDate.getFullYear() === tomorrow.getFullYear()
                                            ? (
                                                <>
                                                    <Text style={styles.eventText(team?.teamData?.eventTextColor)}>Tmrw</Text>
                                                </>
                                            ) : (
                                                beginAtDate.getDate() === now.getDate() & beginAtDate.getMonth() === now.getMonth() & beginAtDate.getFullYear() === now.getFullYear()
                                                    ? (
                                                        <>
                                                            <Text style={styles.eventText(team?.teamData?.eventTextColor)}>Today</Text>
                                                        </>
                                                    ) :
                                                    <>
                                                        <Text style={styles.eventText(team?.teamData?.eventTextColor)}>{match?.begin_at?.slice(8, 10)}/{match?.begin_at?.slice(5, 7)}/{match?.begin_at?.slice(0, 4)}</Text>
                                                    </>
                                            )
                                    )}
                                </View>

                                <View style={styles.eventTime}>
                                    {/* <Text style={styles.eventText(team?.teamData?.eventTextColor)}>{match?.begin_at?.slice(11, 16)}</Text> */}
                                    <Text style={styles.eventText(team?.teamData?.eventTextColor)}>{formattedTime}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            ) : (
                <View style={styles.eventContainer(team?.teamData?.eventColor)}>
                    <View style={styles.eventError}>
                        <Text style={styles.eventText(team?.teamData?.eventTextColor)}>No upcoming matches</Text>
                    </View>
                </View>
            )}
            <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible}
                colors={team?.teamData} />
            <TournamentModal tournamentId={selectedTournamentId} tournamentModalVisible={tournamentModalVisible} setTournamentModalVisible={setTournamentModalVisible} colors={team?.teamData} />
        </ScrollView >
    )
}

export default UpcomingRow