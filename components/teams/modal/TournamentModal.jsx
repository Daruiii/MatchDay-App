import React from 'react'
import { View, Text, Pressable, Image, Modal, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getModalTournamentData, getModalTournamentRankingData } from '../../../hooks/getModalData';
import flagsData from '../../../storage/flagsData.json';
import RosterModal from '../modal/RosterModal';
import EventTabs from '../team/EventTabs';

import styles from './tournamentModal.style'
import { COLORS, images } from "../../../constants";
import { icons } from '../../../constants';

const TournamentThree = ({ teamData, colors, openRosterModal }) => {

    return (
        <>
            {teamData.sort((b, a) => new Date(a.begin_at) - new Date(b.begin_at)).map((match, index) => {
                return (
                    <View key={index} style={styles.modalBodyContent}>
                        <View style={styles.modalBodyContentTitle(colors?.eventColor)}>
                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.name}</Text>
                        </View>
                        <View style={styles.modalBodyContentTeam(colors?.eventColor)}>
                            {match?.status !== 'not_started' ? (
                                <>
                                    {match?.opponents[0]?.opponent?.image_url ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                                            <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </Pressable>
                                    ) :
                                        match?.opponents[0]?.opponent?.acronym ? (
                                            <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                                                <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.opponents[0]?.opponent?.acronym}</Text>
                                            </Pressable>
                                        ) :
                                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>???</Text>
                                    }
                                    {match?.results[0]?.team_id === match?.opponents[0]?.opponent?.id ? (
                                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.results[0]?.score} - {match?.results[1]?.score}</Text>
                                    ) : (
                                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.results[1]?.score} - {match?.results[0]?.score}</Text>
                                    )}
                                    {match?.opponents[1]?.opponent?.image_url ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                                            <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </Pressable>
                                    ) : match?.opponents[1]?.opponent?.acronym ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.opponents[1]?.opponent?.acronym}</Text>
                                        </Pressable>
                                    ) : <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>???</Text>
                                    }
                                </>
                            ) : (
                                <>
                                    {match?.opponents[0]?.opponent?.image_url ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                                            <Image source={{ uri: match?.opponents[0]?.opponent?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </Pressable>
                                    ) : match?.opponents[0]?.opponent?.acronym ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.opponents[0]?.opponent?.acronym}</Text>
                                        </Pressable>
                                    ) : <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>TBD</Text>}

                                    <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>
                                        {new Date(match?.begin_at).toLocaleDateString([], { month: '2-digit', day: '2-digit' })}
                                        {' - '}
                                        {new Date(match?.begin_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                    {match?.opponents[1]?.opponent?.image_url ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                                            <Image source={{ uri: match?.opponents[1]?.opponent?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </Pressable>
                                    ) : match?.opponents[1]?.opponent?.acronym ? (
                                        <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{match?.opponents[0]?.opponent?.acronym}</Text>
                                        </Pressable>
                                    ) : <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>TBD</Text>}
                                </>
                            )}
                        </View>
                        <View style={styles.lineVertical(colors?.secondColor)} />

                    </View>
                )
            })}
        </>
    )
}

const TournamentRankings = ({ tournamentId, colors, openRosterModal }) => {
    const [tournamentRankings, setTournamentRankings] = useState(null);
    const myTeamSlug = colors?.teamName;
    useEffect(() => {
        if (tournamentId) {
            getModalTournamentRankingData(tournamentId).then((data) => {
                setTournamentRankings(data)
            })
        }
    }, [tournamentId])

    return (
        <View>
            {tournamentRankings ? (
                <View style={styles.modalBodyContent}>
                    <View style={styles.modalBodyContentTitle(colors?.eventColor)}>
                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>Ranking</Text>
                    </View>
                    <View style={styles.modalBodyContentTeamRanking(colors?.eventColor)}>
                        {tournamentRankings?.map((team, index) => {
                            return (
                                <View key={index} style={styles.modalBodyContentRanking(colors?.eventColor, myTeamSlug, team.team.slug, colors?.secondColor)}>
                                    <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{index + 1}.</Text>
                                    <Pressable onPress={() => openRosterModal(team?.team?.id)}>
                                        <View style={styles.imgName}>
                                            <Image source={{ uri: team?.team?.image_url }} style={{ width: 25, height: 25 }} resizeMode='contain' />
                                            <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}> {team?.team?.name}</Text>
                                        </View>
                                    </Pressable>
                                    {team?.wins != undefined ? (
                                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}> {team?.wins}W-{team?.losses}L</Text>
                                    ) :
                                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}> - </Text>
                                    }
                                </View>
                            )
                        })}
                    </View>
                </View>
            ) : (
                <View style={styles.modalBodyContent}>
                    <View style={styles.modalBodyContentTitle(colors?.eventColor)}>
                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>Ranking</Text>
                    </View>
                    <View style={styles.modalBodyContentTeam(colors?.eventColor)}>
                        <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>Not available at the moment</Text>
                    </View>
                </View>
            )
            }
        </View>
    )
}

