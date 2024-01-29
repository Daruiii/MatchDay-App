import React from 'react'
import { View, Text, Pressable, Image, Modal, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {getModalData} from '../../../hooks/getModalData';
import flagsData from '../../../storage/flagsData.json';

import styles from './rosterModal.style'
import { COLORS, images } from "../../../constants";
import { icons } from '../../../constants';

const RosterModal = ({ teamId, rosterModalVisible, setRosterModalVisible, colors }) => {
    const router = useRouter();
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        if (teamId) {
            getModalData(teamId).then((data) => {
                setTeamData(data)
            })
        }
    }, [teamId])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={rosterModalVisible}
            onRequestClose={() => {
                setRosterModalVisible(false);
            }}
        >
            <View style={styles.container}>
                <Pressable
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    onPress={() => {
                        setRosterModalVisible(false);
                    }
                    } />
                {teamData ? (
                    <ScrollView style={styles.modalContainer(colors?.backgroundColor, colors?.eventColor)}
                        contentContainerStyle={{ justifyContent: 'start', alignItems: 'center' }}>

                        <View style={styles.modalHeader(colors?.eventColor)}>
                            <Image source={{ uri: teamData?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            <Text style={styles.modalTitle(colors?.eventTextColor)}>{teamData?.name}</Text>
                        </View>
                        <View style={styles.line(colors?.secondColor)} />

                        <View style={styles.modalBody}>
                            {teamData?.players.map((player) => (
                                <View key={player?.id} style={styles.playerContainer(colors?.eventColor)}>
                                    <View style={styles.playerInfo}>
                                        <Text style={styles.modalText(colors?.eventTextColor)}>{player?.first_name}</Text>
                                        <Text style={styles.modalText(colors?.eventTextColor)}> "{player?.name}" </Text>
                                        <Text style={styles.modalText(colors?.eventTextColor)}>{player?.last_name}</Text>
                                    </View>
                                    {player?.image_url ? (
                                        <Image source={{ uri: player?.image_url }} style={styles.playerImg} resizeMode='contain' />

                                    ) : (
                                        <Image source={images.unknown} style={styles.playerImg} resizeMode='contain' />
                                    )
                                    }
                                    <View style={styles.playerInfo}>
                                        {player?.role ? (
                                            <Text style={styles.modalText(colors?.eventTextColor)}> {player?.role} -</Text>
                                        ) : null
                                        }
                                        {player?.nationality && flagsData[player?.nationality] ? (
                                            <Text style={styles.modalText(colors?.eventTextColor)}> {flagsData[player?.nationality].emoji}</Text>
                                        ) : (
                                            <Text style={styles.modalText(colors?.eventTextColor)}> {player?.nationality}</Text>
                                        )}
                                        {player?.age ? (
                                            <Text style={styles.modalText(colors?.eventTextColor)}> - {player?.age} yo</Text>
                                        ) : null}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Loading...</Text>
                    </View>
                )

                }
            </View>
        </Modal>
    )
}

export default RosterModal;