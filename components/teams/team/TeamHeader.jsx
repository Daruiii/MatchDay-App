import React from 'react'
import { Text, View, Image, FlatList } from 'react-native'
import { images } from '../../../constants'

import styles from './teamHeader.style'

const TeamHeader = ({ secondColor, logo, data }) => {
    return (
        <>
        { logo ? (
        <View style={styles.container(secondColor)}>
            <Image source={{ uri: logo }} style={{ width: 50, height: 50}} resizeMode='contain' />
        </View>
        ) : 
        <View style={styles.container(secondColor)}>
            <Image source={images.unknownTeam} style={{ width: 50, height: 50}} resizeMode='contain' />
        </View>
        }

        <View style={styles.headerContainer}>
            {data.map((item, index) => {
                return (
                    <View key={index} style={styles.headerItem}>
                        <Text style={styles.headText(secondColor)}> {item} </Text>
                    </View>
                )
            }
            )}
        </View>
        </>
      )
    }

export default TeamHeader