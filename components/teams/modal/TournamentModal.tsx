import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { getModalTournamentData, getModalTournamentRankingData } from '../../../hooks/getModalData';
import RosterModal from '../modal/RosterModal';
import EventTabs from '../team/EventTabs';
import { Match, Standing, StoredTeam } from '../../../types/api';

import styles from './tournamentModal.style';

interface TournamentThreeProps {
  teamData: Match[];
  colors: StoredTeam;
  openRosterModal: (teamId: number) => void;
}

const TournamentThree: React.FC<TournamentThreeProps> = ({ teamData, colors, openRosterModal }) => {
  return (
    <>
      {teamData
        .sort((b, a) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime())
        .map((match, index) => {
          return (
            <View key={index} style={styles.modalBodyContent}>
              <View style={(styles.modalBodyContentTitle as any)(colors?.eventColor)}>
                <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                  {match?.name}
                </Text>
              </View>
              <View style={(styles.modalBodyContentTeam as any)(colors?.eventColor)}>
                {match?.status !== 'not_started' ? (
                  <>
                    {match?.opponents[0]?.opponent?.image_url ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                        <Image
                          source={{ uri: match?.opponents[0]?.opponent?.image_url }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ) : match?.opponents[0]?.opponent?.acronym ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                        <Text
                          style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                        >
                          {match?.opponents[0]?.opponent?.acronym}
                        </Text>
                      </Pressable>
                    ) : (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        ???
                      </Text>
                    )}
                    {(match?.results?.[0] as any)?.team_id === match?.opponents[0]?.opponent?.id ? (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        {match?.results?.[0]?.score} - {match?.results?.[1]?.score}
                      </Text>
                    ) : (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        {match?.results?.[1]?.score} - {match?.results?.[0]?.score}
                      </Text>
                    )}
                    {match?.opponents[1]?.opponent?.image_url ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                        <Image
                          source={{ uri: match?.opponents[1]?.opponent?.image_url }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ) : match?.opponents[1]?.opponent?.acronym ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                        <Text
                          style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                        >
                          {match?.opponents[1]?.opponent?.acronym}
                        </Text>
                      </Pressable>
                    ) : (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        ???
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    {match?.opponents[0]?.opponent?.image_url ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                        <Image
                          source={{ uri: match?.opponents[0]?.opponent?.image_url }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ) : match?.opponents[0]?.opponent?.acronym ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[0]?.opponent?.id)}>
                        <Text
                          style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                        >
                          {match?.opponents[0]?.opponent?.acronym}
                        </Text>
                      </Pressable>
                    ) : (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        TBD
                      </Text>
                    )}

                    <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                      {new Date(match?.begin_at).toLocaleDateString([], {
                        month: '2-digit',
                        day: '2-digit',
                      })}
                      {' - '}
                      {new Date(match?.begin_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    {match?.opponents[1]?.opponent?.image_url ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                        <Image
                          source={{ uri: match?.opponents[1]?.opponent?.image_url }}
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ) : match?.opponents[1]?.opponent?.acronym ? (
                      <Pressable onPress={() => openRosterModal(match?.opponents[1]?.opponent?.id)}>
                        <Text
                          style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                        >
                          {match?.opponents[0]?.opponent?.acronym}
                        </Text>
                      </Pressable>
                    ) : (
                      <Text
                        style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}
                      >
                        TBD
                      </Text>
                    )}
                  </>
                )}
              </View>
              <View style={(styles.lineVertical as any)(colors?.secondColor)} />
            </View>
          );
        })}
    </>
  );
};

interface TournamentRankingsProps {
  tournamentId: number;
  colors: StoredTeam;
  openRosterModal: (teamId: number) => void;
}

