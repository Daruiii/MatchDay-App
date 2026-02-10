import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';

import styles from './eventTabs.style';
import { icons } from '../../../constants';

interface TabButtonProps {
  name: string;
  activeTab: string;
  onHandlePress: () => void;
  underLineColor: string;
  textColor: string;
  backgroundColor: string;
  eventColor: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  name,
  activeTab,
  onHandlePress,
  underLineColor,
  textColor,
  backgroundColor,
  eventColor,
}) => {
  return (
    <Pressable
      style={(styles.btn as any)(name, activeTab, underLineColor, backgroundColor)}
      onPress={onHandlePress}
    >
      {(icons as any)[name] ? (
        <Image
          source={(icons as any)[name]}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: activeTab === name ? underLineColor : eventColor,
          }}
        />
      ) : (
        <Text style={(styles.btnText as any)(name, activeTab, textColor)}>{name}</Text>
      )}
    </Pressable>
  );
};

interface EventTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  backgroundColor: string;
  secondColor: string;
  textColor: string;
  eventColor: string;
}

const EventTabs: React.FC<EventTabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  backgroundColor,
  secondColor,
  textColor,
  eventColor,
}) => {
  return (
    <View style={(styles.container as any)(backgroundColor, secondColor, textColor)}>
      {tabs.map((name, item) => (
        <TabButton
          key={item}
          name={name}
          activeTab={activeTab}
          onHandlePress={() => setActiveTab(name)}
          underLineColor={secondColor}
          textColor={textColor}
          backgroundColor={backgroundColor}
          eventColor={eventColor}
        />
      ))}
    </View>
  );
};

export default EventTabs;
