import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router';

import { SIZES } from '../../constants/theme'
import styles from './defaultTeams.style'

const DefaultTeams = ({ index, team, addTeam }) => {
    const router = useRouter()

    return (
        <Pressable key={index} onPress={() => { addTeam(team) }}
            style={{
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10,
                backgroundColor: team?.eventColor, borderRadius: 10, padding: 10,
                borderColor: team?.secondColor, borderWidth: 1/3
            }}>
            <Image source={{ uri: team?.image_url }} style={{ width: 75, height: 75, margin: 10, alignSelf: 'center' }} resizeMode='contain' />
            <Text style={{ color: team?.eventTextColor, fontSize: SIZES.xSmall, fontFamily: "RogueHero2", marginTop: 20, textAlign: 'center', width:90, height:40  }}>
                {team?.displayedName} </Text>
        </Pressable>
    )
}

export default DefaultTeams