const TournamentModal = ({ tournamentId, tournamentModalVisible, setTournamentModalVisible, colors }) => {
    const router = useRouter();
    const [teamData, setTeamData] = useState(null);
    const [rosterModalVisible, setRosterModalVisible] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const tabs = ["arbre", "podium"];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    useEffect(() => {
        if (tournamentId) {
            getModalTournamentData(tournamentId).then((data) => {
                setTeamData(data)
            })
        }
    }, [tournamentId])

    const openRosterModal = (teamId) => {
        console.log(teamId)
        setSelectedTeamId(teamId);
        setRosterModalVisible(true);
    }

    const displayTabsContent = (teamData, colors, tournamentId) => {
        switch (activeTab) {
            case tabs[0]:
                return <TournamentThree teamData={teamData} colors={colors} tournamentId={tournamentId} openRosterModal={openRosterModal} />;
            case tabs[1]:
                return <TournamentRankings tournamentId={tournamentId} colors={colors} openRosterModal={openRosterModal} />;
            default:
                return <TournamentThree teamData={teamData} colors={colors} tournamentId={tournamentId} openRosterModal={openRosterModal} />;
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={tournamentModalVisible}
            onRequestClose={() => {
                setTournamentModalVisible(false);
            }}
        >
            <View style={styles.container}>
                <Pressable
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    onPress={() => {
                        setTournamentModalVisible(false);
                    }
                    } />
                {teamData ? (
                    <ScrollView style={styles.modalContainer(colors?.backgroundColor, colors?.eventColor)}
                        contentContainerStyle={{ justifyContent: 'start', alignItems: 'center' }}>

                        <View style={styles.modalHeader(colors?.eventColor)}>
                            <Text style={styles.modalTitle(colors?.eventTextColor)}>{teamData[0]?.league.name} - {teamData[0]?.serie.full_name}</Text>
                            {teamData[0]?.league.image_url ? (
                                <Image source={{ uri: teamData[0]?.league.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            ) : null}
                            <Text style={styles.modalTitle(colors?.eventTextColor)}>{teamData[0]?.videogame.name}</Text>
                        </View>
                        <View style={styles.line(colors?.secondColor)} />

                        <View style={styles.modalBody}>
                            <EventTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} backgroundColor={colors?.backgroundColor} secondColor={colors?.secondColor} textColor={colors?.eventTextColor} />
                            <View style={styles.modalBodyContentTitle(colors?.eventColor)}>
                                <Text style={styles.modalBodyContentTeamText(colors?.eventTextColor)}>{teamData[0]?.tournament?.name.toUpperCase()}</Text>
                            </View>
                            {displayTabsContent(teamData, colors, tournamentId)}

                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.modalContainer(colors?.backgroundColor, colors?.eventColor)}>
                        <Text style={styles.modalTitle(colors?.eventTextColor)}>No data available</Text>
                    </View>
                )

                }
            </View>
            <RosterModal teamId={selectedTeamId} rosterModalVisible={rosterModalVisible} setRosterModalVisible={setRosterModalVisible}
                colors={colors} />
        </Modal>
    )
}

export default TournamentModal;