const TournamentRankings: React.FC<TournamentRankingsProps> = ({
  tournamentId,
  colors,
  openRosterModal,
}) => {
  const [tournamentRankings, setTournamentRankings] = useState<Standing[] | null>(null);
  const myTeamSlug = colors?.teamName;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tournamentId) {
      getModalTournamentRankingData(tournamentId)
        .then((data) => {
          setTournamentRankings(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [tournamentId]);

  if (isLoading) {
    return (
      <View style={styles.modalBodyContent}>
        <View style={(styles.modalBodyContentTitle as any)(colors?.eventColor)}>
          <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
            Ranking
          </Text>
        </View>
        <View style={(styles.modalBodyContentTeam as any)(colors?.eventColor)}>
          <ActivityIndicator size="small" color={colors?.eventTextColor} />
        </View>
      </View>
    );
  }

  return (
    <View>
      {tournamentRankings ? (
        <View style={styles.modalBodyContent}>
          <View style={(styles.modalBodyContentTitle as any)(colors?.eventColor)}>
            <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
              Ranking
            </Text>
          </View>
          <View style={(styles.modalBodyContentTeamRanking as any)(colors?.eventColor)}>
            {tournamentRankings?.map((team, index) => {
              return (
                <View
                  key={index}
                  style={(styles.modalBodyContentRanking as any)(
                    colors?.eventColor,
                    myTeamSlug,
                    team.team.slug,
                    colors?.secondColor
                  )}
                >
                  <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                    {index + 1}.
                  </Text>
                  <Pressable onPress={() => openRosterModal(team?.team?.id)} style={{ flex: 1 }}>
                    <View style={styles.imgName}>
                      <Image
                        source={{ uri: team?.team?.image_url }}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={(styles.modalBodyContentTeamName as any)(colors?.eventTextColor)}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {team?.team?.name}
                      </Text>
                    </View>
                  </Pressable>
                  {team?.wins !== undefined ? (
                    <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                      {team?.wins}W-{team?.losses}L
                    </Text>
                  ) : (
                    <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                      -
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.modalBodyContent}>
          <View style={(styles.modalBodyContentTitle as any)(colors?.eventColor)}>
            <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
              Ranking
            </Text>
          </View>
          <View style={(styles.modalBodyContentTeam as any)(colors?.eventColor)}>
            <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
              Not available at the moment
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

interface TournamentModalProps {
  tournamentId: number | null;
  tournamentModalVisible: boolean;
  setTournamentModalVisible: (visible: boolean) => void;
  colors: StoredTeam;
}

const TournamentModal: React.FC<TournamentModalProps> = ({
  tournamentId,
  tournamentModalVisible,
  setTournamentModalVisible,
  colors,
}) => {
  const [teamData, setTeamData] = useState<Match[] | null>(null);
  const [rosterModalVisible, setRosterModalVisible] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const tabs = ['arbre', 'podium'];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  useEffect(() => {
    if (tournamentId) {
      getModalTournamentData(tournamentId).then((data) => {
        setTeamData(data);
      });
    }
  }, [tournamentId]);

  const openRosterModal = (teamId: number) => {
    setSelectedTeamId(teamId);
    setRosterModalVisible(true);
  };

  const displayTabsContent = (teamData: Match[], colors: StoredTeam, tournamentId: number) => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <TournamentThree teamData={teamData} colors={colors} openRosterModal={openRosterModal} />
        );
      case tabs[1]:
        return (
          <TournamentRankings
            tournamentId={tournamentId}
            colors={colors}
            openRosterModal={openRosterModal}
          />
        );
      default:
        return (
          <TournamentThree teamData={teamData} colors={colors} openRosterModal={openRosterModal} />
        );
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
          }}
        />
        {teamData ? (
          <ScrollView
            style={(styles.modalContainer as any)(colors?.backgroundColor, colors?.eventColor)}
            contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <View style={(styles.modalHeader as any)(colors?.eventColor)}>
              <Text style={(styles.modalTitle as any)(colors?.eventTextColor)}>
                {teamData[0]?.league.name} - {teamData[0]?.serie.full_name}
              </Text>
              {teamData[0]?.league.image_url ? (
                <Image
                  source={{ uri: teamData[0]?.league.image_url }}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              ) : null}
              <Text style={(styles.modalTitle as any)(colors?.eventTextColor)}>
                {teamData[0]?.videogame.name}
              </Text>
            </View>
            <View style={(styles.line as any)(colors?.secondColor)} />

            <View style={styles.modalBody}>
              <EventTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                backgroundColor={colors?.backgroundColor}
                secondColor={colors?.secondColor}
                textColor={colors?.eventTextColor}
                eventColor={colors?.eventColor}
              />
              <View style={(styles.modalBodyContentTitle as any)(colors?.eventColor)}>
                <Text style={(styles.modalBodyContentTeamText as any)(colors?.eventTextColor)}>
                  {teamData[0]?.tournament?.name.toUpperCase()}
                </Text>
              </View>
              {displayTabsContent(teamData, colors, tournamentId!)}
            </View>
          </ScrollView>
        ) : (
          <View style={(styles.modalContainer as any)(colors?.backgroundColor, colors?.eventColor)}>
            <Text style={(styles.modalTitle as any)(colors?.eventTextColor)}>
              No data available
            </Text>
          </View>
        )}
      </View>
      <RosterModal
        teamId={selectedTeamId}
        rosterModalVisible={rosterModalVisible}
        setRosterModalVisible={setRosterModalVisible}
        colors={colors}
      />
    </Modal>
  );
};

export default TournamentModal;
