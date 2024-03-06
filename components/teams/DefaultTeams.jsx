import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router';

import { SIZES } from '../../constants/theme'
import styles from './defaultTeams.style'

const DefaultTeams = ({ index, team, addTeam }) => {
    const router = useRouter()

    return (
        <Pressable key={index} onPress={() => { addTeam(team) }}
            style={styles.container(team?.secondColor, team?.eventColor)}>
            <Image source={{ uri: team?.image_url }} style={{ width: 75, height: 75, margin: 10, alignSelf: 'center' }} resizeMode='contain' />
            <Text style={styles.headText(team?.eventTextColor)}>
                {team?.displayedName} </Text>
        </Pressable>
    )
}

export default DefaultTeams