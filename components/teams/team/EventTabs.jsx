import React from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'

import styles from './eventTabs.style'
import { icons } from '../../../constants'

const TabButton = ({ name, activeTab, onHandlePress, underLineColor, textColor, backgroundColor }) => {
    return (
      <TouchableOpacity
        style={styles.btn(name, activeTab, underLineColor, backgroundColor)}
        onPress={onHandlePress}
      >
        { icons[name] ? 
          <Image source={icons[name]} resizeMode="contain" style={{
            width: 20,
            height: 20,
            tintColor: activeTab === name ? underLineColor : textColor
          }} />
          :
          <Text style={styles.btnText(name, activeTab, textColor)}>{name}</Text>
        }
      </TouchableOpacity>
    )
  }

const EventTabs = ({ tabs, activeTab, setActiveTab, backgroundColor, secondColor, textColor }) => {
    return (
        <View style={styles.container(backgroundColor, secondColor, textColor)}>
          { tabs.map((name, item) => (
                <TabButton
                    key={item}
                    name={name}
                    activeTab={activeTab}
                    onHandlePress={() => setActiveTab(name)}
                    underLineColor={secondColor}
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                />
                ))}
        </View>
      )
    }

export default EventTabs