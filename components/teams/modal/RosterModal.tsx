import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, Modal, ScrollView } from 'react-native';
import { getModalData } from '../../../hooks/getModalData';
import flagsData from '../../../storage/flagsData.json';
import { Team, StoredTeam } from '../../../types/api';

import styles from './rosterModal.style';
import { images } from "../../../constants";

interface RosterModalProps {
  teamId: number | null;
  rosterModalVisible: boolean;
  setRosterModalVisible: (visible: boolean) => void;
  colors: StoredTeam;
}

const RosterModal: React.FC<RosterModalProps> = ({ 
  teamId, 
  rosterModalVisible, 
  setRosterModalVisible, 
  colors 
}) => {
  const [teamData, setTeamData] = useState<Team | null>(null);

  useEffect(() => {
    if (teamId) {
      getModalData(teamId).then((data) => {
        setTeamData(data);
      });
    }
  }, [teamId]);

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
          }}
        />
        {teamData ? (
          <ScrollView 
            style={(styles.modalContainer as any)(colors?.backgroundColor, colors?.eventColor)}
            contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <View style={(styles.modalHeader as any)(colors?.eventColor)}>
              <Image source={{ uri: teamData?.image_url }} style={{ width: 50, height: 50 }} resizeMode='contain' />
              <Text style={(styles.modalTitle as any)(colors?.eventTextColor)}>{teamData?.name}</Text>
            </View>
            <View style={(styles.line as any)(colors?.secondColor)} />

            <View style={styles.modalBody}>
              {(teamData as any)?.players?.map((player: any) => (
                <View key={player?.id} style={(styles.playerContainer as any)(colors?.eventColor)}>
                  <View style={styles.playerInfo}>
                    <Text style={(styles.modalText as any)(colors?.eventTextColor)}>{player?.first_name}</Text>
                    <Text style={(styles.modalText as any)(colors?.eventTextColor)}> "{player?.name}" </Text>
                    <Text style={(styles.modalText as any)(colors?.eventTextColor)}>{player?.last_name}</Text>
                  </View>
                  {player?.image_url ? (
                    <Image source={{ uri: player?.image_url }} style={styles.playerImg as any} resizeMode='contain' />
                  ) : (
                    <Image source={images.unknown} style={styles.playerImg as any} resizeMode='contain' />
                  )}
                  <View style={styles.playerInfo}>
                    {player?.role ? (
                      <Text style={(styles.modalText as any)(colors?.eventTextColor)}> {player?.role} -</Text>
                    ) : null}
                    {player?.nationality && (flagsData as any)[player?.nationality] ? (
                      <Text style={(styles.modalText as any)(colors?.eventTextColor)}> {(flagsData as any)[player?.nationality].emoji}</Text>
                    ) : (
                      <Text style={(styles.modalText as any)(colors?.eventTextColor)}> {player?.nationality}</Text>
                    )}
                    {player?.age ? (
                      <Text style={(styles.modalText as any)(colors?.eventTextColor)}> - {player?.age} yo</Text>
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
        )}
      </View>
    </Modal>
  );
};

export default RosterModal;
